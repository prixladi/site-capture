type Viewport = {
  width: number;
  height: number;
};

type NewTemplateInput = {
  name: string;
  viewports: Viewport[];
  quality: number;
};

type UpdateTemplateInput = Partial<NewTemplateInput>;

type TemplateType = {
  id: string;
  name: string;
  viewports: Viewport[];
  quality: number;
  userId: string;
};

type NewSiteInput = {
  name: string;
  url: string;
  subsites: string[];
  viewports: Viewport[];
  quality: number;
};

type UpdateSiteInput = Partial<NewSiteInput>;

type SiteType = {
  id: string;
  name: string;
  url: string;
  subsites: string[];
  viewports: Viewport[];
  quality: number;
  userId: string;
  latestJobId?: string;
};

type ProgressItem = {
  url: string;
  status: boolean;
  message?: string;
};

type JobType = {
  id: string;
  progress: number;
  status: boolean;
  errorMessage?: string;
  zipFileId?: string;
  items?: ProgressItem[];
};

type JobUpdatedType = {
  id: string;
  progress: number;
  status: boolean;
  errorMessage?: string;
  zipFileId?: string;
  item: ProgressItem[];
};

type NewJobInput = {
  url: string;
  viewports: Viewport[];
  quality: number;
};

type MeType = {
  id: string;
};

type PaginationInput = {
  skip: number;
  limit: number;
};

type MutationStatus = 'OK' | 'NOT_FOUND';

type MutationResult = {
  status: MutationStatus;
};

type MutationIdResult = MutationResult & {
  id?: string;
};

export {
  Viewport,
  NewTemplateInput,
  UpdateTemplateInput,
  TemplateType,
  NewSiteInput,
  UpdateSiteInput,
  SiteType,
  JobType,
  JobUpdatedType,
  NewJobInput,
  MeType,
  PaginationInput,
  MutationStatus,
  MutationResult,
  MutationIdResult,
};
