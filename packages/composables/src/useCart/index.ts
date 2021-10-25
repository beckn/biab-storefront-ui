/* istanbul ignore file */

import { useCartFactory } from '@vue-storefront/core';
import { Context } from 'node:vm';
import { CartProduct, Product } from '../types';
import productGetters from '../getters/productGetters';

export type Coupon = Record<string, unknown>;

type Cart = {
  // id: number;
  bpp: string;
  bppProvider: string;
  items: CartProduct[];
  totalPrice: number;
  totalItems: number;
  newBpp: string;
  newProvider: string;
  newProduct: Product;
  locations: string[];
  cartTime: string;
  quote: any;
};

const cartSample = {
  items: [],
  bpp: null,
  bppProvider: null,
  totalPrice: 0,
  totalItems: 0,
  newBpp: null,
  newProvider: null,
  newProduct: null,
  locations: [],
  cartTime: null,
  quote: null
};

const params = {
  load: async () => {
    let cartData = { ...cartSample };
    if (localStorage.getItem('cartData')) {
      cartData = JSON.parse(localStorage.getItem('cartData'));
    }
    return cartData;
  },

  addItem: async (
    context: Context,
    { currentCart, product, quantity, customQuery }
  ) => {
    if (customQuery.clearCart) {
      localStorage.removeItem('cartData');
      currentCart = {
        items: [],
        bpp: null,
        bppProvider: null,
        totalPrice: 0,
        totalItems: 0,
        newBpp: null,
        newProvider: null,
        newProduct: null,
        locations: [],
        cartTime: null,
        quote: null
      };
    }
    const price = productGetters.getPrice(product).regular;

    const exisitingIndex = currentCart.items.findIndex(
      (p) => p.id === product.id
    );
    if (exisitingIndex !== -1) {
      const oldQuantity = currentCart.items[exisitingIndex].quantity;
      const quantityDiff = quantity - oldQuantity;
      const priceDifference = quantityDiff * price;

      currentCart.totalPrice += priceDifference;
      currentCart.totalItems += quantityDiff;
      currentCart.items[exisitingIndex].quantity = quantity;
      currentCart.cartTime = new Date();
      if (quantity === 0) {
        currentCart.items.splice(exisitingIndex, 1);
        if (currentCart.totalItems === 0) {
          currentCart.bpp = null;
          currentCart.newBpp = null;
          currentCart.bppProvider = null;
          currentCart.newProvider = null;
          currentCart.locations = [];
          currentCart.cartTime = null;
          currentCart.quote = null;
        }
      }
    } else {
      product = { quantity, ...product };
      const priceDifference = quantity * price;

      currentCart.totalPrice += priceDifference;
      currentCart.totalItems += quantity;
      currentCart.items.push(product);
      currentCart.bpp = customQuery.bpp;
      currentCart.newBpp = customQuery.bpp;
      currentCart.bppProvider = customQuery.bppProvider;
      currentCart.newProvider = customQuery.bppProvider;
      currentCart.locations = customQuery.locations;
      currentCart.cartTime = new Date();
    }

    localStorage.setItem('cartData', JSON.stringify(currentCart));
    return { ...currentCart };
  },

  removeItem: async (
    context: Context,
    { currentCart, product, customQuery }
  ) => {
    console.log('Mocked: removeFromCart');
    return currentCart;
  },

  updateItemQty: async (
    context: Context,
    { currentCart, product, quantity, customQuery }
  ) => {
    console.log('Mocked: updateQuantity');
    return currentCart;
  },

  clear: async (context: Context, { currentCart }) => {
    localStorage.removeItem('cartData');
    currentCart = {
      items: [],
      bpp: null,
      bppProvider: null,
      totalPrice: 0,
      totalItems: 0,
      newBpp: null,
      newProvider: null,
      newProduct: null,
      locations: [],
      cartTime: null,
      quote: null
    };
    return currentCart;
  },

  applyCoupon: async (
    context: Context,
    { currentCart, couponCode, customQuery }
  ) => {
    console.log('Mocked: applyCoupon');
    return { updatedCart: currentCart, updatedCoupon: currentCart };
  },

  removeCoupon: async (
    context: Context,
    { currentCart, coupon, customQuery }
  ) => {
    console.log('Mocked: removeCoupon');
    return { updatedCart: currentCart };
  },

  isInCart: (context: Context, { currentCart, product }) => {
    const exisiting = currentCart?.items.find((p) => p.id === product.id);
    if (exisiting) {
      return exisiting;
    }
    return false;
  }
};

export default useCartFactory<Cart, CartProduct, Product, Coupon>(params);
