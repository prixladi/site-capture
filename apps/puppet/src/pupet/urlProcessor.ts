import { Page } from 'puppeteer';
import { JobDoc, ProgressItem } from '../db/job';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs/promises';
import Stopwatch from '../stopwatch';
import { logOperation } from '../logger';
import { Semaphore } from 'await-semaphore';
import { Redis as RedisClient } from 'ioredis';
import { sendProgressUpdate } from '../redis';

type ProcessorConfig = {
  url: URL;
  job: JobDoc;
  jobModel: mongoose.Model<JobDoc>;
  redisClient: RedisClient;
  pagePromise: Promise<Page>;
  folderName: string;
  percentage: number;
  semaphore: Semaphore;
};

type TryProcessUrlProps = {
  url: URL;
  job: JobDoc;
  fullPath: string;
  page: Page;
};

const tryProcessUrl = async ({ url, job: { viewports, quality }, fullPath, page }: TryProcessUrlProps): Promise<ProgressItem> => {
  try {
    await page.goto(url.href);

    for (const viewport of viewports) {
      await page.setViewport(viewport);

      const ext = quality >= 100 ? 'png' : 'jpeg';
      const imgName = `${viewport.height}x${viewport.width}.${ext}`;

      await page.screenshot({
        path: path.join(fullPath, imgName),
        type: ext,
        quality: quality >= 100 ? undefined : Math.max(0, Math.min(quality, 100)),
      });
    }

    return { url: url.href, status: true };
  } catch (err) {
    console.error(err);
    return { url: url.href, status: false, errorMessage: err.toString() };
  }
};

const normalizePath = (relativePath: string): string => {
  return relativePath.replace('?', '$qm').replace('>', '$gt').replace('<', '$lt').replace('*', '$ast').replace('|', '$pip');
};

const processUrl = async ({
  url,
  job,
  jobModel,
  redisClient,
  pagePromise,
  folderName,
  percentage,
  semaphore,
}: ProcessorConfig): Promise<void> => {
  const release = await semaphore.acquire();
  try {
    const stopwatch = new Stopwatch();

    const page = await pagePromise;

    const relativePath = normalizePath(path.join(url.pathname, url.search, url.hash));

    const fullPath = path.join('./', folderName, relativePath);
    await fs.mkdir(fullPath, { recursive: true });
    const resultItem: ProgressItem = await tryProcessUrl({ url, job, fullPath, page });

    const updatedJob = await jobModel.findOneAndUpdate(
      { _id: job._id },
      { $inc: { progress: percentage }, $push: { items: resultItem } },
      { new: true },
    );
    if (updatedJob) {
      await sendProgressUpdate(redisClient, { id: job._id.toHexString(), progress: updatedJob.progress, item: resultItem, status: false });
    }

    await page.close();
    logOperation(`Processing url '${url}' `, stopwatch);
  } finally {
    release();
  }
};

export default processUrl;
