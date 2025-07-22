// jest.config.cjs
module.exports = {
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  testPathIgnorePatterns: ['/node_modules/'],
  testTimeout: 30000,
  transform: {}, // Empty transform to avoid unnecessary processing
};