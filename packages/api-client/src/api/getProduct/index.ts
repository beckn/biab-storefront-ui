import { CustomQuery } from '@vue-storefront/core';
import { Config } from './../../types/Setup';
import { buildSearchRequest } from './../../helpers/search';
import * as sa from 'superagent';
import { SearchItemsWhere } from '../../types/Search';
import { AckResponse } from '../../types/BecknClientApi';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function getProduct(context, params: SearchItemsWhere, customQuery?: CustomQuery): Promise<AckResponse> {
  const qParams = buildSearchRequest(params);
  const config = (context.config as Config);
  const client = (context.client as sa.SuperAgent<sa.SuperAgentRequest>);
  return client.get(config.api.url + config.api.endpoints.search)
    .query(qParams)
    .then(res => {
      return (res.body as AckResponse);
    });

  /* return Promise.resolve({
    data: [],
    total: 0
  });*/
}

