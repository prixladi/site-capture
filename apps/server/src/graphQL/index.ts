import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import { ILogger } from 'apollo-server-express';
import { applyMiddleware } from 'graphql-middleware';
import { permissions } from './middleware';

const logger: ILogger = {
  log: (err) => {
    console.error(err);
  },
};

const schema = makeExecutableSchema({
  logger,
  typeDefs,
  resolvers,
});

const shieldedSchema = applyMiddleware(schema, permissions);

export default shieldedSchema;
