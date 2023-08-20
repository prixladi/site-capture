import { Browser } from 'puppeteer';
import { JobDoc } from '../db/job';
import fs from 'fs/promises';
import { DB } from '../db';
import zipAndStore from './fileStorage';
import processUrl from './urlProcessor';
import { percentOnProccessing } from '../constants';
import { Semaphore } from 'await-semaphore';
import { browserConfig } from '../configs';
import { Redis as RedisClient } from 'ioredis';
import { sendProgressUpdate } from '../redis';
import AdmZip from 'adm-zip';

type RunConfig = {
  job: JobDoc;
  db: DB;
  browser: Browser;
  redisClient: RedisClient;
};

const createUrls = (url: string, subsites: string[]): URL[] => {
  // We want to threat subsites as relative paths
  const normalizedSubsites = subsites
    .map((sub) => {
      if (sub.startsWith('/')) {
        return sub.substring(1);
      }

      return sub;
    })
    .filter((sub) => sub != '');

  const normalizedUrl = url.endsWith('/') ? url : `${url}/`;

  const urls = [...new Set(normalizedSubsites)].map((sub) => new URL(sub, normalizedUrl));
  urls.push(new URL(normalizedUrl));
  return urls;
};

const run = async ({ job, db, redisClient, browser }: RunConfig): Promise<void> => {
  const { url, subsites } = job;
  const { jobModel, fileBucket } = db;
  const folderName = `.data/${job._id}`;

  try {
    await sendProgressUpdate(redisClient, { id: job._id.toHexString(), progress: job.progress, status: false });

    const urls = createUrls(url, subsites);

    const promises: Promise<void>[] = [];
    const percentageEach = percentOnProccessing / urls.length;

    // Test for basic errors, eg. ERR_CERT_AUTHORITY_INVALID
    const rootPage = await browser.newPage();
    await rootPage.goto(job.url);
    await rootPage.close();

    await fs.mkdir(folderName, { recursive: true });

    const maxTabs = Number.parseInt(browserConfig.maxParallelTabs);
    const semaphore = new Semaphore(maxTabs);
    urls.forEach(async (url) => {
      const promise = processUrl({
        url,
        job,
        jobModel,
        redisClient,
        pagePromise: browser.newPage(),
        folderName,
        percentage: percentageEach,
        semaphore,
      });

      promises.push(promise);
    });
    await Promise.all(promises);

    const bucketId = await zipAndStore({
      zip: new AdmZip(),
      fileBucket,
      folderName,
      filename: 'result.zip',
    });

    await fs.rm(folderName, { recursive: true, force: true });

    await jobModel.updateOne({ _id: job._id }, { $set: { progress: 100, status: true, zipFileId: bucketId } });
    await sendProgressUpdate(redisClient, { id: job._id.toHexString(), progress: 100, status: true, zipFileId: bucketId.toHexString() });
  } catch (err) {
    console.log(err);
    await jobModel.updateOne({ _id: job._id }, { $set: { progress: 100, status: false, errorMessage: err.toString() } });
    await sendProgressUpdate(redisClient, { id: job._id.toHexString(), progress: 100, status: true, errorMessage: err.toString() });
  }
};

export default run;
