import { Config } from './../../types/Setup';
import * as sa from 'superagent';
import { PollRequest } from '../../types/Search';
import { AckResponse } from '../../types/BecknClientApi';
import { buildPollRequest } from './../../helpers/search';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function onSearch(context, params: PollRequest): Promise<AckResponse> {
  console.log('In api client on search 1: ' + JSON.stringify(params));
  const qParams = buildPollRequest(params);
  console.log('In api client on search 2: ' + qParams);
  const config = (context.config as Config);
  console.log('In api client on search 3: ' + config);
  const client = (context.client as sa.SuperAgent<sa.SuperAgentRequest>);
  console.log('In api client on search: ' + params);
  return client.get(config.api.url + config.api.endpoints.onSearch)
    .query(qParams)
    .then(res => {
      // eslint-disable-next-line camelcase
      res.body.context.message_id = '111113';
      return (res.body as AckResponse);
    });
}
