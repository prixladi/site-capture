import { AuthenticationError } from 'apollo-server-express';
import { rule, shield } from 'graphql-shield';
import { Context } from '../../types';

const isAuthenticated = rule({ cache: 'contextual' })(async (_, _args, { user }: Context) => {
  if (!user) {
    return new AuthenticationError('User is not authorized.');
  }

  return true;
});

const permissions = shield(
  {
    Query: {
      me: isAuthenticated,
    },
    Mutation: {
      site: isAuthenticated,
      template: isAuthenticated,
    },
  },
  { allowExternalErrors: true },
);

export { permissions };
