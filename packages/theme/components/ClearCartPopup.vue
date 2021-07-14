<template>
  <div v-if="show" class="clear-cart">
    <SfOverlay :visible="show"></SfOverlay>
    <div class="cart-popup">
      <SfImage
        class="clear-icon"
        src="/icons/clear-cart.svg"
        alt="clear cart"
      />
      <div class="title">Clear your Cart</div>
      <div class="text-detail">
        Your cart has items from {{ currentApp }} Mart.
      </div>
      <div class="text-detail">Do you wish to clear cart and add</div>
      <div class="text-detail">items from {{ newBpp }} mart?</div>
      <div class="button-container">
        <button class="sf-button sf-button--full-width button-s no">No</button>
        <button class="sf-button sf-button--full-width button-s">
          yes, Clear Cart
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { SfIcon, SfOverlay, SfImage } from '@storefront-ui/vue';
import { ref } from '@vue/composition-api';

export default {
  name: 'ClearCartPopup',
  components: {
    SfIcon,
    SfOverlay,
    SfImage
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const currentApp = ref('abc');
    const newBpp = ref('xyz');
    const product = ref({});

    return {
      currentApp,
      newBpp,
      product
    };
  }
};
</script>
<style lang="scss" scoped>
.clear-cart {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .cart-popup {
    text-align: center;
    background: #fff !important;
    width: 341px;
    height: 307px;
    z-index: 1;
    padding: 0 15px;
    border-radius: 10px;
    .clear-icon {
      padding: 20px 0;
    }
    .title {
      color: #37474f;
      font-weight: 500;
      font-size: 24px;
      padding-bottom: 10px;
    }
    .text-detail {
      font-size: 17px;
      color: #7c7c7c;
    }
    .button-container {
      display: flex;
      margin-top: 20px;
      .button-s {
        font-size: 14px;
        border-radius: 3px;
      }
      .no {
        background: #fff;
        color: #7c7c7c;
      }
    }
  }
}
</style>
