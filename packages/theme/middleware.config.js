module.exports = {
  integrations: {
    beckn: {
      location: '@vue-storefront/beckn-api/server',
      configuration: {
        api: {
          url: 'http://10.0.1.184:9001',
          endpoints: {
            search: '/v0/search'
          }
        }
      }
    }
  }
};
