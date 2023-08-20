import Stopwatch from './stopwatch';

const logJobStart = (jobId: string): void => {
  console.log(`Found job to process, id: '${jobId}'.`);
};

const logJobFinish = (jobId: string, stopwatch: Stopwatch): void => {
  console.log(`   -- Job with id '${jobId}' proccessed in ${stopwatch.elapsed}ms.`);
};

const logOperation = (operationName: string, stopwatch: Stopwatch): void => {
  console.log(`   -- ${operationName} - elapsed ${stopwatch.elapsed}ms`);
};

const logError = (err: unknown): void => {
  console.error(err);
};

export { logJobStart, logJobFinish, logOperation, logError };
