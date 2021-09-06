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
            onConfirmOrder: '/v1/on_confirm_order',
            cancel: '/v1/cancel',
            onCancel: '/v1/on_cancel',
            orderStatus: '/v1/order_status',
            onOrderStatus: '/v1/on_order_status',
            track: '/v1/track',
            onTrack: '/v1/on_track',
            support: '/v1/get_support',
            onSupport: '/v1/on_support',
            orderPolicy: '/v0/get_order_policy'
          }
        }
      }
    }
  }
};
