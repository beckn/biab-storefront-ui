import { vsfRef, Context } from '@vue-storefront/core';

const usePoller = () => {
  const pollResults = vsfRef([], 'poll-results');
  const poll = async (context: Context, messageId) => {
    pollResults.value.push(await context.$beckn.api.onSearch({ messageId }));
  };

  return { pollResults, poll };
};

export default usePoller;
