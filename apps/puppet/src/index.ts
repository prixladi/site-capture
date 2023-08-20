import { launch } from 'puppeteer';
import { browserConfig } from './configs';
import { percentOnAquire } from './constants';
import { connect as connectDb, DB, disconnect as disconnectDb } from './db';
import { connect as connectRedis, disconnect as disconnectRedis } from './redis';
import { Redis as RedisClient } from 'ioredis';
import { logJobFinish, logJobStart } from './logger';
import puppet from './pupet';
import StopWatch from './stopwatch';

let exiting = false;

const runLoop = async (db: DB, redisClient: RedisClient): Promise<void> => {
  const delay = (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms));
  const browser = await launch(browserConfig.useSandbox ? undefined : { args: ['--no-sandbox'] });

  // TODO: Use MongoDB change streams
  // TODO: Or use redis pub/sub
  while (!exiting) {
    try {
      const job = await db.jobModel.findOneAndUpdate(
        { aquired: false },
        { $set: { progress: percentOnAquire, aquired: true } },
        { new: true },
      );

      if (job) {
        logJobStart(job._id.toHexString());
        const stopwatch = new StopWatch();

        await puppet({ job, db, redisClient, browser });

        logJobFinish(job._id.toHexString(), stopwatch);
      } else {
        await delay(2000);
      }
    } catch (err) {
      console.error(err);
      await delay(2000);
    }
  }

  await browser.close();
};

const main = async () => {
  const db = await connectDb();
  const redisClient = connectRedis();

  const shutdown = async () => {
    exiting = true;

    await disconnectDb();
    disconnectRedis(redisClient);

    process.exit();
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  await runLoop(db, redisClient);
};

main().catch((err) => {
  console.error(err);
});
