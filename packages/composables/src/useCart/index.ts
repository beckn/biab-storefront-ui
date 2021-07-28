/* istanbul ignore file */

// import {
//   Context,
// } from '@vue-storefront/core';
// import { Cart, CartItem, Coupon, Product } from '../types';
import { useCartFactory } from '@vue-storefront/core';
// import { ref, computed } from '@vue/composition-api';
import { Context } from 'node:vm';
import { CartProduct, Product } from '../types';
import productGetters from '../getters/productGetters';

export type Coupon = Record<string, unknown>;

type Cart = {
  // id: number;
  bpp: string;
  bppProvider: string,
  items: CartProduct[];
  totalPrice: number;
  totalItems: number;
  newBpp: string;
  newProvider: string;
  newProduct: Product;
  locations: string[];
};

const params = {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async () => {
    console.log('Mocked: loadCart');
    let cartData = {
      items: [],
      bpp: null,
      bppProvider: null,
      totalPrice: 0,
      totalItems: 0,
      newBpp: null,
      newProvider: null,
      newProduct: null,
      locations: []
    };
    if (localStorage.getItem('cartData')) {
      cartData = JSON.parse(localStorage.getItem('cartData'));
    }
    return cartData;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addItem: async (context: Context, { currentCart, product, quantity, customQuery }) => {
    // debugger;
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
        locations: []
      };
    }
    const price = productGetters.getPrice(product).regular;
    if (Boolean(currentCart.bpp) && (currentCart.bppProvider?.id !== customQuery.bppProvider.id || customQuery.bpp.id !== currentCart.bpp?.id)) {
      currentCart.newBpp = customQuery.bpp;
      currentCart.newProvider = customQuery.bppProvider;
      currentCart.newProduct = { quantity, ...product };
      return { ...currentCart };
    }
    const exisitingIndex = currentCart.items.findIndex(p => p.id === product.id);
    if (exisitingIndex !== -1) {
      const oldQuantity = currentCart.items[exisitingIndex].quantity;
      const quantityDiff = (quantity - oldQuantity);
      const priceDifference = quantityDiff * price;

      currentCart.totalPrice += priceDifference;
      currentCart.totalItems += quantityDiff;
      currentCart.items[exisitingIndex].quantity = quantity;
      if (quantity === 0) {
        currentCart.items.splice(exisitingIndex, 1);
        if (currentCart.totalItems === 0) {
          currentCart.bpp = null;
          currentCart.newBpp = null;
          currentCart.bppProvider = null;
          currentCart.newProvider = null;
          currentCart.locations = [];
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
    }

    localStorage.setItem('cartData', JSON.stringify(currentCart));
    return { ...currentCart };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeItem: async (context: Context, { currentCart, product, customQuery }) => {
    console.log('Mocked: removeFromCart');
    return currentCart;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateItemQty: async (context: Context, { currentCart, product, quantity, customQuery }) => {
    console.log('Mocked: updateQuantity');
    return currentCart;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear: async (context: Context, { currentCart }) => {
    console.log('Mocked: clearCart');
    return currentCart;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyCoupon: async (context: Context, { currentCart, couponCode, customQuery }) => {
    console.log('Mocked: applyCoupon');
    return { updatedCart: currentCart, updatedCoupon: currentCart };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeCoupon: async (context: Context, { currentCart, coupon, customQuery }) => {
    console.log('Mocked: removeCoupon');
    return { updatedCart: currentCart };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isInCart: (context: Context, { currentCart, product }) => {
    // debugger
    const exisiting = currentCart?.items.find(p => p.id === product.id);
    if (exisiting) {
      return exisiting;
    }
    return false;
  }

  // return {
  //   loadCart,
  //   addItem,
  //   currentBpp: computed(() => currentBpp.value),
  //   newBpp: computed(() => newBpp.value)
  // };
};

export default useCartFactory<Cart, CartProduct, Product, Coupon>(params);
