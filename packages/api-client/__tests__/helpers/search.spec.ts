import {
  buildSearchItemsWhere
} from './../../src/helpers/search';
import { SearchItemsWhere, SearchType } from './../../src/types/Search';

describe('[beckn-api-client] helpers/search', () => {

  const searchItemsWhere: SearchItemsWhere = {
    itemContains: 'sofa',
    locationIs: 'Pune'
  };

  it('should return search for items by text and location', () => {
    const expectedQuery = {
      searchString: searchItemsWhere.itemContains,
      searchType: SearchType.ITEM,
      location: searchItemsWhere.locationIs
    };
    expect(buildSearchItemsWhere(searchItemsWhere)).toStrictEqual(expectedQuery);
  });

  it('should return undefined search when input is undefined', () => {
    expect(buildSearchItemsWhere(undefined)).toBeUndefined;
  });

  it('should return search by item text when locationIs param is undefined', () => {
    const expectedQuery = {
      searchString: searchItemsWhere.itemContains,
      searchType: SearchType.ITEM
    };
    expect(buildSearchItemsWhere({itemContains: searchItemsWhere.itemContains, locationIs: undefined})).toStrictEqual(expectedQuery);
  });

  it('should return search by location when itemContains param is undefined', () => {
    const expectedQuery = {
      searchType: SearchType.ITEM,
      location: searchItemsWhere.locationIs
    };
    expect(buildSearchItemsWhere({itemContains: undefined, locationIs: searchItemsWhere.locationIs})).toStrictEqual(expectedQuery);
  });
});
