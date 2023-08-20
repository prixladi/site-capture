import Redis, { Redis as RedisClient } from 'ioredis';
import { redisConfig } from '../configs';

type ProgressItem = {
  url: string;
  status: boolean;
  errorMessage?: string;
};

type ProgressDto = {
  id: string;
  status: boolean;
  progress: number;
  errorMessage?: string;
  zipFileId?: string;
  item?: ProgressItem;
};

const progressChannelName = 'progress';

const connect = (): RedisClient => {
  return new Redis({
    port: redisConfig.port,
    host: redisConfig.host,
    lazyConnect: true,
    maxRetriesPerRequest: 4,
    retryStrategy: (times) => {
      return Math.min(times * 50, 2000);
    },
  });
};

const disconnect = (redisClient: RedisClient): void => {
  try {
    redisClient.disconnect();
  } catch (err) {
    console.error('Error while disconnection from redis:', err);
  }
};

const sendProgressUpdate = async (redisClient: RedisClient, progress: ProgressDto): Promise<boolean> => {
  try {
    await redisClient.publish(progressChannelName, JSON.stringify(progress));
    return true;
  } catch (err) {
    console.error('Error while publishing to redis.', err);
    return false;
  }
};

export { connect, disconnect, progressChannelName, sendProgressUpdate };
