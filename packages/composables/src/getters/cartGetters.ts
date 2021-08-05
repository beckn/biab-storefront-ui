import { CartGetters, AgnosticPrice, AgnosticTotals, AgnosticCoupon, AgnosticDiscount } from '@vue-storefront/core';
import { Cart, LineItem } from '@vue-storefront/beckn-api/src/types';
import productGetters from './productGetters';
import providerGetters from './providers.Getters';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItems = (cart): LineItem[] => cart?.items || [];

export const getBppProvider = (cart)=> {
  return cart?.bppProvider || null;
};

export const getBpp = (cart)=> {
  return cart?.bpp || null;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemName = (product: any): string => productGetters.getName(product) || 'Product\'s name';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemImage = (product: any): string => productGetters.getGallery(product)[0].small[0] || 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemPrice = (product: any): AgnosticPrice => {
  return productGetters.getPrice(product);
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProviderImage = (provider: any): string => providerGetters.getProviderImages(provider)[0] || '';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItemQty = (product: any): number => product?.quantity || 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getMeasureValue = (product: any): string => product?.measure?.value;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getMeasureUnit = (product: any): string => product?.measure?.unit;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemAttributes = (product: LineItem, filterByAttributeName?: Array<string>) => ({ color: 'red' });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemSku = (product: any): string => product?.sku || 'some-sku';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartTotals = (cart): AgnosticTotals => {
  const totalPrice:number = cart?.totalPrice || 0;
  return {
    total: totalPrice,
    subtotal: 10
  };
};

// export const getQuoteBreakup = (cart): AgnosticTotals => {
//   cart
// };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartShippingPrice = (cart: Cart): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartTotalItems = (cart): number => {
  return cart?.totalItems || 0;
};

export const getFormattedPrice = (price: number) => String(price);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCoupons = (cart: Cart): AgnosticCoupon[] => [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getDiscounts = (cart: Cart): AgnosticDiscount[] => [];

export const getUpdatedPrice = (product: any): string => product.updatedPrice ?? null;

export const getUpdatedCount = (product: any): number => product.updatedCount ?? null;

const cartGetters: CartGetters<Cart, LineItem> = {
  getTotals: getCartTotals,
  getShippingPrice: getCartShippingPrice,
  getItems: getCartItems,
  getItemName: getCartItemName,
  getItemImage: getCartItemImage,
  getItemPrice: getCartItemPrice,
  getItemQty,
  getItemAttributes: getCartItemAttributes,
  getItemSku: getCartItemSku,
  getFormattedPrice: getFormattedPrice,
  getTotalItems: getCartTotalItems,
  getMeasureValue: getMeasureValue,
  getMeasureUnit: getMeasureUnit,
  getCoupons,
  getDiscounts,
  getBppProvider,
  getBpp,
  getProviderImage,
  getUpdatedPrice,
  getUpdatedCount
};

export default cartGetters;
