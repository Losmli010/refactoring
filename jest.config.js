module.exports = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: {
        target: 'esnext',
        sourceMap: true,
      },
    },
  },
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'lcov', 'text'],
  collectCoverageFrom: ['src/**/*.ts'],
  watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  rootDir: __dirname,
  testMatch: ['<rootDir>/**/__tests__/**/*test.[jt]s'],
};
