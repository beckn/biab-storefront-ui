import { Config } from './../../types/Setup';
import * as sa from 'superagent';
import { initiatizeOrderParam } from '../../types/InitiatizeOrder';
import { AckResponse } from '../../types/BecknClientApi';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function confirmOrder(context, params: initiatizeOrderParam): Promise<AckResponse> {
  const config = (context.config as Config);
  const client = (context.client as sa.SuperAgent<sa.SuperAgentRequest>);
  console.log('cofirm', params, config.api.url + config.api.endpoints.confirmOrder);
  return client.post(config.api.url + config.api.endpoints.confirmOrder)
    .send(params)
    .then(res => {
      return (res.body as AckResponse);
    });
}

