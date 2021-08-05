<template>
  <div id="payment">
    <div class="top-bar">
      <div class="sf-chevron--left sf-chevron icon_back">
        <span class="sf-search-bar__icon">
          <SfIcon color="var(--c-primary)" size="20px" icon="chevron_left" />
        </span>
      </div>
      <div>Select Payment Method</div>
    </div>
    <div class="details">
      <div class="sub-heading">
        <div class="p-name">Other</div>
      </div>
      <Card>
        <CardContent>
          <!-- <div class="address-text color-def">Add Shipping Details</div> -->
          <SfRadio
            class="sf-radio--transparent"
            :name="'Payment'"
            :value="'store'"
            label="Cash On Delivery"
            :disabled="false"
            :selected="paymentMethod"
            @change="changePaymentMethod"
          />
        </CardContent>
      </Card>
    </div>
    <Footer
      class="footer-fixed"
      :buttonText="'Pay & Confirm'"
      :buttonEnable="isPayConfirmActive"
      @buttonClick="proceedToConfirm"
    >
      <template v-slot:buttonIcon>
        <svg
          width="25"
          height="19"
          viewBox="0 0 25 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.0166 7.10181H23.0166M3.0166 1.10181H21.0166C22.1212 1.10181 23.0166 1.99724 23.0166 3.10181V15.1018C23.0166 16.2064 22.1212 17.1018 21.0166 17.1018H3.0166C1.91203 17.1018 1.0166 16.2064 1.0166 15.1018V3.10181C1.0166 1.99724 1.91203 1.10181 3.0166 1.10181Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </template>
    </Footer>
  </div>
</template>
<script>
import { SfButton, SfRadio, SfIcon } from '@storefront-ui/vue';
import { useUiState } from '~/composables';

import { ref, computed, onBeforeMount } from '@vue/composition-api';
// import helpers from '../helpers/helpers';
// import { useCart } from '@vue-storefront/beckn';

import Card from '~/components/Card.vue';

import Footer from '~/components/Footer.vue';
import CardContent from '~/components/CardContent.vue';
const { toggleCartSidebar } = useUiState();
export default {
  name: 'Payment',
  components: {
    SfButton,
    SfIcon,
    Card,
    CardContent,
    SfRadio,
    Footer
  },
  methods: {
    openCart() {
      toggleCartSidebar();
    }
  },
  setup(_, context) {
    const paymentMethod = ref('');
    const order = ref({});

    const changePaymentMethod = (value) => {
      paymentMethod.value = value;
    };

    const isPayConfirmActive = computed(() => {
      return paymentMethod.value !== '';
    });

    const proceedToConfirm = () => {
    //   order.paymentMethod = paymentMethod.value;con
      context.root.$router.push('/ordersuccess');

      localStorage.setItem('orderProgress', JSON.stringify(order));
    };

    onBeforeMount(() => {
      order.value = JSON.parse(localStorage.getItem('orderProgress'));
    });
    return {
      paymentMethod,
      changePaymentMethod,
      order,
      isPayConfirmActive,
      proceedToConfirm
    };
  }
};
</script>
<style lang="scss" scoped>
.top-bar {
  align-items: center;
  display: flex;
  font-size: 18px;
  justify-content: space-around;
  height: 60px;
  font-weight: 500;
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.07);
}

.icon_back {
  position: absolute;
  left: 0;
  margin: 10px;
}
.details {
  margin: 2px 20px;
}

.p-name {
  font-size: 16px;
  font-weight: 600;
  color: #37474f;
}

.sub-heading {
  margin: 16px 0px;
  display: flex;
  justify-content: space-between;
}
</style>
