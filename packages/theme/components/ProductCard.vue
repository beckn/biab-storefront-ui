<template>
  <div class="s-product">
    <div class="s-p-image">
      <SfImage :src="pImage" alt="product img" :width="85" :height="90" />
    </div>
    <div class="s-p-name">{{ pName }}</div>
    <!-- <div class="s-p-weight">{{ pWieght }}</div> -->
    <div class="s-p-price">₹ {{ pPrice }}</div>
    <AddToCart :value="itemCount" @updateItemCount="updateItemCount" />
  </div>
</template>
<script>
import { SfImage } from '@storefront-ui/vue';
import AddToCart from './AddToCart.vue';

export default {
  name: 'ProductCard',
  components: {
    SfImage,
    AddToCart
  },
  props: {
    pName: { type: String, default: '' },
    pWieght: { type: String, default: '' },
    pPrice: { type: String, default: '' },
    pImage: { type: String, default: '' },
    pCount: { type: Number, default: 0 },
    horizontalView: { type: Boolean, default: false }
  },
  data: () => {
    return {
      itemCount: 0
    };
  },
  methods: {
    updateItemCount(data) {
      console.log('item ', data);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
