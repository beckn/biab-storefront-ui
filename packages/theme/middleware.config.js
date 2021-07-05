module.exports = {
  integrations: {
    beckn: {
      location: '@vue-storefront/beckn-api/server',
      configuration: {
        api: {
          url: 'http://qa.api.box.beckn.org/bap/client',
          endpoints: {
            search: '/v1/search',
            onSearch: '/v1/on_search'
          }
        }
      }
    }
  }
};
