import { Config } from './../../types/Setup';
import * as sa from 'superagent';
import { PollRequest } from '../../types/Search';
import { AckResponse } from '../../types/BecknClientApi';
import { buildOnSearchRequest } from './../../helpers/search';
import { Context } from '@vue-storefront/core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function onSearch(context: Context, params: PollRequest): Promise<AckResponse> {
  const qParams = buildOnSearchRequest(params);
  const config = (context.config as Config);
  const client = (context.client as sa.SuperAgent<sa.SuperAgentRequest>);
  return client.get(config.api.url + config.api.endpoints.onSearch)
    .query(qParams)
    .then(res => {
      // eslint-disable-next-line camelcase
      return (res.body as AckResponse);
    });
}
