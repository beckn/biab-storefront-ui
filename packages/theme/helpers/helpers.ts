export const calculateDays = (_date1, _date2) => {
  const date1 = new Date(_date1);
  const date2 = new Date(_date2);
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log(diffDays + ' days');
  return diffDays;
};

const helpers = {
  calculateDays
};

export const createOrderRequest = (transactionId, cart, shippingAddress, billingAddress, shippingAsBilling, gps) => {
  const bAddress = shippingAsBilling
    ? shippingAddress
    : billingAddress;

  const items: any[] = cart.items.map((item) => {
    return {
      id: item.id,
      quantity: { count: item.quantity },
      // eslint-disable-next-line camelcase
      bpp_id: cart.bpp.id,
      provider: {
        id: cart.bppProvider.id,
        locations: [
          item.location_id
        ]
      }
    };
  });

  const params = {
    context: {
      // eslint-disable-next-line camelcase
      transaction_id: transactionId
    },
    message: {
      items: items,

      // eslint-disable-next-line camelcase
      billing_info: {
        address: {
          door: bAddress.landmark,
          country: 'IND',
          city: bAddress.city,
          street: bAddress.address,

          // eslint-disable-next-line camelcase
          area_code: bAddress.pincode,
          state: bAddress.state,
          building: bAddress.building
        },
        phone: bAddress.mobile,
        name: bAddress.name,
        email: ''
      },

      // eslint-disable-next-line camelcase
      delivery_info: {
        type: 'HOME-DELIVERY',
        name: shippingAddress.name,
        phone: shippingAddress.mobile,
        email: '',
        location: {
          address: {
            door: shippingAddress.landmark,
            country: 'IND',
            city: shippingAddress.city,
            street: shippingAddress.address,

            // eslint-disable-next-line camelcase
            area_code: shippingAddress.pincode,
            state: shippingAddress.state,
            building: shippingAddress.building
          },
          gps: gps
        }
      }
    }
  };
  return params;
};

export const createConfirmOrderRequest = (transactionId, cart, shippingAddress, billingAddress, shippingAsBilling, gps, paymentInfo) => {
  const params: any = createOrderRequest(transactionId, cart, shippingAddress, billingAddress, shippingAsBilling, gps);
  params.message.payment = {
    // eslint-disable-next-line camelcase
    paid_amount: paymentInfo.amount,
    status: paymentInfo.status,
    // eslint-disable-next-line camelcase
    transaction_id: paymentInfo.transactionId
  };
  return params;
};

export default helpers;
