import { AckResponse } from '@vue-storefront/beckn-api';
import { Context } from '@vue-storefront/core';
// import { OnSearchParam } from '../types';
import usePollerFactory from '../usePoller';

const factoryParams = {
  poll: async (context: Context, params): Promise<any> => {
    const pollResults = params.pollResults.value;
    params = params.params;
    const ackResponse: AckResponse = await context.$beckn.api.onSearch(params);
    const catalogs: Array<any> = (ackResponse.message as any)?.catalogs ?? null;
    if (catalogs) {
      const oldCodes = pollResults.map((obj) => {
        return obj.bpp_descriptor.code;
      });
      // debugger;
      const data = catalogs.filter((bpp) => {
        return !(oldCodes.includes(bpp.bpp_descriptor.code));
      });
      return data;
    }
    return [];
  }
};

export default usePollerFactory(factoryParams);
