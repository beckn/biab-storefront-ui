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
  poll: (context: Context, params?: any, oldResults?: Array<any>) => Promise<any>;
}

const usePollerFactory = (factoryParams: UsePollerFactoryParams) => {

  const usePoller = (id?: string) => {
    const ssrKey = id || 'usePoller';
    const polling: Ref<boolean> = vsfRef(false, `${ssrKey}-loading`);
    const pollFunction = vsfRef({ interval: null, timeout: null }, `${ssrKey}-func`);
    const pollResults = vsfRef([], `${ssrKey}-Pollers`);
    const _factoryParams = configureFactoryParams(factoryParams);
    const error = sharedRef({
      poll: null
    }, `usepoller-error-${id}`);

    const poll = async (params?) => {
      Logger.debug(`usePoller/${ssrKey}/search`, params);

      // clear old polls on subsequent calls
      pollResults.value = [];
      clearInterval(pollFunction.value.interval);
      clearTimeout(pollFunction.value.interval);
      const data = await _factoryParams.poll({params, pollResults});
      pollResults.value = [...pollResults.value, ...data];
      // pollResults.value = data;
      // const data = await _factoryParams.poll(params,pollResults.value);
      // console.log('pollloll', data, pollResults);
      polling.value = true;

      pollFunction.value.interval = setInterval(async () => {
        try {
          const data = await _factoryParams.poll({params, pollResults});
          pollResults.value = [...pollResults.value, ...data];
          // pollResults.value = data;
          // const data = await _factoryParams.poll(params);
        } catch (err) {
          clearInterval(pollFunction.value.interval);
          error.value.poll = err;
          Logger.error(`usePoller/${ssrKey}/search`, err);
        }
      }, 2000);

      pollFunction.value.timeout = setTimeout(() => {
        clearInterval(pollFunction.value.interval);
        polling.value = false;
      }, 60000);
    };

    return {
      pollResults: computed(() => pollResults.value),
      polling: computed(() => polling.value),
      error: computed(() => error.value),
      poll
    };
  };

  return usePoller;
};

export default usePollerFactory;
