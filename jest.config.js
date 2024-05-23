const path = require('path');

const envConfigPath = path.join(__dirname, 'env.config.js');
module.exports = {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost/',
  },
  transform: {
    '^.+\\.jsx?$': '<rootDir>/jest-preprocess.js',
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/fileTransformer.js',
    'env.config': envConfigPath,
  },
  testPathIgnorePatterns: ['node_modules', '.cache'],
  transformIgnorePatterns: [
    'node_modules/(?!@(open)?edx)',
  ],
  globals: {
    __PATH_PREFIX__: '',
  },
  setupFiles: ['<rootDir>/setupTest.js'],
};
