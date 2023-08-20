module.exports = {
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/tests/**/*test.(ts|tsx)'],
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
  testPathIgnorePatterns: ['./.next/', './node_modules/'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
    },
  },
};
