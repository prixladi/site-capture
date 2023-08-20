import { MutationUpdaterFn } from '@apollo/client';
import {
  CreateSiteMutation,
  CreateTemplateMutation,
  DeleteSiteMutation,
  DeleteTemplateMutation,
  MeDocument,
  MeQuery,
  RunSiteJobMutation,
  SiteDocument,
  SiteQuery,
  TemplateDocument,
  TemplateQuery,
} from '../graphql';

const siteOnCreateUpdate = (userId?: string): MutationUpdaterFn<CreateSiteMutation> => (cache, result) => {
  if (result.data) {
    const oldMe = cache.readQuery<MeQuery>({ query: MeDocument });
    if (oldMe) {
      const newMe = {
        ...oldMe,
        me: {
          ...oldMe.me,
          sites: [...oldMe.me.sites, result.data.site.create],
        },
      };

      cache.writeQuery<MeQuery>({ query: MeDocument, data: newMe });
    }

    if (userId) {
      const newData: SiteQuery = {
        __typename: 'Query',
        me: {
          id: userId as string,
          __typename: 'Me',
          site: {
            ...result.data.site.create,
            __typename: 'Site',
          },
        },
      };
      cache.writeQuery<SiteQuery>({
        query: SiteDocument,
        variables: { id: result.data.site.create.id },
        data: newData,
      });
    }
  }
};

const siteOnDeleteUpdate = (userId?: string): MutationUpdaterFn<DeleteSiteMutation> => (cache, result) => {
  if (result.data) {
    const oldMe = cache.readQuery<MeQuery>({ query: MeDocument });
    if (oldMe) {
      const newMe = {
        ...oldMe,
        me: {
          ...oldMe.me,
          sites: oldMe.me.sites.filter((site) => site.id !== result.data?.site.delete.id),
        },
      };

      cache.writeQuery<MeQuery>({ query: MeDocument, data: newMe });
    }

    const oldDetail = cache.readQuery<SiteQuery>({ query: SiteDocument, variables: { id: result.data.site.delete.id } });
    if (oldDetail && userId) {
      const newDetail: SiteQuery = {
        __typename: 'Query',
        me: {
          id: userId,
          __typename: 'Me',
          site: null,
        },
      };

      cache.writeQuery<SiteQuery>({
        query: SiteDocument,
        variables: { id: result.data.site.delete.id },
        data: newDetail,
      });
    }
  }
};

const siteOnRunJobUpdate = (siteId: string, userId?: string): MutationUpdaterFn<RunSiteJobMutation> => (cache, result) => {
  if (result.data && userId) {
    const oldDetail = cache.readQuery<SiteQuery>({ query: SiteDocument, variables: { id: siteId } });
    if (oldDetail && oldDetail.me.site) {
      const newSite = { 
        ...oldDetail.me.site,
        latestJobId: result.data.site.runJob.id
      }

      const newDetail: SiteQuery = {
        __typename: 'Query',
        me: {
          id: userId,
          __typename: 'Me',
          site: newSite,
        },
      };

      cache.writeQuery<SiteQuery>({
        query: SiteDocument,
        variables: { id: siteId },
        data: newDetail,
      });
    }
  }
};

const templateOnCreateUpdate = (userId?: string): MutationUpdaterFn<CreateTemplateMutation> => (cache, result) => {
  if (result.data) {
    const oldMe = cache.readQuery<MeQuery>({ query: MeDocument });
    if (oldMe) {
      const newMe = {
        ...oldMe,
        me: {
          ...oldMe.me,
          templates: [...oldMe.me.templates, result.data.template.create],
        },
      };

      cache.writeQuery<MeQuery>({ query: MeDocument, data: newMe });
    }

    if (userId) {
      const newData: TemplateQuery = {
        __typename: 'Query',
        me: {
          id: userId as string,
          __typename: 'Me',
          template: {
            ...result.data.template.create,
            __typename: 'Template',
          },
        },
      };
      cache.writeQuery<TemplateQuery>({
        query: TemplateDocument,
        variables: { id: result.data.template.create.id },
        data: newData,
      });
    }
  }
};

const templateOnDeleteUpdate = (userId?: string): MutationUpdaterFn<DeleteTemplateMutation> => (cache, result) => {
  if (result.data) {
    const oldMe = cache.readQuery<MeQuery>({ query: MeDocument });
    if (oldMe) {
      const newMe = {
        ...oldMe,
        me: {
          ...oldMe.me,
          templates: oldMe.me.templates.filter((template) => template.id !== result.data?.template.delete.id),
        },
      };

      cache.writeQuery<MeQuery>({ query: MeDocument, data: newMe });
    }

    const oldDetail = cache.readQuery<TemplateQuery>({ query: TemplateDocument, variables: { id: result.data.template.delete.id } });
    if (oldDetail && userId) {
      const newDetail: TemplateQuery = {
        __typename: 'Query',
        me: {
          id: userId,
          __typename: 'Me',
          template: null,
        },
      };

      cache.writeQuery<TemplateQuery>({
        query: TemplateDocument,
        variables: { id: result.data.template.delete.id },
        data: newDetail,
      });
    }
  }
};

export { siteOnCreateUpdate, templateOnCreateUpdate, siteOnDeleteUpdate, templateOnDeleteUpdate, siteOnRunJobUpdate };
