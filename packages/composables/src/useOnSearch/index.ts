import { AckResponse } from '@vue-storefront/beckn-api';
import { Context } from '@vue-storefront/core';
import { OnSearchParam } from '../types';
import usePollerFactory from '../usePoller';

const factoryParams = {
  poll: async (context: Context, params: OnSearchParam): Promise<any> => {
    const ackResponse: AckResponse = await context.$beckn.api.onSearch(params);
    const catalogs:Array<any> = (ackResponse.message as any)?.catalogs ?? null;
    if (catalogs) {
      const data = [];
      catalogs.map((bpp)=>{
        return bpp.bpp_providers.map((obj)=>{
          data.push(obj);
          return obj;
        });
      });
      return data;
    }
    return ackResponse;
  }
};

export default usePollerFactory(factoryParams);
