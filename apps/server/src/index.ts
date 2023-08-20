import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import http, { Server } from 'http';
import schema from './graphQL';
import { connect as connectDb, DB, disconnect as disconnectDb } from './db';
import { connect as connectRedis, disconnect as disconnectRedis, subscribeProgressUpdate } from './redis';
import corsHandler from './utils/corsHandler';
import { appPort } from './configs';
import appoloLogger from './utils/appoloLogger';
import { createHttpContext, createWebsocketContext } from './utils/createContext';
import { startTokenFetching } from './auth';
import createFileDownloadHandler from './fileDownload';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { JOB_UPDATED } from './constants';

const createServer = (db: DB, pubSub: RedisPubSub): Server => {
  const { fileBucket } = db;

  const app = express();
  const httpServer = http.createServer(app);
  const apolloServer = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
    logger: appoloLogger,
    context: createHttpContext(db, pubSub),
    subscriptions: {
      path: '/ws',
      keepAlive: 15000,
      onConnect: createWebsocketContext(db, pubSub),
    },
  });

  app.use(corsHandler);

  apolloServer.applyMiddleware({ app, path: '/graphql' });
  apolloServer.installSubscriptionHandlers(httpServer);

  app.use('/downloads/:fileId', createFileDownloadHandler(fileBucket));

  return httpServer;
};

const main = async (): Promise<void> => {
  const db = await connectDb();
  const progessRedis = connectRedis();
  const pubsub = new RedisPubSub({
    publisher: connectRedis(),
    subscriber: connectRedis(),
  });
  const app = createServer(db, pubsub);

  subscribeProgressUpdate(progessRedis, async (dto) => {
    await pubsub.publish(JOB_UPDATED(dto.id), { jobUpdated: dto });
  });
  startTokenFetching();

  const shutdown = async () => {
    await disconnectDb();
    disconnectRedis(progessRedis);
    process.exit();
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  app.listen(appPort, (): void => {
    console.log(`GraphQL is now running on http://localhost:${appPort}/graphql`);
  });
};

main().catch((err) => {
  console.error(err);
});
