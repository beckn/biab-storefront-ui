import { Config } from './../../types/Setup';
import * as sa from 'superagent';
import { onInitiatizeOrderParam } from '../../types/InitiatizeOrder';
import { AckResponse } from '../../types/BecknClientApi';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function onConfirmOrder(context, params: onInitiatizeOrderParam): Promise<AckResponse> {
  const config = (context.config as Config);
  const client = (context.client as sa.SuperAgent<sa.SuperAgentRequest>);
  return client.get(config.api.url + config.api.endpoints.onConfirmOrder)
    .query(params)
    .then(res => {
      return (res.body as AckResponse);
    });
}

