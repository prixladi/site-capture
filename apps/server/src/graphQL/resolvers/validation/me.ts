import { IResolvers, UserInputError } from 'apollo-server-express';
import { ISchemaLevelResolver } from 'graphql-tools';
import { Context } from '../../../types';
import { SiteType, TemplateType } from '../../types';
import { idSchema, inputError, validate } from './utils';

type TemplateResolver = ISchemaLevelResolver<void, Context, { id: string }, Promise<TemplateType | null | UserInputError>>;
type SiteResolver = ISchemaLevelResolver<void, Context, { id: string }, Promise<SiteType | null | UserInputError>>;

const template = (next: TemplateResolver): TemplateResolver => async (root, args, context, info) => {
  const errors = validate(idSchema, args.id);
  if (errors) {
    return inputError(errors);
  }

  return next(root, args, context, info);
};

const site = (next: SiteResolver): SiteResolver => async (root, args, context, info) => {
  const errors = validate(idSchema, args.id);
  if (errors) {
    return inputError(errors);
  }

  return next(root, args, context, info);
};

const resolvers: IResolvers = {
  Me: { template, site },
};

export default resolvers;
