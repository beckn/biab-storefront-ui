import { CartGetters, AgnosticPrice, AgnosticTotals, AgnosticCoupon, AgnosticDiscount } from '@vue-storefront/core';
import { Cart, LineItem } from '@vue-storefront/beckn-api/src/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItems = (): LineItem[] => [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemName = (product: any): string => product?.descriptor?.name || 'Product\'s name';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemImage = (product: any): string => product?.descriptor?.images || 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemPrice = (product: any): AgnosticPrice => {
  return {
    regular: product?.price?.value || 12,
    special: product?.price?.value || 10
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemQty = (product: any): number => product?.quantity;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getMeasureValue = (product: any): string => product?.measure?.value;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getMeasureUnit = (product: any): string => product?.measure?.unit;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemAttributes = (product: LineItem, filterByAttributeName?: Array<string>) => ({ color: 'red' });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemSku = (product: any): string => product?.sku || 'some-sku';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartTotals = (products: any): AgnosticTotals => {
  let totalPrice = 0;
  if (products.value) {
    for (const product of products.value) {
      totalPrice += product.item.price.value * product.item.quantity;
    }
  }
  return {
    total: totalPrice,
    subtotal: 10
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartShippingPrice = (cart: Cart): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartTotalItems = (products: any): number => {
  let totalItems = 0;
  if (products.value) {
    for (const product of products.value) {
      totalItems += product.item.quantity;
    }
  }
  return totalItems;
};

export const getFormattedPrice = (price: number) => String(price);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCoupons = (cart: Cart): AgnosticCoupon[] => [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getDiscounts = (cart: Cart): AgnosticDiscount[] => [];

const cartGetters: CartGetters<Cart, LineItem> = {
  getTotals: getCartTotals,
  getShippingPrice: getCartShippingPrice,
  getItems: getCartItems,
  getItemName: getCartItemName,
  getItemImage: getCartItemImage,
  getItemPrice: getCartItemPrice,
  getItemQty: getCartItemQty,
  getItemAttributes: getCartItemAttributes,
  getItemSku: getCartItemSku,
  getFormattedPrice: getFormattedPrice,
  getTotalItems: getCartTotalItems,
  getMeasureValue: getMeasureValue,
  getMeasureUnit: getMeasureUnit,
  getCoupons,
  getDiscounts
};

export default cartGetters;
