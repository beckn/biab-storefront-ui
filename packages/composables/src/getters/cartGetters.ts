import {
  CartGetters,
  AgnosticPrice,
  AgnosticTotals,
  AgnosticCoupon,
  AgnosticDiscount
} from '@vue-storefront/core';
import { Cart, LineItem } from '@vue-storefront/beckn-api/src/types';
import productGetters from './productGetters';
import providerGetters from './providers.Getters';
import { Cart as CartType } from '../useCart';
import { BppType, CartProduct, Product, ProviderVariant } from '../types';

export const getCartItems = (cart: CartType): LineItem[] => cart?.items || [];

export const getBppProvider = (product: CartProduct): BppType => {
  return product?.bppProvider || null;
};

export const getBppProviderName = (product: CartProduct): string => {
  return getBppProvider(product)?.descriptor?.name || '';
};

// export const getBpp = (cart: CartType) => {
//   return cart?.bpp?.descriptor?.name || null;
// };

export const getCartItemName = (product: CartProduct): string =>
  // eslint-disable-next-line quotes
  productGetters.getName(product) || "Product's name";

export const getCartItemImage = (product: CartProduct): string =>
  productGetters.getGallery(product)[0].small[0] ||
  'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg';

export const getCartItemPrice = (product: CartProduct): AgnosticPrice => {
  return productGetters.getPrice(product);
};

export const getProviderImage = (provider: ProviderVariant): string =>
  providerGetters.getProviderImages(provider)[0] || '';

export const getItemQty = (product: CartProduct): number =>
  product?.quantity || 0;

// export const getMeasureValue = (product: any): string =>
//   product?.measure?.value;

// export const getMeasureUnit = (product: any): string => product?.measure?.unit;

export const getCartItemAttributes = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  product: LineItem,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  filterByAttributeName?: Array<string>
): any => ({ color: 'red' });

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getCartItemSku = (product: any): string =>
  product?.sku || 'some-sku';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartTotals = (cart: CartType): AgnosticTotals => {
  const totalPrice: number = cart?.totalPrice || 0;
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

export const getCartTotalItems = (cart: CartType): number => {
  return cart?.totalItems || 0;
};

export const getFormattedPrice = (price: number): string => String(price);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCoupons = (cart: Cart): AgnosticCoupon[] => [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getDiscounts = (cart: Cart): AgnosticDiscount[] => [];

export const getUpdatedPrice = (product: CartProduct): number =>
  parseFloat(product.updatedPrice) ?? null;

export const getUpdatedCount = (product: CartProduct): number =>
  product.updatedCount ?? null;

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
  getCoupons,
  getDiscounts,
  getBppProvider,
  getBppProviderName,
  getProviderImage,
  getUpdatedPrice,
  getUpdatedCount
};

export default cartGetters;
