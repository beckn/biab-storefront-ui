/* istanbul ignore file */

// import {
//   Context,
// } from '@vue-storefront/core';
// import { Cart, CartItem, Coupon, Product } from '../types';
import { useCartFactory } from '@vue-storefront/core';
// import { ref, computed } from '@vue/composition-api';
import { Context } from 'node:vm';
import { CartProduct, Product } from '../types';

export type Coupon = Record<string, unknown>;

type Cart = {
  // id: number;
  bppName: string;
  items: CartProduct[];
  totalPrice:number;
  totalItems:number;
};

const params = {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async () => {
    console.log('Mocked: loadCart');
    let cartData = {
      items: [],
      bppName: '',
      totalPrice: 0,
      totalItems: 0
    };
    if (localStorage.getItem('cartData')) {
      cartData = JSON.parse(localStorage.getItem('cartData'));
    }
    return cartData;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addItem: async (context: Context, { currentCart, product, quantity, customQuery }) => {
    // debugger;
    const items = currentCart.items;
    if (currentCart.bppName !== '' && customQuery.bppName !== currentCart.bppName) {
      return { ...currentCart };
    }
    const exisiting = items.find(p => p.id === product.id);
    if (exisiting) {
      exisiting.quantity = exisiting.quantity + quantity;
    } else {
      product = { quantity: 1, ...product };
      currentCart.items.push(product);
    }

    localStorage.setItem('cartData', JSON.stringify(currentCart));
    return currentCart;
  },

  // const addItem = (context, productData: { bppName: string, item: { id: any, quantity: number } }, reset = false) => {
  //   if (localStorage.getItem('cartData') && JSON.parse(localStorage.getItem('cartData')).length > 0) {
  //     cartData = JSON.parse(localStorage.getItem('cartData'));
  //   } else {
  //     cartData = [productData];
  //     currentBpp.value = productData.bppName;
  //     localStorage.setItem('cartData', JSON.stringify(cartData));
  //     return cartData;
  //   }

  //   if (productData.bppName === currentBpp.value) {
  //     for (let i = 0; i < cartData.length; i++) {
  //       if (cartData[i].item.id === productData.item.id) {
  //         // eslint-disable-next-line max-depth
  //         if (productData.item.quantity === 0) {
  //           cartData.splice(i, 1);
  //           localStorage.setItem('cartData', JSON.stringify(cartData));
  //           return cartData;
  //         }
  //         cartData[i] = productData;
  //         localStorage.setItem('cartData', JSON.stringify(cartData));
  //         return cartData;
  //       }
  //     }
  //     cartData.push(productData);
  //     localStorage.setItem('cartData', JSON.stringify(cartData));
  //     return cartData;
  //   } else {
  //     newBpp.value = productData.bppName;
  //     newBppProduct.value = productData;
  //     console.log(newBpp.value);

  //   }
  // };

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
    const exisiting = currentCart.items.find(p => p.id === product.id);
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
