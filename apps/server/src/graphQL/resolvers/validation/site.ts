import { IResolvers, UserInputError } from 'apollo-server-express';
import { ISchemaLevelResolver } from 'graphql-tools';
import { Context } from '../../../types';
import { MutationIdResult, MutationResult, NewSiteInput, UpdateSiteInput } from '../../types';
import { idSchema, inputError, quealitySchema, viewportsSchema, validate, subsitesSchema } from './utils';
import joi from 'joi';

type CreateSiteResolver = ISchemaLevelResolver<void, Context, { site: NewSiteInput }, Promise<MutationIdResult | UserInputError>>;
type UpdateSiteResolver = ISchemaLevelResolver<
  void,
  Context,
  { id: string; update: UpdateSiteInput },
  Promise<MutationResult | UserInputError>
>;
type DeleteSiteResolver = ISchemaLevelResolver<void, Context, { id: string }, Promise<MutationResult | UserInputError>>;
type RunJobResolver = ISchemaLevelResolver<void, Context, { id: string }, Promise<MutationIdResult | UserInputError>>;

const newSiteInputSchema = joi.object<NewSiteInput>({
  name: joi.string().min(1).max(50),
  url: joi.string().uri().required(),
  subsites: subsitesSchema,
  viewports: viewportsSchema,
  quality: quealitySchema,
});

const create = (next: CreateSiteResolver): CreateSiteResolver => async (root, args, context, info) => {
  const errors = validate(newSiteInputSchema, args.site);
  if (errors) {
    return inputError(errors);
  }

  return next(root, args, context, info);
};

const updateSiteInputSchema = joi.object<UpdateSiteInput>({
  name: joi.string().min(1).max(50).optional().disallow(null),
  url: joi.string().uri().required().optional().disallow(null),
  subsites: subsitesSchema.optional().disallow(null),
  viewports: viewportsSchema.optional().disallow(null),
  quality: quealitySchema.optional().disallow(null),
});

const update = (next: UpdateSiteResolver): UpdateSiteResolver => async (root, args, context, info) => {
  let errors = validate(idSchema, args.id);
  errors = validate(updateSiteInputSchema, args.update, errors);
  if (errors) {
    return inputError(errors);
  }

  return next(root, args, context, info);
};

const _delete = (next: DeleteSiteResolver): DeleteSiteResolver => async (root, args, context, info) => {
  const errors = validate(idSchema, args.id);
  if (errors) {
    return inputError(errors);
  }

  return next(root, args, context, info);
};

const runJob = (next: RunJobResolver): RunJobResolver => async (root, args, context, info) => {
  const errors = validate(idSchema, args.id);
  if (errors) {
    return inputError(errors);
  }

  return next(root, args, context, info);
};

const resolvers: IResolvers = {
  SiteMutation: { runJob, create, update, delete: _delete },
};

export default resolvers;
