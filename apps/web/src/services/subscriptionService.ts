import { SubscribeToMoreOptions } from '@apollo/client';
import { AnonymousJobQuery, Exact, JobQuery, JobUpdatedDocument, JobUpdatedSubscription } from '../graphql';

type AnonymousJobOptions = SubscribeToMoreOptions<AnonymousJobQuery, Exact<{ id: string }>, JobUpdatedSubscription>;

const getAnnonymousJobSubscriptionOptions = (id: string): AnonymousJobOptions => {
  return {
    document: JobUpdatedDocument,
    variables: { id },
    updateQuery: (prev, { subscriptionData }) => {
      const { anonymousJob, ...prevRest } = prev;
      if (!subscriptionData.data) {
        return prev;
      }
      if (anonymousJob && anonymousJob.progress > subscriptionData.data.jobUpdated.progress) {
        return prev;
      }

      const { item, ...jobUpdatedRest } = subscriptionData.data.jobUpdated;

      const getItems = () => {
        if (!anonymousJob?.items) {
          return item ? [item] : [];
        } else {
          return item ? [...anonymousJob.items, item] : anonymousJob.items;
        }
      };

      const newData: AnonymousJobQuery = {
        ...prevRest,
        anonymousJob: {
          ...jobUpdatedRest,
          __typename: anonymousJob?.__typename,
          items: getItems(),
        },
      };

      return newData;
    },
  };
};

type JobOptions = SubscribeToMoreOptions<JobQuery, Exact<{ id: string }>, JobUpdatedSubscription>;

const getJobSubscriptionOptions = (id: string): JobOptions => {
  return {
    document: JobUpdatedDocument,
    variables: { id },
    updateQuery: (prev, { subscriptionData }) => {
      const { me, ...prevRest } = prev;
      const { job, ...meRest } = me;

      if (!subscriptionData.data) {
        return prev;
      }
      if (job && job.progress > subscriptionData.data.jobUpdated.progress) {
        return prev;
      }

      const { item, ...jobUpdatedRest } = subscriptionData.data.jobUpdated;

      const getItems = () => {
        if (!job?.items) {
          return item ? [item] : [];
        } else {
          return item ? [...job.items, item] : job.items;
        }
      };

      const newData: JobQuery = {
        ...prevRest,
        me: {
          ...meRest,
          job: {
            ...jobUpdatedRest,
            __typename: job?.__typename,
            items: getItems(),
          },
        },
      };

      return newData;
    },
  };
};

export { getAnnonymousJobSubscriptionOptions, getJobSubscriptionOptions };
