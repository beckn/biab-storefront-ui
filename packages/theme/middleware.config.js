module.exports = {
  integrations: {
    beckn: {
      location: '@vue-storefront/beckn-api/server',
      configuration: {
        api: {
          url: 'http://beckn-in-a-box-qa-api-1484045857.ap-south-1.elb.amazonaws.com/bap/client',
          endpoints: {
            search: '/v1/search',
            onSearch: '/v1/on_search'
          }
        }
      }
    }
  }
};
