module.exports = {
  rootDir: '../../',
  verbose: true,
  bail: false,
  roots: [
    '<rootDir>/src/app/'
  ],
  globalSetup: '<rootDir>/test/e2e/setup.js',
  globalTeardown: '<rootDir>/test/e2e/teardown.js',
  testEnvironment: '<rootDir>/test/e2e/puppeteer.environment.js',
  testRegex: '(/__tests__/.*(e2e\.test))\\.(t|j)sx?$',
};
