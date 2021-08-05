import { Config } from '../../types/Setup';
import * as sa from 'superagent';
import { initializeOrderParam } from '../../types/initializeOrder';
import { AckResponse } from '../../types/BecknClientApi';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function initializeOrder(context, params: initializeOrderParam): Promise<AckResponse> {
  const config = (context.config as Config);
  const client = (context.client as sa.SuperAgent<sa.SuperAgentRequest>);
  return client.post(config.api.url + config.api.endpoints.initializeOrder)
    .send(params)
    .then(res => {
      return (res.body as AckResponse);
    });
}

