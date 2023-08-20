import { IResolvers, UserInputError } from 'apollo-server-express';
import { ISchemaLevelResolver } from 'graphql-tools';
import { Context } from '../../../types';
import { MutationIdResult, MutationResult, NewTemplateInput, UpdateTemplateInput } from '../../types';
import { idSchema, inputError, quealitySchema, viewportsSchema, validate } from './utils';
import joi from 'joi';

type CreateTemplateResolver = ISchemaLevelResolver<
  void,
  Context,
  { template: NewTemplateInput },
  Promise<MutationIdResult | UserInputError>
>;
type UpdateTemplateResolver = ISchemaLevelResolver<
  void,
  Context,
  { id: string; update: UpdateTemplateInput },
  Promise<MutationResult | UserInputError>
>;
type DeleteTemplateResolver = ISchemaLevelResolver<void, Context, { id: string }, Promise<MutationResult | UserInputError>>;

const newTemplateInputSchema = joi.object<NewTemplateInput>({
  name: joi.string().min(1).max(50),
  viewports: viewportsSchema,
  quality: quealitySchema,
});

const create = (next: CreateTemplateResolver): CreateTemplateResolver => async (root, args, context, info) => {
  const errors = validate(newTemplateInputSchema, args.template);
  if (errors) {
    return inputError(errors);
  }

  return next(root, args, context, info);
};

const updateTemplateInputSchema = joi.object<UpdateTemplateInput>({
  name: joi.string().min(1).max(50).optional().disallow(null),
  viewports: viewportsSchema.optional().disallow(null),
  quality: quealitySchema.optional().disallow(null),
});

const update = (next: UpdateTemplateResolver): UpdateTemplateResolver => async (root, args, context, info) => {
  let errors = validate(idSchema, args.id);
  errors = validate(updateTemplateInputSchema, args.update, errors);
  if (errors) {
    return inputError(errors);
  }

  return next(root, args, context, info);
};

const _delete = (next: DeleteTemplateResolver): DeleteTemplateResolver => async (root, args, context, info) => {
  const errors = validate(idSchema, args.id);
  if (errors) {
    return inputError(errors);
  }

  return next(root, args, context, info);
};

const resolvers: IResolvers = {
  TemplateMutation: { create, update, delete: _delete },
};

export default resolvers;
