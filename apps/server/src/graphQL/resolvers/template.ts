import { composeResolvers, IResolvers, ISchemaLevelResolver } from 'graphql-tools';
import { Context } from '../../types';
import { NewTemplateInput, TemplateType, UpdateTemplateInput } from '../types';
import { ObjectID } from 'mongodb';
import { fallthroughResolver, templateDocToType } from './utils';
import validationResolvers from './validation/template';
import { ApolloError } from 'apollo-server-express';

type CreateTemplateResolver = ISchemaLevelResolver<void, Context, { template: NewTemplateInput }, Promise<TemplateType>>;
type UpdateTemplateResolver = ISchemaLevelResolver<void, Context, { id: string; update: UpdateTemplateInput }, Promise<TemplateType>>;
type DeleteTemplateResolver = ISchemaLevelResolver<void, Context, { id: string }, Promise<TemplateType>>;

const create: CreateTemplateResolver = async (_, { template }, { db, getUser }) => {
  const doc = { ...template, _id: new ObjectID(), userId: new ObjectID(getUser().id) };
  await db.templateModel.create(doc);

  return templateDocToType(doc);
};

const update: UpdateTemplateResolver = async (_, { id, update }, { db, getUser }) => {
  const doc = await db.templateModel.findOne({ _id: id });
  if (doc == null || doc.userId.toHexString() !== getUser().id) {
    throw new ApolloError('NOT_FOUND');
  }

  const updatedDoc = await db.templateModel.findOneAndUpdate({ _id: id }, update, { new: true });
  if (updatedDoc == null) {
    throw new ApolloError('NOT_FOUND');
  }

  return templateDocToType(updatedDoc);
};

const _delete: DeleteTemplateResolver = async (_, { id }, { db, getUser }) => {
  const doc = await db.templateModel.findOneAndDelete({ _id: id, userId: getUser().id });
  if (doc == null) {
    throw new ApolloError('NOT_FOUND');
  }

  return templateDocToType(doc);
};

const resolvers: IResolvers = {
  Mutation: { template: fallthroughResolver },
  TemplateMutation: { create, update, delete: _delete },
};

export default composeResolvers(resolvers, validationResolvers);
