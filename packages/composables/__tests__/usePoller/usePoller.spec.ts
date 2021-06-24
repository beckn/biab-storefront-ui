import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';

import usePoller from '../../src/usePoller';

Vue.use(VueCompositionApi);
const messageId = 'testmessageid';

const context = {
  $beckn: {
    api: {
      onSearch: jest.fn(() => ({
        message: {
          ack: {
            status: 'ACK'
          }
        }
      }))
    }
  }
};

describe('[beckn-composables] usePoller', () => {

  it('should trigger get product for term', async () => {
    const { pollResults, poll } = usePoller();
    await poll(context, messageId);
    expect(context.$beckn.api.onSearch).toBeCalled();
    expect(pollResults.value.length).toBeGreaterThan(0);
  });
});

