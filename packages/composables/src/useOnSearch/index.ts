import { AckResponse } from '@vue-storefront/beckn-api';
import { Context } from '@vue-storefront/core';
// import { OnSearchParam } from '../types';
import usePollerFactory from '../usePoller';

const factoryParams = {
  poll: async (context: Context, params): Promise<any> => {
    // const pollResults = params.pollResults.value;
    params = params.params;
    const ackResponse: AckResponse = await context.$beckn.api.onSearch(params);
    return ackResponse;
    // const catalogs: Array<any> = (ackResponse.message as any)?.catalogs ?? null;
    // if (catalogs) {
    //   const oldCodes = pollResults.map((obj) => {
    //     return obj.bpp_descriptor.code;
    //   });
    //   const data = catalogs.filter((bpp) => {
    //     return !(oldCodes.includes(bpp.bpp_descriptor.code));
    //   });
    //   return data;
    // }
    // return [];
  },

  dataHandler: (_, { oldResults, newResults }) => {
    const catalogs = newResults.message?.catalogs ?? null;
    if (oldResults === null) {
      oldResults = [];
    }
    if (catalogs) {
      const oldCodes = oldResults.map((obj) => {
        return obj.bpp_descriptor.code;
      });
      console.log('oldcodes ', oldCodes);
      const data = catalogs.filter((bpp) => {
        return !(oldCodes.includes(bpp.bpp_descriptor.code));
      });
      return [...oldResults, ...data];
    }
    return oldResults;
  },

  continuePolling: () => {
    return true;
  },
  init: async ()=>{},
  pollTime: ()=> 60000,
  intervalTime: ()=> 2000

};

export default usePollerFactory(factoryParams);
