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

/**
 * Returns the Billing address Info in a format required for the api
 * @param billingAddress Billing Address object
 */
export const getBillingInfo = (billingAddress, addresskey: string): any => {
  if (!billingAddress) {
    return {};
  }

  const billingInfo = {
    [addresskey]: {
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
  const bAddress = getBillingInfo(
    shippingAsBilling ? shippingAddress : billingAddress,
    'address'
  );

  const deliveryInfo = getDeliveryInfo(shippingAddress, gps);

  const cartItemsPerEachBppPerProvider = cartGetters.getCartItemsPerBppPerProvider(
    cart
  );

  const initOrderRequest = [];

  Object.keys(cartItemsPerEachBppPerProvider).forEach((bppId) => {
    Object.keys(cartItemsPerEachBppPerProvider[bppId]).forEach((providerId) => {
      const initItems = {
        context: {
          transaction_id: transactionId,
          bpp_id: bppId
        },
        message: {
          items: cartItemsPerEachBppPerProvider[bppId][providerId],
          billing_info: bAddress,
          delivery_info: deliveryInfo
        }
      };
      initOrderRequest.push(initItems);
    });
  });

  return initOrderRequest;
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
    shippingAsBilling ? shippingAddress : billingAddress,
    'billingInfo'
  );
  const deliveryInfo = getDeliveryInfo(shippingAddress, gps);

  const cartItemsForEachBpp = cartGetters.getCartItemsPerBpp(cart);
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

/**
 * Returns a comma separated string of message_id,extracted from each of the response context.
 * @param responseArr Array of response which is of the form responseArr[i].context.message_id
 * @returns messageIds
 */
export const getMessageIdsFromResponse = (responseArr) => {
  let messageIds = '';
  if (responseArr) {
    responseArr.forEach((response) => {
      if (response.context?.message_id) {
        messageIds += response.context?.message_id + ',';
      }
    });
    messageIds = messageIds.substring(0, messageIds.length - 1);
  }

  return messageIds;
};

const helpers = {
  calculateDays,
  getMessageIdsFromResponse
};

export default helpers;
