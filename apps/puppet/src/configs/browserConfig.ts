const isTrue = (str: string) => {
  return ['true', 1].some((t) => t.toString().localeCompare(str, undefined, { sensitivity: 'accent' }) === 0);
};

export default {
  maxParallelTabs: process.env.MAX_PARALLEL_TABS || '1',
  useSandbox: !process.env.USE_SANDBOX || isTrue(process.env.USE_SANDBOX),
};
