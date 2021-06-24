module.exports = {
  integrations: {
    beckn: {
      location: '@vue-storefront/beckn-api/server',
      configuration: {
        api: {
          url: 'https://run.mocky.io/v3/d95e2601-497d-4095-b306-0ce965bba171/',
          endpoints: {
            search: '/v0/search',
            onSearch: '/v0/on_search'
          }
        }
      }
    }
  }
};
