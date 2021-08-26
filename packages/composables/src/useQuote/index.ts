import { AckResponse } from '@vue-storefront/beckn-api';
import { Context } from '@vue-storefront/core';
import usePollerFactory from '../usePoller';

import config from '../../beckn.config.js';

const factoryParams = {
  poll: async (context: Context, { params }): Promise<any> => {
    const ackResponse: AckResponse = await context.$beckn.api.onGetQuote(params);
    if (ackResponse.error?.code) {
      throw ackResponse.error;
    }
    return ackResponse;
  },

  dataHandler: (_, { newResults }) => {
    return newResults;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  continuePolling: (_, { oldResults, newResults }) => {
    // TODO Have to Write this logic
    if (newResults?.error) return false;
    return true;
  },
  init: async (context: Context, { params }) => {
    const ackResponse: AckResponse = await context.$beckn.api.getQuote(params);
    if (ackResponse.error?.code) {
      throw ackResponse.error;
    }
    return ackResponse;
  },
  pollTime: () => {
    return config.timers.quote.poll;
  },
  intervalTime: () => {
    return config.timers.quote.interval;
  }

};

export default usePollerFactory(factoryParams);
