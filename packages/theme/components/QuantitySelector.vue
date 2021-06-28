<template>
  <div>
    <div class="s-p-addcart">
      <button
        v-if="value == 0"
        class="color-primary sf-button"
        :disabled="false"
        link=""
        @click="changeItemNumber('add')"
      >
        <SfIcon icon="add_to_cart" size="xs" color="white" :coverage="1" /> Add
        to Cart
      </button>
      <div v-else>
        <button
          class="sf-button--pure sf-quantity-selector__button sf-button"
          :disabled="false"
          link=""
          data-testid="+"
          @click="changeItemNumber('remove')"
        >
          −
        </button>
        <div
          class="quantity-value"
          :value="value"
          data-testid="sf-quantity-selector"
        >
          {{ value }}
        </div>
        <button
          class="sf-button--pure sf-quantity-selector__button sf-button"
          :disabled="false"
          link=""
          data-testid="-"
          @click="changeItemNumber('add')"
        >
          +
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { SfInput, SfIcon } from '@storefront-ui/vue';

export default {
  name: 'QuantitySelector',
  components: {
    SfInput,
    SfIcon
  },
  props: ['_value', '_maxLimit'],
  data: () => {
    return {
      value: 0,
      maxLimit: 10
    };
  },
  methods: {
    changeItemNumber(type) {
      if (type === 'add') {
        if (this.maxLimit) {
          if (this.value < this.maxLimit) {
            this.value++;
          }
        } else {
          this.value++;
        }
      } else if (type === 'remove') {
        if (this.value > 0) {
          this.value--;
        }
      }
      this.$emit('updateItemCount', this.value);
    }
  }
};
</script>
<style lang="scss" scoped>
.quantity {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .quantity-value {
    margin-top: 10px;
  }
}
</style>
