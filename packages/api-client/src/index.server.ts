import { apiClientFactory } from '@vue-storefront/core';
import getProduct from './api/getProduct';
import getCategory from './api/getCategory';

const defaultSettings = {};
import * as request from 'superagent';

const onCreate = (settings) => ({
  config: {
    ...defaultSettings,
    ...settings
  },
  client: request
});

const { createApiClient } = apiClientFactory<any, any>({
  onCreate,
  api: {
    getProduct,
    getCategory
  }
});

export {
  createApiClient
};
