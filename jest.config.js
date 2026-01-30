// jest.config.js
export default {
  testEnvironment: 'node',
  collectCoverage: true,
  transform: {
    '^.+\\.js$': 'babel-jest'
  }
};
