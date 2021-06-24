import { vsfRef, useVSFContext } from '@vue-storefront/core';
import { Context } from '@vue-storefront/core';

const usePoller = () => {
  const pollResults = vsfRef([], 'poll-results');
  const context = useVSFContext() as Context;

  const poll = async (messageId) => {
    console.log('In poller: ' + messageId);
    pollResults.value.push(await context.$beckn.api.onSearch({messageId}));
  };

  return { pollResults, poll };
};

export default usePoller;
