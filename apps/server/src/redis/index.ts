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

const subscribeProgressUpdate = async (redisClient: RedisClient, callback: (dto: ProgressDto) => Promise<void>): Promise<void> => {
  redisClient.subscribe('progress', (err) => {
    if (err) {
      console.error('Error while subscribing to redis', err);
    }
  });

  redisClient.on('message', async (channel, message) => {
    if (channel === 'progress') {
      const dto = JSON.parse(message) as ProgressDto;
      await callback(dto);
    } else {
      console.log(`Received message '${message}' from unknown channel ${channel}.`);
    }
  });
};

export { connect, disconnect, subscribeProgressUpdate };
