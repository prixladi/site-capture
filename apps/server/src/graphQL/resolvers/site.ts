import { IResolvers, ISchemaLevelResolver, composeResolvers } from 'graphql-tools';
import { Context } from '../../types';
import { MutationIdResult, NewSiteInput, SiteType, UpdateSiteInput } from '../types';
import { ObjectID } from 'mongodb';
import { createMutationIdResult, fallthroughResolver, siteDocToType } from './utils';
import validationResolvers from './validation/site';
import { ApolloError } from 'apollo-server-express';

type CreateSiteResolver = ISchemaLevelResolver<void, Context, { site: NewSiteInput }, Promise<SiteType>>;
type UpdateSiteResolver = ISchemaLevelResolver<void, Context, { id: string; update: UpdateSiteInput }, Promise<SiteType>>;
type DeleteSiteResolver = ISchemaLevelResolver<void, Context, { id: string }, Promise<SiteType>>;

type RunJobResolver = ISchemaLevelResolver<void, Context, { id: string }, Promise<MutationIdResult>>;

const create: CreateSiteResolver = async (_, { site }, { db, getUser }) => {
  const doc = { ...site, _id: new ObjectID(), userId: new ObjectID(getUser().id) };
  await db.siteModel.create(doc);

  return siteDocToType(doc);
};

const update: UpdateSiteResolver = async (_, { id, update }, { db, getUser }) => {
  const doc = await db.siteModel.findOne({ _id: id });
  if (doc == null || doc.userId.toHexString() !== getUser().id) {
    throw new ApolloError('NOT_FOUND');
  }

  const updatedDoc = await db.siteModel.findOneAndUpdate({ _id: id }, update, { new: true });
  if (updatedDoc == null) {
    throw new ApolloError('NOT_FOUND');
  }

  return siteDocToType(updatedDoc);
};

const _delete: DeleteSiteResolver = async (_, { id }, { db, getUser }) => {
  const doc = await db.siteModel.findOneAndDelete({ _id: id, userId: getUser().id });
  if (doc == null) {
    throw new ApolloError('NOT_FOUND');
  }

  return siteDocToType(doc);
};

const runJob: RunJobResolver = async (_, { id }, { db, getUser }) => {
  const site = await db.siteModel.findOne({ _id: id, userId: getUser().id });
  if (site == null) {
    throw new ApolloError('NOT_FOUND');
  }

  const doc = {
    _id: new ObjectID(),
    userId: new ObjectID(getUser().id),
    url: site.url,
    subsites: site.subsites,
    viewports: site.viewports,
    quality: site.quality,
    status: false,
    aquired: false,
    progress: 0,
  };
  await db.jobModel.create(doc);
  await db.siteModel.updateOne({ _id: id }, { $set: { latestJobId: doc._id } });

  return createMutationIdResult(doc._id.toHexString(), 'OK');
};

const resolvers: IResolvers = {
  Mutation: { site: fallthroughResolver },
  SiteMutation: { runJob, create, update, delete: _delete },
};

export default composeResolvers(resolvers, validationResolvers);
