module.exports = {
  rootDir: '../',
  verbose: true,
  bail: false,
  roots: [
    '<rootDir>/src/app/'
  ],
  setupFiles: [
    '<rootDir>/test/test-setup.ts',
    '<rootDir>/test/test-shim.ts',
    '<rootDir>/test/mocks-global.ts'
  ],
  modulePathIgnorePatterns: [
    'build',
    'dist',
    'node_modules'
  ],
  transform: {
    '\\.svg$': '<rootDir>/test/fileTransformer.js',
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.(css|less)$': './test/mock-styles.ts'
  },
  transformIgnorePatterns: [
    'node_modules', 'dist'
  ],
  testRegex: '(/__tests__/.*|(\-|/)(test))\\.(t|j)sx?$',
  testPathIgnorePatterns : [
    'e2e.test.js'
  ],
  snapshotSerializers: ['enzyme-to-json'],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
  testEnvironment: 'jsdom', // node
  coverageProvider: 'v8',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    'mock.ts',
    '.svg',
    '.less'
  ],
  coverageReporters: [/*'cobertura',*/ 'text'],
  setupFilesAfterEnv: ['<rootDir>/test/test-setup.ts'],
  globals: {
    'ts-jest': {
      'tsconfig': './tsconfig.json'
    },
    'LIB_PREFIX': 'test-libapp',
    diagnostics: {
      pathRegex: '(/__tests__/.*|(\-|/)(test))\\.(t|j)sx?$'
    }
  }
};
