/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ProgressItem = {
  __typename?: 'ProgressItem';
  url: Scalars['String'];
  status: Scalars['Boolean'];
  errorMessage?: Maybe<Scalars['String']>;
};

export type Job = {
  __typename?: 'Job';
  id: Scalars['ID'];
  progress: Scalars['Float'];
  items: Array<ProgressItem>;
  status: Scalars['Boolean'];
  errorMessage?: Maybe<Scalars['String']>;
  zipFileId?: Maybe<Scalars['String']>;
};

export type JobUpdated = {
  __typename?: 'JobUpdated';
  id: Scalars['ID'];
  progress: Scalars['Float'];
  status: Scalars['Boolean'];
  item?: Maybe<ProgressItem>;
  errorMessage?: Maybe<Scalars['String']>;
  zipFileId?: Maybe<Scalars['String']>;
};

export type NewJobInput = {
  url: Scalars['String'];
  viewports: Array<ViewportInput>;
  quality: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  /** Gets an anonymous job created through 'Mutation { runAnonymousJob }'. */
  anonymousJob?: Maybe<Job>;
  /** Cureently logged user node */
  me: Me;
};

export type QueryAnonymousJobArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Runs new job using provided data. */
  runAnonymousJob?: Maybe<MutationIdResult>;
  /** Site mutation node */
  site: SiteMutation;
  /** Template mutation node  */
  template: TemplateMutation;
};

export type MutationRunAnonymousJobArgs = {
  job?: Maybe<NewJobInput>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Subscribes for updates about job. */
  jobUpdated: JobUpdated;
};

export type SubscriptionJobUpdatedArgs = {
  id: Scalars['ID'];
};

export type Me = {
  __typename?: 'Me';
  id: Scalars['ID'];
  sites: Array<Site>;
  templates: Array<Template>;
  site?: Maybe<Site>;
  template?: Maybe<Template>;
  /** Gets a job created through 'Mutation { site { runJob } }'. */
  job?: Maybe<Job>;
};

export type MeSiteArgs = {
  id: Scalars['ID'];
};

export type MeTemplateArgs = {
  id: Scalars['ID'];
};

export type MeJobArgs = {
  id: Scalars['ID'];
};

export enum MutationStatus {
  Ok = 'OK',
  NotFound = 'NOT_FOUND',
  Conflict = 'CONFLICT',
}

export type MutationResult = {
  __typename?: 'MutationResult';
  status: MutationStatus;
};

export type MutationIdResult = {
  __typename?: 'MutationIdResult';
  id?: Maybe<Scalars['ID']>;
  status: MutationStatus;
};

export type Viewport = {
  __typename?: 'Viewport';
  width: Scalars['Int'];
  height: Scalars['Int'];
};

export type ViewportInput = {
  width: Scalars['Int'];
  height: Scalars['Int'];
};

export type PaginationInput = {
  skip: Scalars['Int'];
  limit: Scalars['Int'];
};

export type Site = {
  __typename?: 'Site';
  id: Scalars['ID'];
  name: Scalars['String'];
  url: Scalars['String'];
  subsites: Array<Scalars['String']>;
  viewports: Array<Viewport>;
  quality: Scalars['Int'];
  userId: Scalars['String'];
  latestJobId?: Maybe<Scalars['String']>;
};

export type NewSiteInput = {
  name: Scalars['String'];
  url: Scalars['String'];
  subsites: Array<Scalars['String']>;
  viewports: Array<ViewportInput>;
  quality: Scalars['Int'];
};

export type UpdateSiteInput = {
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  subsites?: Maybe<Array<Scalars['String']>>;
  viewports?: Maybe<Array<ViewportInput>>;
  quality?: Maybe<Scalars['Int']>;
};

export type SiteMutation = {
  __typename?: 'SiteMutation';
  /** Creates new site and returns result. */
  create: Site;
  /** Updates site and returns result. */
  update: Site;
  /** Deletes site and returns result. */
  delete: Site;
  /** Runs job using data from existing site.  */
  runJob: MutationIdResult;
};

export type SiteMutationCreateArgs = {
  site?: Maybe<NewSiteInput>;
};

export type SiteMutationUpdateArgs = {
  id?: Maybe<Scalars['ID']>;
  update?: Maybe<UpdateSiteInput>;
};

export type SiteMutationDeleteArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type SiteMutationRunJobArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type Template = {
  __typename?: 'Template';
  id: Scalars['ID'];
  name: Scalars['String'];
  viewports: Array<Viewport>;
  quality: Scalars['Int'];
  userId: Scalars['String'];
};

export type NewTemplateInput = {
  name: Scalars['String'];
  viewports: Array<ViewportInput>;
  quality: Scalars['Int'];
};

export type UpdateTemplateInput = {
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  viewports?: Maybe<Array<ViewportInput>>;
  quality?: Maybe<Scalars['Int']>;
  isPublic?: Maybe<Scalars['Boolean']>;
};

export type TemplateMutation = {
  __typename?: 'TemplateMutation';
  /** Creates new template and returns result. */
  create: Template;
  /** Updates site and returns result. */
  update: Template;
  /** Deletes site and returns result. */
  delete: Template;
};

export type TemplateMutationCreateArgs = {
  template?: Maybe<NewTemplateInput>;
};

export type TemplateMutationUpdateArgs = {
  id?: Maybe<Scalars['ID']>;
  update?: Maybe<UpdateTemplateInput>;
};

export type TemplateMutationDeleteArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type JobFieldsFragment = { __typename?: 'Job' } & Pick<Job, 'id' | 'progress' | 'status' | 'zipFileId' | 'errorMessage'> & {
    items: Array<{ __typename?: 'ProgressItem' } & ProgressItemFieldsFragment>;
  };

export type JobUpdatedFieldsFragment = { __typename?: 'JobUpdated' } & Pick<
  JobUpdated,
  'id' | 'progress' | 'status' | 'zipFileId' | 'errorMessage'
> & { item?: Maybe<{ __typename?: 'ProgressItem' } & ProgressItemFieldsFragment> };

export type MutationIdResultFieldsFragment = { __typename?: 'MutationIdResult' } & Pick<MutationIdResult, 'status' | 'id'>;

export type MutationResultFieldsFragment = { __typename?: 'MutationResult' } & Pick<MutationResult, 'status'>;

export type ProgressItemFieldsFragment = { __typename?: 'ProgressItem' } & Pick<ProgressItem, 'url' | 'status' | 'errorMessage'>;

export type SiteFieldsFragment = { __typename?: 'Site' } & Pick<Site, 'id' | 'name' | 'url' | 'quality' | 'subsites' | 'latestJobId'> & {
    viewports: Array<{ __typename?: 'Viewport' } & ViewportFieldsFragment>;
  };

export type TemplateFieldsFragment = { __typename?: 'Template' } & Pick<Template, 'id' | 'name' | 'quality'> & {
    viewports: Array<{ __typename?: 'Viewport' } & ViewportFieldsFragment>;
  };

export type ViewportFieldsFragment = { __typename?: 'Viewport' } & Pick<Viewport, 'width' | 'height'>;

export type RunAnonymousJobMutationVariables = Exact<{
  job: NewJobInput;
}>;

export type RunAnonymousJobMutation = { __typename?: 'Mutation' } & {
  runAnonymousJob?: Maybe<{ __typename?: 'MutationIdResult' } & MutationIdResultFieldsFragment>;
};

export type CreateSiteMutationVariables = Exact<{
  site: NewSiteInput;
}>;

export type CreateSiteMutation = { __typename?: 'Mutation' } & {
  site: { __typename?: 'SiteMutation' } & { create: { __typename?: 'Site' } & SiteFieldsFragment };
};

export type DeleteSiteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type DeleteSiteMutation = { __typename?: 'Mutation' } & {
  site: { __typename?: 'SiteMutation' } & { delete: { __typename?: 'Site' } & SiteFieldsFragment };
};

export type RunSiteJobMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type RunSiteJobMutation = { __typename?: 'Mutation' } & {
  site: { __typename?: 'SiteMutation' } & { runJob: { __typename?: 'MutationIdResult' } & MutationIdResultFieldsFragment };
};

export type UpdateSiteMutationVariables = Exact<{
  id: Scalars['ID'];
  update: UpdateSiteInput;
}>;

export type UpdateSiteMutation = { __typename?: 'Mutation' } & {
  site: { __typename?: 'SiteMutation' } & { update: { __typename?: 'Site' } & SiteFieldsFragment };
};

export type CreateTemplateMutationVariables = Exact<{
  template: NewTemplateInput;
}>;

export type CreateTemplateMutation = { __typename?: 'Mutation' } & {
  template: { __typename?: 'TemplateMutation' } & { create: { __typename?: 'Template' } & TemplateFieldsFragment };
};

export type DeleteTemplateMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type DeleteTemplateMutation = { __typename?: 'Mutation' } & {
  template: { __typename?: 'TemplateMutation' } & { delete: { __typename?: 'Template' } & TemplateFieldsFragment };
};

export type UpdateTemplateMutationVariables = Exact<{
  id: Scalars['ID'];
  update: UpdateTemplateInput;
}>;

export type UpdateTemplateMutation = { __typename?: 'Mutation' } & {
  template: { __typename?: 'TemplateMutation' } & { update: { __typename?: 'Template' } & TemplateFieldsFragment };
};

export type AnonymousJobQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type AnonymousJobQuery = { __typename?: 'Query' } & { anonymousJob?: Maybe<{ __typename?: 'Job' } & JobFieldsFragment> };

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'Me' } & Pick<Me, 'id'> & {
      templates: Array<{ __typename?: 'Template' } & TemplateFieldsFragment>;
      sites: Array<{ __typename?: 'Site' } & SiteFieldsFragment>;
    };
};

export type JobQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type JobQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'Me' } & Pick<Me, 'id'> & { job?: Maybe<{ __typename?: 'Job' } & JobFieldsFragment> };
};

export type SiteQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type SiteQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'Me' } & Pick<Me, 'id'> & { site?: Maybe<{ __typename?: 'Site' } & SiteFieldsFragment> };
};

export type TemplateQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type TemplateQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'Me' } & Pick<Me, 'id'> & { template?: Maybe<{ __typename?: 'Template' } & TemplateFieldsFragment> };
};

export type JobUpdatedSubscriptionVariables = Exact<{
  id: Scalars['ID'];
}>;

export type JobUpdatedSubscription = { __typename?: 'Subscription' } & {
  jobUpdated: { __typename?: 'JobUpdated' } & JobUpdatedFieldsFragment;
};

export const ProgressItemFieldsFragmentDoc = gql`
  fragment progressItemFields on ProgressItem {
    url
    status
    errorMessage
  }
`;
export const JobFieldsFragmentDoc = gql`
  fragment jobFields on Job {
    id
    progress
    status
    zipFileId
    errorMessage
    items {
      ...progressItemFields
    }
  }
  ${ProgressItemFieldsFragmentDoc}
`;
export const JobUpdatedFieldsFragmentDoc = gql`
  fragment jobUpdatedFields on JobUpdated {
    id
    progress
    status
    zipFileId
    errorMessage
    item {
      ...progressItemFields
    }
  }
  ${ProgressItemFieldsFragmentDoc}
`;
export const MutationIdResultFieldsFragmentDoc = gql`
  fragment mutationIdResultFields on MutationIdResult {
    status
    id
  }
`;
export const MutationResultFieldsFragmentDoc = gql`
  fragment mutationResultFields on MutationResult {
    status
  }
`;
export const ViewportFieldsFragmentDoc = gql`
  fragment viewportFields on Viewport {
    width
    height
  }
`;
export const SiteFieldsFragmentDoc = gql`
  fragment siteFields on Site {
    id
    name
    url
    quality
    subsites
    latestJobId
    viewports {
      ...viewportFields
    }
  }
  ${ViewportFieldsFragmentDoc}
`;
export const TemplateFieldsFragmentDoc = gql`
  fragment templateFields on Template {
    id
    name
    quality
    viewports {
      ...viewportFields
    }
  }
  ${ViewportFieldsFragmentDoc}
`;
export const RunAnonymousJobDocument = gql`
  mutation runAnonymousJob($job: NewJobInput!) {
    runAnonymousJob(job: $job) {
      ...mutationIdResultFields
    }
  }
  ${MutationIdResultFieldsFragmentDoc}
`;
export type RunAnonymousJobMutationFn = Apollo.MutationFunction<RunAnonymousJobMutation, RunAnonymousJobMutationVariables>;

/**
 * __useRunAnonymousJobMutation__
 *
 * To run a mutation, you first call `useRunAnonymousJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRunAnonymousJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [runAnonymousJobMutation, { data, loading, error }] = useRunAnonymousJobMutation({
 *   variables: {
 *      job: // value for 'job'
 *   },
 * });
 */
export function useRunAnonymousJobMutation(
  baseOptions?: Apollo.MutationHookOptions<RunAnonymousJobMutation, RunAnonymousJobMutationVariables>,
) {
  return Apollo.useMutation<RunAnonymousJobMutation, RunAnonymousJobMutationVariables>(RunAnonymousJobDocument, baseOptions);
}
export type RunAnonymousJobMutationHookResult = ReturnType<typeof useRunAnonymousJobMutation>;
export type RunAnonymousJobMutationResult = Apollo.MutationResult<RunAnonymousJobMutation>;
export type RunAnonymousJobMutationOptions = Apollo.BaseMutationOptions<RunAnonymousJobMutation, RunAnonymousJobMutationVariables>;
export const CreateSiteDocument = gql`
  mutation createSite($site: NewSiteInput!) {
    site {
      create(site: $site) {
        ...siteFields
      }
    }
  }
  ${SiteFieldsFragmentDoc}
`;
export type CreateSiteMutationFn = Apollo.MutationFunction<CreateSiteMutation, CreateSiteMutationVariables>;

/**
 * __useCreateSiteMutation__
 *
 * To run a mutation, you first call `useCreateSiteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSiteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSiteMutation, { data, loading, error }] = useCreateSiteMutation({
 *   variables: {
 *      site: // value for 'site'
 *   },
 * });
 */
export function useCreateSiteMutation(baseOptions?: Apollo.MutationHookOptions<CreateSiteMutation, CreateSiteMutationVariables>) {
  return Apollo.useMutation<CreateSiteMutation, CreateSiteMutationVariables>(CreateSiteDocument, baseOptions);
}
export type CreateSiteMutationHookResult = ReturnType<typeof useCreateSiteMutation>;
export type CreateSiteMutationResult = Apollo.MutationResult<CreateSiteMutation>;
export type CreateSiteMutationOptions = Apollo.BaseMutationOptions<CreateSiteMutation, CreateSiteMutationVariables>;
export const DeleteSiteDocument = gql`
  mutation deleteSite($id: ID!) {
    site {
      delete(id: $id) {
        ...siteFields
      }
    }
  }
  ${SiteFieldsFragmentDoc}
`;
export type DeleteSiteMutationFn = Apollo.MutationFunction<DeleteSiteMutation, DeleteSiteMutationVariables>;

/**
 * __useDeleteSiteMutation__
 *
 * To run a mutation, you first call `useDeleteSiteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSiteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSiteMutation, { data, loading, error }] = useDeleteSiteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSiteMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSiteMutation, DeleteSiteMutationVariables>) {
  return Apollo.useMutation<DeleteSiteMutation, DeleteSiteMutationVariables>(DeleteSiteDocument, baseOptions);
}
export type DeleteSiteMutationHookResult = ReturnType<typeof useDeleteSiteMutation>;
export type DeleteSiteMutationResult = Apollo.MutationResult<DeleteSiteMutation>;
export type DeleteSiteMutationOptions = Apollo.BaseMutationOptions<DeleteSiteMutation, DeleteSiteMutationVariables>;
export const RunSiteJobDocument = gql`
  mutation runSiteJob($id: ID!) {
    site {
      runJob(id: $id) {
        ...mutationIdResultFields
      }
    }
  }
  ${MutationIdResultFieldsFragmentDoc}
`;
export type RunSiteJobMutationFn = Apollo.MutationFunction<RunSiteJobMutation, RunSiteJobMutationVariables>;

/**
 * __useRunSiteJobMutation__
 *
 * To run a mutation, you first call `useRunSiteJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRunSiteJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [runSiteJobMutation, { data, loading, error }] = useRunSiteJobMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRunSiteJobMutation(baseOptions?: Apollo.MutationHookOptions<RunSiteJobMutation, RunSiteJobMutationVariables>) {
  return Apollo.useMutation<RunSiteJobMutation, RunSiteJobMutationVariables>(RunSiteJobDocument, baseOptions);
}
export type RunSiteJobMutationHookResult = ReturnType<typeof useRunSiteJobMutation>;
export type RunSiteJobMutationResult = Apollo.MutationResult<RunSiteJobMutation>;
export type RunSiteJobMutationOptions = Apollo.BaseMutationOptions<RunSiteJobMutation, RunSiteJobMutationVariables>;
export const UpdateSiteDocument = gql`
  mutation updateSite($id: ID!, $update: UpdateSiteInput!) {
    site {
      update(id: $id, update: $update) {
        ...siteFields
      }
    }
  }
  ${SiteFieldsFragmentDoc}
`;
export type UpdateSiteMutationFn = Apollo.MutationFunction<UpdateSiteMutation, UpdateSiteMutationVariables>;

/**
 * __useUpdateSiteMutation__
 *
 * To run a mutation, you first call `useUpdateSiteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSiteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSiteMutation, { data, loading, error }] = useUpdateSiteMutation({
 *   variables: {
 *      id: // value for 'id'
 *      update: // value for 'update'
 *   },
 * });
 */
export function useUpdateSiteMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSiteMutation, UpdateSiteMutationVariables>) {
  return Apollo.useMutation<UpdateSiteMutation, UpdateSiteMutationVariables>(UpdateSiteDocument, baseOptions);
}
export type UpdateSiteMutationHookResult = ReturnType<typeof useUpdateSiteMutation>;
export type UpdateSiteMutationResult = Apollo.MutationResult<UpdateSiteMutation>;
export type UpdateSiteMutationOptions = Apollo.BaseMutationOptions<UpdateSiteMutation, UpdateSiteMutationVariables>;
export const CreateTemplateDocument = gql`
  mutation createTemplate($template: NewTemplateInput!) {
    template {
      create(template: $template) {
        ...templateFields
      }
    }
  }
  ${TemplateFieldsFragmentDoc}
`;
export type CreateTemplateMutationFn = Apollo.MutationFunction<CreateTemplateMutation, CreateTemplateMutationVariables>;

/**
 * __useCreateTemplateMutation__
 *
 * To run a mutation, you first call `useCreateTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTemplateMutation, { data, loading, error }] = useCreateTemplateMutation({
 *   variables: {
 *      template: // value for 'template'
 *   },
 * });
 */
export function useCreateTemplateMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateTemplateMutation, CreateTemplateMutationVariables>,
) {
  return Apollo.useMutation<CreateTemplateMutation, CreateTemplateMutationVariables>(CreateTemplateDocument, baseOptions);
}
export type CreateTemplateMutationHookResult = ReturnType<typeof useCreateTemplateMutation>;
export type CreateTemplateMutationResult = Apollo.MutationResult<CreateTemplateMutation>;
export type CreateTemplateMutationOptions = Apollo.BaseMutationOptions<CreateTemplateMutation, CreateTemplateMutationVariables>;
export const DeleteTemplateDocument = gql`
  mutation deleteTemplate($id: ID!) {
    template {
      delete(id: $id) {
        ...templateFields
      }
    }
  }
  ${TemplateFieldsFragmentDoc}
`;
export type DeleteTemplateMutationFn = Apollo.MutationFunction<DeleteTemplateMutation, DeleteTemplateMutationVariables>;

/**
 * __useDeleteTemplateMutation__
 *
 * To run a mutation, you first call `useDeleteTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTemplateMutation, { data, loading, error }] = useDeleteTemplateMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTemplateMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteTemplateMutation, DeleteTemplateMutationVariables>,
) {
  return Apollo.useMutation<DeleteTemplateMutation, DeleteTemplateMutationVariables>(DeleteTemplateDocument, baseOptions);
}
export type DeleteTemplateMutationHookResult = ReturnType<typeof useDeleteTemplateMutation>;
export type DeleteTemplateMutationResult = Apollo.MutationResult<DeleteTemplateMutation>;
export type DeleteTemplateMutationOptions = Apollo.BaseMutationOptions<DeleteTemplateMutation, DeleteTemplateMutationVariables>;
export const UpdateTemplateDocument = gql`
  mutation updateTemplate($id: ID!, $update: UpdateTemplateInput!) {
    template {
      update(id: $id, update: $update) {
        ...templateFields
      }
    }
  }
  ${TemplateFieldsFragmentDoc}
`;
export type UpdateTemplateMutationFn = Apollo.MutationFunction<UpdateTemplateMutation, UpdateTemplateMutationVariables>;

/**
 * __useUpdateTemplateMutation__
 *
 * To run a mutation, you first call `useUpdateTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTemplateMutation, { data, loading, error }] = useUpdateTemplateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      update: // value for 'update'
 *   },
 * });
 */
export function useUpdateTemplateMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateTemplateMutation, UpdateTemplateMutationVariables>,
) {
  return Apollo.useMutation<UpdateTemplateMutation, UpdateTemplateMutationVariables>(UpdateTemplateDocument, baseOptions);
}
export type UpdateTemplateMutationHookResult = ReturnType<typeof useUpdateTemplateMutation>;
export type UpdateTemplateMutationResult = Apollo.MutationResult<UpdateTemplateMutation>;
export type UpdateTemplateMutationOptions = Apollo.BaseMutationOptions<UpdateTemplateMutation, UpdateTemplateMutationVariables>;
export const AnonymousJobDocument = gql`
  query anonymousJob($id: ID!) {
    anonymousJob(id: $id) {
      ...jobFields
    }
  }
  ${JobFieldsFragmentDoc}
`;

/**
 * __useAnonymousJobQuery__
 *
 * To run a query within a React component, call `useAnonymousJobQuery` and pass it any options that fit your needs.
 * When your component renders, `useAnonymousJobQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAnonymousJobQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAnonymousJobQuery(baseOptions: Apollo.QueryHookOptions<AnonymousJobQuery, AnonymousJobQueryVariables>) {
  return Apollo.useQuery<AnonymousJobQuery, AnonymousJobQueryVariables>(AnonymousJobDocument, baseOptions);
}
export function useAnonymousJobLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AnonymousJobQuery, AnonymousJobQueryVariables>) {
  return Apollo.useLazyQuery<AnonymousJobQuery, AnonymousJobQueryVariables>(AnonymousJobDocument, baseOptions);
}
export type AnonymousJobQueryHookResult = ReturnType<typeof useAnonymousJobQuery>;
export type AnonymousJobLazyQueryHookResult = ReturnType<typeof useAnonymousJobLazyQuery>;
export type AnonymousJobQueryResult = Apollo.QueryResult<AnonymousJobQuery, AnonymousJobQueryVariables>;
export const MeDocument = gql`
  query me {
    me {
      id
      templates {
        ...templateFields
      }
      sites {
        ...siteFields
      }
    }
  }
  ${TemplateFieldsFragmentDoc}
  ${SiteFieldsFragmentDoc}
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const JobDocument = gql`
  query job($id: ID!) {
    me {
      id
      job(id: $id) {
        ...jobFields
      }
    }
  }
  ${JobFieldsFragmentDoc}
`;

/**
 * __useJobQuery__
 *
 * To run a query within a React component, call `useJobQuery` and pass it any options that fit your needs.
 * When your component renders, `useJobQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJobQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useJobQuery(baseOptions: Apollo.QueryHookOptions<JobQuery, JobQueryVariables>) {
  return Apollo.useQuery<JobQuery, JobQueryVariables>(JobDocument, baseOptions);
}
export function useJobLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<JobQuery, JobQueryVariables>) {
  return Apollo.useLazyQuery<JobQuery, JobQueryVariables>(JobDocument, baseOptions);
}
export type JobQueryHookResult = ReturnType<typeof useJobQuery>;
export type JobLazyQueryHookResult = ReturnType<typeof useJobLazyQuery>;
export type JobQueryResult = Apollo.QueryResult<JobQuery, JobQueryVariables>;
export const SiteDocument = gql`
  query site($id: ID!) {
    me {
      id
      site(id: $id) {
        ...siteFields
      }
    }
  }
  ${SiteFieldsFragmentDoc}
`;

/**
 * __useSiteQuery__
 *
 * To run a query within a React component, call `useSiteQuery` and pass it any options that fit your needs.
 * When your component renders, `useSiteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSiteQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSiteQuery(baseOptions: Apollo.QueryHookOptions<SiteQuery, SiteQueryVariables>) {
  return Apollo.useQuery<SiteQuery, SiteQueryVariables>(SiteDocument, baseOptions);
}
export function useSiteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SiteQuery, SiteQueryVariables>) {
  return Apollo.useLazyQuery<SiteQuery, SiteQueryVariables>(SiteDocument, baseOptions);
}
export type SiteQueryHookResult = ReturnType<typeof useSiteQuery>;
export type SiteLazyQueryHookResult = ReturnType<typeof useSiteLazyQuery>;
export type SiteQueryResult = Apollo.QueryResult<SiteQuery, SiteQueryVariables>;
export const TemplateDocument = gql`
  query template($id: ID!) {
    me {
      id
      template(id: $id) {
        ...templateFields
      }
    }
  }
  ${TemplateFieldsFragmentDoc}
`;

/**
 * __useTemplateQuery__
 *
 * To run a query within a React component, call `useTemplateQuery` and pass it any options that fit your needs.
 * When your component renders, `useTemplateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTemplateQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTemplateQuery(baseOptions: Apollo.QueryHookOptions<TemplateQuery, TemplateQueryVariables>) {
  return Apollo.useQuery<TemplateQuery, TemplateQueryVariables>(TemplateDocument, baseOptions);
}
export function useTemplateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TemplateQuery, TemplateQueryVariables>) {
  return Apollo.useLazyQuery<TemplateQuery, TemplateQueryVariables>(TemplateDocument, baseOptions);
}
export type TemplateQueryHookResult = ReturnType<typeof useTemplateQuery>;
export type TemplateLazyQueryHookResult = ReturnType<typeof useTemplateLazyQuery>;
export type TemplateQueryResult = Apollo.QueryResult<TemplateQuery, TemplateQueryVariables>;
export const JobUpdatedDocument = gql`
  subscription jobUpdated($id: ID!) {
    jobUpdated(id: $id) {
      ...jobUpdatedFields
    }
  }
  ${JobUpdatedFieldsFragmentDoc}
`;

/**
 * __useJobUpdatedSubscription__
 *
 * To run a query within a React component, call `useJobUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useJobUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJobUpdatedSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useJobUpdatedSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<JobUpdatedSubscription, JobUpdatedSubscriptionVariables>,
) {
  return Apollo.useSubscription<JobUpdatedSubscription, JobUpdatedSubscriptionVariables>(JobUpdatedDocument, baseOptions);
}
export type JobUpdatedSubscriptionHookResult = ReturnType<typeof useJobUpdatedSubscription>;
export type JobUpdatedSubscriptionResult = Apollo.SubscriptionResult<JobUpdatedSubscription>;
