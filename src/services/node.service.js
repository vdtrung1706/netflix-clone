'use strict';

module.exports = {
  getNodeEnv: function () {
    return process.env;
  },
  getNodeEnvByKey: function (key) {
    if (!key) throw new Error('Key cannot be null/undefined');
    return process.env[key];
  },
  getNodeEnvMode: function () {
    return this.getNodeEnvByKey('NODE_ENV') || 'test';
  },
  isProduction: function () {
    return this.getNodeEnvMode() === 'production';
  },
  isDevelopment: function () {
    return this.getNodeEnvMode() === 'development';
  },
  isGhPages: function () {
    return this.getNodeEnvMode() === 'gh-pages';
  },
  isTest: function () {
    return !this.getNodeEnvMode() || this.getNodeEnvMode() === 'test';
  },
};
