import React, { useEffect } from 'react';
import { useAnonymousJobQuery, useJobQuery } from '../../graphql';
import { getAnnonymousJobSubscriptionOptions, getJobSubscriptionOptions } from '../../services/subscriptionService';
import useApolloErrorHandling from '../../hooks/useApolloErrorHandling';
import DataDisplay from './DataDisplay';

type Props = {
  jobId: string;
  setLoading: (loading: boolean) => void;
};

type AnonymousProps = {
  jobId: string;
  setLoading: (loading: boolean) => void;
  onNotFound: () => void;
};

const JobProgress: React.FC<Props> = ({ jobId, setLoading }: Props) => {
  const { loading, data, error, subscribeToMore } = useJobQuery({ variables: { id: jobId } });
  useApolloErrorHandling(error);

  useEffect(() => {
    const options = getJobSubscriptionOptions(jobId);
    const unsubscribe = subscribeToMore(options);
    return () => unsubscribe();
  }, [jobId, subscribeToMore]);

  useEffect(() => {
    const isLoading = loading || !!error || !data || !data.me.job || data.me.job.progress < 100;
    setLoading(isLoading);
  }, [loading, data, error, setLoading]);

  if (!data) {
    return null;
  }

  if (!data.me.job) {
    console.error(`Anonymous job with id ${jobId} was not found.`);
    return null;
  }

  return <DataDisplay {...data.me.job} />;
};

const AnonymousJobProgress: React.FC<AnonymousProps> = ({ jobId, setLoading, onNotFound }: AnonymousProps) => {
  const { loading, data, error, subscribeToMore } = useAnonymousJobQuery({ variables: { id: jobId } });
  useApolloErrorHandling(error);

  useEffect(() => {
    const options = getAnnonymousJobSubscriptionOptions(jobId);
    const unsubscribe = subscribeToMore(options);
    return () => unsubscribe();
  }, [jobId, subscribeToMore]);

  useEffect(() => {
    const isLoading = loading || !!error || !data || (!!data.anonymousJob && data.anonymousJob.progress < 100);
    setLoading(isLoading);
  }, [loading, data, error, setLoading]);

  useEffect(() => {
    if (!!data && !data.anonymousJob) {
      onNotFound();
      setLoading(false);
      console.error(`Anonymous job with id ${jobId} was not found.`);
    }
  }, [data, setLoading, jobId, onNotFound]);

  if (!data) {
    return null;
  }

  if (!data.anonymousJob) {
    return null;
  }

  return <DataDisplay {...data.anonymousJob} />;
};

export { JobProgress, AnonymousJobProgress };
