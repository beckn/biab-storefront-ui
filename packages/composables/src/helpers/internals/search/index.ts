import { AgnosticFacetSearchParams } from '@vue-storefront/core';
import { SearchItemsWhere } from '@vue-storefront/beckn-api';
export const buildSearchItemsWhere = (params: AgnosticFacetSearchParams): SearchItemsWhere => {
  if (params.term) {
    if (params.locationIs) {
      return {
        // itemContains: params.term,
        // locationIs: params.locationIs,
        itemContains: 'orange',
        // locationIs: "12.903517,77.5920295",
        locationIs: '12.9063433,77.5856825',
        // itemContains: params.term,
        limit: params.itemsPerPage,
        offset: params.page * params.itemsPerPage
      };
    }
    return {
      itemContains: 'orange',
      // locationIs: "12.903517,77.5920295",
      locationIs: '12.9063433,77.5856825',
      // itemContains: params.term,
      limit: params.itemsPerPage,
      offset: params.page * params.itemsPerPage
    };
  }
};
