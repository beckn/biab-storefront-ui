/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable camelcase */
import { cartGetters } from '@vue-storefront/beckn';

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

/**
 * Returns the Billing address Info in a format required for the api
 * @param billingAddress Billing Address object
 */
export const getBillingInfo = (billingAddress): any => {
  if (!billingAddress) {
    return {};
  }

  const billingInfo = {
    billingAddress: {
      door: billingAddress.landmark,
      country: 'IND',
      city: billingAddress.city,
      street: billingAddress.billingAddress,
      area_code: billingAddress.pincode,
      state: billingAddress.state,
      building: billingAddress.building
    },
    phone: billingAddress.mobile,
    name: billingAddress.name,
    email: ''
  };

  return billingInfo;
};

/**
 * Returns the Delivery address info in a format required for the api
 * @param shippingAddress Shipping Address object
 * @param gps Gps co-ordinates
 */
const getDeliveryInfo = (shippingAddress, gps): any => {
  if (!shippingAddress) {
    return {};
  }

  const deliveryInfo = {
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
        area_code: shippingAddress.pincode,
        state: shippingAddress.state,
        building: shippingAddress.building
      },
      gps: gps
    }
  };

  return deliveryInfo;
};

export const createOrderRequest = (
  transactionId,
  cart,
  shippingAddress,
  billingAddress,
  shippingAsBilling,
  gps
) => {
  const bAddress = shippingAsBilling ? shippingAddress : billingAddress;

  const items: any[] = cart.items.map((item) => {
    return {
      id: item.id,
      quantity: { count: item.quantity },
      bpp_id: item.bpp.id,
      provider: {
        id: item.bppProvider.id,
        locations: [item.location_id]
      }
    };
  });

  const params = [
    {
      context: {
        transaction_id: transactionId
      },
      message: {
        items: items,

        billing_info: {
          address: {
            door: bAddress.landmark,
            country: 'IND',
            city: bAddress.city,
            street: bAddress.address,

            area_code: bAddress.pincode,
            state: bAddress.state,
            building: bAddress.building
          },
          phone: bAddress.mobile,
          name: bAddress.name,
          email: ''
        },

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

              area_code: shippingAddress.pincode,
              state: shippingAddress.state,
              building: shippingAddress.building
            },
            gps: gps
          }
        }
      }
    }
  ];
  return params;
};

export const createConfirmOrderRequest = (
  transactionId: string,
  cart,
  shippingAddress,
  billingAddress,
  shippingAsBilling: boolean,
  gps,
  paymentInfo
) => {
  const billingInfo = getBillingInfo(
    shippingAddress ? shippingAddress : billingAddress
  );
  const deliveryInfo = getDeliveryInfo(shippingAddress, gps);

  const cartItemsForEachBpp = cartGetters.getCartItemsForEachBpp(cart);
  const confirmOrderRequest = Object.keys(cartItemsForEachBpp).map((key) => {
    return {
      context: {
        transaction_id: transactionId,
        bpp_id: key
      },
      message: {
        items: cartItemsForEachBpp[key],
        billing_info: billingInfo,
        delivery_info: deliveryInfo,
        payment: {
          paid_amount: paymentInfo.amount,
          status: paymentInfo.status,
          transaction_id: transactionId
        }
      }
    };
  });

  return confirmOrderRequest;
};

export default helpers;
