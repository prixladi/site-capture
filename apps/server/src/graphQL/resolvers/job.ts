import { composeResolvers, IResolvers, ISchemaLevelResolver } from 'graphql-tools';
import { Context } from '../../types';
import { JobType, MutationIdResult, NewJobInput } from '../types';
import { createMutationIdResult, jobDocToType } from './utils';
import { ObjectID } from 'mongodb';
import validationResolvers from './validation/job';
import { ApolloError, AuthenticationError, UserInputError } from 'apollo-server-express';
import { JOB_UPDATED, objIdRegex } from '../../constants';

type JobResolver = ISchemaLevelResolver<void, Context, { id: string }, Promise<JobType | null>>;
type RunJobResolver = ISchemaLevelResolver<void, Context, { job: NewJobInput }, Promise<MutationIdResult>>;

type JobUpdatedResolver = ISchemaLevelResolver<void, Context, { id: string }, Promise<AsyncIterator<unknown, unknown, undefined>>>;

const anonymousJob: JobResolver = async (_, { id }, { db }) => {
  const job = await db.jobModel.findOne({ $and: [{ _id: id }, { userId: { $exists: false } }] });
  if (!job) {
    return null;
  }

  return jobDocToType(job);
};

const runAnonymousJob: RunJobResolver = async (_, { job }, { db }) => {
  const doc = {
    _id: new ObjectID(),
    url: job.url,
    quality: job.quality,
    subsites: [],
    viewports: job.viewports,
    status: false,
    aquired: false,
    progress: 0,
  };
  db.jobModel.create(doc);

  return createMutationIdResult(doc._id.toHexString(), 'OK');
};

const jobUpdated: { subscribe: JobUpdatedResolver } = {
  subscribe: async (_, { id }, { db, pubSub, user }) => {
    if (!id.match(objIdRegex)) {
      throw new UserInputError('Id is invalid.', { id: 'Id is in invalid format.' });
    }

    const job = await db.jobModel.findOne({ _id: id });
    if (!job) {
      throw new ApolloError(`Job with ID '${id}' was not found`, 'NOT_FOUND');
    }

    if (!job.userId) {
      return pubSub.asyncIterator(JOB_UPDATED(id));
    }

    if (!user) {
      throw new AuthenticationError('User is not authorized.');
    }
    if (user.id !== job.userId.toHexString()) {
      throw new ApolloError(`Job with ID '${id}' was not found`, 'NOT_FOUND');
    }

    return pubSub.asyncIterator(JOB_UPDATED(id));
  },
};

const resolvers: IResolvers = {
  Query: { anonymousJob },
  Mutation: { runAnonymousJob },
  Subscription: { jobUpdated },
};

export default composeResolvers(resolvers, validationResolvers);
