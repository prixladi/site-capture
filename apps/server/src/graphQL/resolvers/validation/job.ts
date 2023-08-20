import { IResolvers, ISchemaLevelResolver } from 'graphql-tools';
import { Context } from '../../../types';
import { JobType, MutationIdResult, NewJobInput } from '../../types';
import { UserInputError } from 'apollo-server-express';
import { idSchema, inputError, quealitySchema, validate, viewportsSchema } from './utils';
import joi from 'joi';

type JobResolver = ISchemaLevelResolver<void, Context, { id: string }, Promise<JobType | null | UserInputError>>;
type RunJobResolver = ISchemaLevelResolver<void, Context, { job: NewJobInput }, Promise<MutationIdResult | UserInputError>>;

const anonymousJob = (next: JobResolver): JobResolver => async (root, args, context, info) => {
  const errors = validate(idSchema, args.id);
  if (errors) {
    return inputError(errors);
  }

  return next(root, args, context, info);
};

const newJobInputSchema = joi.object<NewJobInput>({
  url: joi.string().uri().required(),
  viewports: viewportsSchema,
  quality: quealitySchema,
});

const runAnonymousJob = (next: RunJobResolver): RunJobResolver => async (root, args, context, info) => {
  const errors = validate(newJobInputSchema, args.job);
  if (errors) {
    return inputError(errors);
  }

  return next(root, args, context, info);
};

const resolvers: IResolvers = {
  Query: { anonymousJob },
  Mutation: { runAnonymousJob },
};

export default resolvers;
