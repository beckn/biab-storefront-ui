<template>
  <div class="s-footer">
    <div class="f-price-container">
      <div class="holder">
        <div class="f-total">Total</div>
        <div>
          <span class="f-p-total">₹ {{ totlePrice }} </span
          ><span class="f-items">{{ totleItem }} Items</span>
        </div>
      </div>
    </div>
    <button
      class="color-primary sf-button f-button"
      :class="{'':buttonEnable}"
      :disabled="!buttonEnable"
      link=""
      @click="$emit('buttonClick')"
    >
      <!-- button icon template  -->
      <slot name="buttonIcon"/>
      <div class="f-btn-text">{{buttonText}}</div>
      <SfIcon icon="chevron_right" color="white" :coverage="1" size="xxs"/>
    </button>
  </div>
</template>
<script>
import { SfIcon } from '@storefront-ui/vue';

export default {
  name: 'Footer',
  components: {
    SfIcon
  },
  props: {
    totlePrice: { type: Number, default: 0 },
    totleItem: { type: Number, default: 0 },
    footerEnable: { type: Boolean, default: true },
    buttonEnable: { type: Boolean, default: false },
    buttonText: {type: String, default: ''}
  },
  setup() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
</style>
