import {
  SearchRequest,
  SearchType,
  SearchItemsWhere
} from './../../types/Search';

export const buildSearchItemsWhere = (search?: SearchItemsWhere) => {
  if (search) {
    return new SearchRequest(
      search.itemContains,
      SearchType.ITEM,
      search.locationIs,
      search.limit,
      search.offset
    ).toParams();
  }
};
