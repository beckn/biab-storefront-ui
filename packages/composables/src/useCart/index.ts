/* istanbul ignore file */

// import {
//   Context,
// } from '@vue-storefront/core';
// import { Cart, CartItem, Coupon, Product } from '../types';
import { ref, computed } from '@vue/composition-api';
import { vsfRef } from '@vue-storefront/core';

const useCart = () => {
  const currentBpp = vsfRef('paisool', '1');
  const newBpp = vsfRef('', '2');
  const newBppProduct = ref({});

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadCart = async () => {
    console.log('Mocked: loadCart');
    let cartData = [];
    if (localStorage.getItem('cartData')) {
      cartData = JSON.parse(localStorage.getItem('cartData'));
    }
    return cartData;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const addItem = (productData: { bppName: string, item: { id: any, quantity: number } }, reset = false) => {
    let cartData = [];
    if (reset) localStorage.removeItem('cartData');
    if (localStorage.getItem('cartData')) {
      cartData = JSON.parse(localStorage.getItem('cartData'));
    } else {
      cartData = [productData];
      currentBpp.value = productData.bppName;
      localStorage.setItem('cartData', JSON.stringify(cartData));
      return cartData;
    }

    if (productData.bppName === currentBpp.value) {
      for (let i = 0; i < cartData.length; i++) {
        if (cartData[i].item.id === productData.item.id) {
          // eslint-disable-next-line max-depth
          if (productData.item.quantity === 0) {
            cartData.splice(i, 1);
            localStorage.setItem('cartData', JSON.stringify(cartData));
            return cartData;
          }
          cartData[i] = productData;
          localStorage.setItem('cartData', JSON.stringify(cartData));
          return cartData;
        }
      }
      cartData.push(productData);
      localStorage.setItem('cartData', JSON.stringify(cartData));
      return cartData;
    } else {
      newBpp.value = productData.bppName;
      newBppProduct.value = productData;
      console.log(newBpp.value);

    }
  };

  return {
    loadCart,
    addItem,
    currentBpp: computed(() => currentBpp.value),
    newBpp: computed(() => newBpp.value)
  };
};

export default useCart;
