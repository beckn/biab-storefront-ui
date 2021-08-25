import { Config } from '../../types/Setup';
import * as sa from 'superagent';
import { onInitializeOrderParam } from '../../types/initializeOrder';
import { AckResponse } from '../../types/BecknClientApi';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function track(context, params: onInitializeOrderParam): Promise<AckResponse> {
  const config = (context.config as Config);
  const client = (context.client as sa.SuperAgent<sa.SuperAgentRequest>);

  return client.post(config.api.url + config.api.endpoints.track)
    .send(params)
    .then(res => {
      return (res.body as AckResponse);
    });
}

export async function onTrack(context, params: onInitializeOrderParam): Promise<AckResponse> {
  const config = (context.config as Config);
  const client = (context.client as sa.SuperAgent<sa.SuperAgentRequest>);
  return client.get(config.api.url + config.api.endpoints.onTrack)
    .query(params)
    .then(res => {
      return (res.body as AckResponse);
    });
}

