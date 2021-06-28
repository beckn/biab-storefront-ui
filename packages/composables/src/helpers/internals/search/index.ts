import { AgnosticFacetSearchParams } from '@vue-storefront/core';
import { SearchItemsWhere } from '@vue-storefront/beckn-api';
export const buildSearchItemsWhere = (params: AgnosticFacetSearchParams): SearchItemsWhere => {
  if (params.term) {
    return {
      itemContains: params.term,
      limit: params.itemsPerPage,
      offset: params.page * params.itemsPerPage
    };
  }
};
