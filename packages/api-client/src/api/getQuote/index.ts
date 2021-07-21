import { Config } from './../../types/Setup';
import * as sa from 'superagent';
import { quoteParam } from '../../types/Quote';
import { AckResponse } from '../../types/BecknClientApi';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function getQuote(context, params: quoteParam): Promise<AckResponse> {
  const config = (context.config as Config);
  const client = (context.client as sa.SuperAgent<sa.SuperAgentRequest>);
  return client.put(config.api.url + config.api.endpoints.getQuote)
    .send(params)
    .then(res => {
      return (res.body as AckResponse);
    });
}

