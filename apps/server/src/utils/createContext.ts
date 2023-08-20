import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { validateToken } from '../auth';
import { DB } from '../db';
import { Context } from '../types';
import { RedisPubSub } from 'graphql-redis-subscriptions';

type Params = {
  Authorization?: string;
};

const tokenType = 'Bearer';

const getToken = (token?: string): string | undefined => {
  if (token && token.startsWith(tokenType)) {
    return token.substring(tokenType.length + 1);
  }
};

const handleToken = (db: DB, pubSub: RedisPubSub, token?: string): Context => {
  if (token) {
    const payload = validateToken(token);
    if (payload) {
      const user = {
        id: payload.name,
      };

      return {
        db,
        pubSub,
        user,
        getUser: () => {
          return user;
        },
      };
    }
  }

  return {
    db,
    pubSub,
    getUser: () => {
      throw new Error('Unable to retrieve user in this context.');
    },
  };
};

const createHttpContext = (db: DB, pubSub: RedisPubSub) => ({ req, connection }: ExpressContext): Context => {
  // Websocket
  if (connection) {
    return {
      ...connection.context,
    };
  }

  const token = getToken(req.header('Authorization'));
  return handleToken(db, pubSub, token);
};

const createWebsocketContext = (db: DB, pubSub: RedisPubSub) => (params: Params): Context => {
  const token = getToken(params.Authorization);
  return handleToken(db, pubSub, token);
};

export { createHttpContext, createWebsocketContext };
