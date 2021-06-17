import getProduct from '../../src/api/getProduct';
import { SearchItemsWhere, SearchType } from './../../src/types/Search';

describe('[beckn-api-client] getProduct', () => {

  const searchItemsWhere: SearchItemsWhere = {
    itemContains: 'sofa',
    locationIs: 'Pune'
  };

  const thenHandler = {
    then: () => {
      return Promise.resolve({
        ack: 'ACK'
      });
    }
  };
  const queryHandler = {
    query: ({ searchString, searchType, location }) => {
      expect(searchString).toEqual(searchItemsWhere.itemContains);
      expect(searchType).toEqual(SearchType.ITEM);
      expect(location).toEqual(searchItemsWhere.locationIs);
      return thenHandler;
    }
  };
  const context = {
    config: {
      api: {
        url: 'http://localhost:3000'
      }
    },
    client: {
      get: (url: string) => {
        expect(url).toEqual('http://localhost:3000/search');
        return queryHandler;
      }
    }
  };

  it('should return acknowledgement when search is triggered', async () => {
    const { ack } = await getProduct(context, searchItemsWhere);
    expect(ack).toBe('ACK');
  });

});
