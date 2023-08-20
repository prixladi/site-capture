const port = process.env.REDIS_PORT && Number.parseInt(process.env.REDIS_PORT);

export default {
  host: process.env.REDIS_HOST || 'localhost',
  port: port || 6379,
};
