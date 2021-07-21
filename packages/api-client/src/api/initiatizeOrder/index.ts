import { Config } from './../../types/Setup';
import * as sa from 'superagent';
import { initiatizeOrderParam } from '../../types/InitiatizeOrder';
import { AckResponse } from '../../types/BecknClientApi';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function initiatizeOrder(context, params: initiatizeOrderParam): Promise<AckResponse> {
  const config = (context.config as Config);
  const client = (context.client as sa.SuperAgent<sa.SuperAgentRequest>);
  return client.post(config.api.url + config.api.endpoints.initiatizeOrder)
    .send(params)
    .then(res => {
      return (res.body as AckResponse);
    });
}

