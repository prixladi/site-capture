import { RawDoc } from '../../db';
import { JobDoc } from '../../db/job';
import { SiteDoc } from '../../db/site';
import { TemplateDoc } from '../../db/template';
import { JobType, MutationIdResult, MutationResult, MutationStatus, SiteType, TemplateType } from '../types';

const templateDocToType = (doc: RawDoc<TemplateDoc>): TemplateType => {
  const { _id, name, viewports, quality, userId } = doc;

  return {
    id: _id.toHexString(),
    userId: userId.toHexString(),
    name,
    viewports,
    quality,
  };
};

const siteDocToType = (doc: RawDoc<SiteDoc>): SiteType => {
  const { _id, name, url, viewports, quality, userId, latestJobId, subsites } = doc;

  return {
    id: _id.toHexString(),
    userId: userId.toHexString(),
    name,
    url,
    subsites,
    viewports,
    quality,
    latestJobId: latestJobId?.toString(),
  };
};

const jobDocToType = (doc: RawDoc<JobDoc>): JobType => {
  const { _id, progress, items, status, zipFileId, errorMessage } = doc;

  return {
    id: _id.toHexString(),
    progress,
    status,
    errorMessage,
    zipFileId: zipFileId?.toString(),
    items,
  };
};

const fallthroughResolver = (): unknown => ({});

const createMutationResult = (status: MutationStatus): MutationResult => {
  return {
    status,
  };
};

const createMutationIdResult = (id: string, status: MutationStatus): MutationIdResult => {
  return {
    id,
    status,
  };
};

export { templateDocToType, siteDocToType, jobDocToType, fallthroughResolver, createMutationResult, createMutationIdResult };
