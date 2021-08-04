import { vsfRef, Context, Logger, configureFactoryParams, sharedRef, FactoryParams } from '@vue-storefront/core';
import { computed, Ref } from '@vue/composition-api';

// const usePoller = () => {
//   const pollResultss = vsfRef([], 'poll-results');
//   const poll = async (context: Context, messageId) => {
//     pollResultss.value.push(await context.$beckn.api.onSearch({ messageId }));
//   };

//   return { pollResultss, poll };
// };

// export default usePoller;

interface UsePollerFactoryParams extends FactoryParams {
  poll: (context: Context, params?: any) => Promise<any>;
  dataHandler: (context: Context, currentResult, newResult) => any;
  continuePolling: (context: Context, currentResult, newResult) => boolean;
  pollTime:()=> number,
  intervalTime:()=> number,
  init:(context: Context, params?: any)=>Promise<any>
}

const usePollerFactory = (factoryParams: UsePollerFactoryParams) => {

  const usePoller = (id?: string) => {
    const ssrKey = id || 'usePoller';
    const polling: Ref<boolean> = vsfRef(false, `${ssrKey}-loading`);
    const pollFunction = vsfRef({ interval: null, timeout: null }, `${ssrKey}-func`);
    const pollResults = vsfRef(null, `${ssrKey}-Pollers`);
    const _factoryParams = configureFactoryParams(factoryParams);
    const error = sharedRef({
      poll: null
    }, `usepoller-error-${id}`);

    const poll = async (params?) => {
      Logger.debug(`usePoller/${ssrKey}/search`, params);
      // debugger;
      // clear old polls on subsequent calls
      pollResults.value = null;
      clearInterval(pollFunction.value.interval);
      clearTimeout(pollFunction.value.interval);
      clearInterval(pollFunction.value.timeout);
      clearTimeout(pollFunction.value.timeout);
      const data = await _factoryParams.poll({ params });
      pollResults.value = _factoryParams.dataHandler({oldResults: pollResults.value, newResults: data});
      polling.value = true;
      const intervalTime = _factoryParams.intervalTime();
      const pollTime = _factoryParams.pollTime();
      pollFunction.value.interval = setInterval(async () => {
        try {
          const data = await _factoryParams.poll({ params});
          pollResults.value = _factoryParams.dataHandler({oldResults: pollResults.value, newResults: data});
          if (!_factoryParams.continuePolling({oldResults: pollResults.value, newResults: data})) {
            clearInterval(pollFunction.value.interval);
            clearTimeout(pollFunction.value.interval);
            clearInterval(pollFunction.value.timeout);
            clearTimeout(pollFunction.value.timeout);
          }
        } catch (err) {
          console.error(err);

          clearInterval(pollFunction.value.interval);
          error.value.poll = err;
          Logger.error(`usePoller/${ssrKey}/search`, err);
        }
      }, intervalTime);

      pollFunction.value.timeout = setTimeout(() => {
        clearInterval(pollFunction.value.interval);
        polling.value = false;
      }, pollTime);
    };

    const init = async (params)=>{
      return await _factoryParams.init({params});
    };

    const stopPolling = async () => {
      clearInterval(pollFunction.value.interval);
      clearTimeout(pollFunction.value.interval);
      clearInterval(pollFunction.value.timeout);
      clearTimeout(pollFunction.value.timeout);
    };

    return {
      pollResults: computed(() => pollResults.value),
      polling: computed(() => polling.value),
      error: computed(() => error.value),
      poll,
      stopPolling,
      init
    };
  };

  return usePoller;
};

export default usePollerFactory;
