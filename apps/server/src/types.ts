import { DB } from './db';
import { RedisPubSub } from 'graphql-redis-subscriptions';

type User = {
  id: string;
};

type Context = {
  db: DB;
  pubSub: RedisPubSub;
  user?: User;
  getUser: () => User;
};

export { Context };
