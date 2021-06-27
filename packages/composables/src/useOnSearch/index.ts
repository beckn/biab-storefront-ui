import { AckResponse } from '@vue-storefront/beckn-api';
import { Context } from '@vue-storefront/core';
import { OnSearchParam } from '../types';
import usePollerFactory from '../usePoller';

const factoryParams = {
  poll: async (context: Context, params: OnSearchParam): Promise<AckResponse> => {
    const ackResponse: AckResponse = await context.$beckn.api.onSearch(params);
    return ackResponse;
  }
};

export default usePollerFactory(factoryParams);
