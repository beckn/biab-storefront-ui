import { CustomQuery } from '@vue-storefront/core';
import { Config } from './../../types/Setup';
import { buildSearchItemsWhere } from './../../helpers/search';
import * as sa from 'superagent';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function getProduct(context, params, customQuery?: CustomQuery) {
  const qParams = buildSearchItemsWhere(params);
  const config = (context.config as Config);
  const client = (context.client as sa.SuperAgent<sa.SuperAgentRequest>);
  return client.get(config.api.url + '/search')
    .query(qParams)
    .then(res => {
      return res.body;
    });

  /* return Promise.resolve({
    data: [],
    total: 0
  });*/
}

