import { devEnvironment } from '../configs';

const appoloLogger = {
  debug: (message?: unknown): void => {
    if (devEnvironment) {
      console.debug(message);
    }
  },
  info: (message?: unknown): void => {
    if (devEnvironment) {
      console.debug(message);
    }
  },
  warn: (message?: unknown): void => {
    console.warn(message);
  },
  error: (message?: unknown): void => {
    console.error(message);
  },
};

export default appoloLogger;
