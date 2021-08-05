module.exports = {
  integrations: {
    beckn: {
      location: '@vue-storefront/beckn-api/server',
      configuration: {
        api: {
          url: 'https://qa.api.box.beckn.org/bap/client',
          endpoints: {
            search: '/v1/search',
            onSearch: '/v1/on_search',
            getQuote: '/v1/get_quote',
            onGetQuote: '/v1/on_get_quote',
            initializeOrder: '/v1/initialize_order',
            onInitializeOrder: '/v1/on_initialize_order',
            confirmOrder: '/v1/confirm_order',
            onConfirmOrder: '/v1/on_confirm_order'
          }
        }
      }
    }
  }
};
