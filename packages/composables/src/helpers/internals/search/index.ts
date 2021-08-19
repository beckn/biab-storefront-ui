import { AgnosticFacetSearchParams } from '@vue-storefront/core';
import { SearchItemsWhere } from '@vue-storefront/beckn-api';
export const buildSearchItemsWhere = (params: AgnosticFacetSearchParams): SearchItemsWhere => {
  if (params.term) {
    if (params.locationIs) {
      return {
        // itemContains: params.term,
        // locationIs: params.locationIs,
        limit: params.itemsPerPage,
        offset: params.page * params.itemsPerPage,
        itemContains: 'orange',
        // locationIs: params.locationIs,
        locationIs: '12.8873185,77.57807509999999'
      };
    }
    return {
      itemContains: params.term,
      limit: params.itemsPerPage,
      offset: params.page * params.itemsPerPage
    };
  }
};

