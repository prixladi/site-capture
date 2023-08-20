import mongoConfig from './mongoConfig';
import redisConfig from './redisConfig';
import browserConfig from './browserConfig';

const devEnvironment = process.env.NODE_ENV === 'development';

export { devEnvironment };
export { mongoConfig, redisConfig, browserConfig };
