<template>
  <div id="payment">
    <div v-if="enableLoader" key="loadingCircle" class="loader-circle">
      <LoadingCircle
        :enable="enableLoader"
        :custmText="
          !isOrderVerified
            ? 'Checking authenticity of items'
            : 'Items Successfully Verified for Authenticity. Confirming Order'
        "
      />
    </div>
    <div class="top-bar header-top">
      <div @click="goBack" class="sf-chevron--left sf-chevron icon_back">
        <span class="sf-search-bar__icon">
          <SfIcon color="var(--c-primary)" size="20px" icon="chevron_left" />
        </span>
      </div>
      <div class="">Select Payment Method</div>
    </div>

    <div class="details header-push">
      <div class="sub-heading">
        <div class="p-name">Payment</div>
      </div>
      <Card v-if="order.cart">
        <CardContent
          v-for="breakup in order.cart.quote.breakup"
          :key="breakup.title"
          class="flex-space-bw"
        >
          <div class="address-text">{{ breakup.title }}</div>
          <div class="address-text">₹{{ Math.trunc(breakup.price.value) }}</div>
        </CardContent>
        <div><hr class="sf-divider divider" /></div>
        <CardContent class="flex-space-bw">
          <div class="address-text bold">Total</div>
          <div class="address-text bold">
            ₹{{ Math.trunc(order.cart.quote.price.value) }}
          </div>
        </CardContent>
      </Card>
      <div class="sub-heading">
        <div class="p-name">Other</div>
      </div>
      <Card>
        <CardContent>
          <!-- <div class="address-text color-def">Add Shipping Details</div> -->
          <SfRadio
            class="sf-radio--transparent"
            :name="'Payment'"
            :value="'Cash on Delivery'"
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
      :buttonText="'Confirm'"
      :buttonEnable="isPayConfirmActive"
      :totalPrice="parseFloat(order.cart.quote.price.value)"
      :totalItem="cartGetters.getTotalItems(order.cart)"
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

import { ref, computed, onBeforeMount, watch } from '@vue/composition-api';

import LoadingCircle from '~/components/LoadingCircle';
// import helpers from '../helpers/helpers';
import { useConfirmOrder, cartGetters } from '@vue-storefront/beckn';

import Card from '~/components/Card.vue';

import Footer from '~/components/Footer.vue';
import CardContent from '~/components/CardContent.vue';
import { createConfirmOrderRequest } from '../helpers/helpers';
const { toggleCartSidebar } = useUiState();
export default {
  name: 'Payment',
  components: {
    SfButton,
    SfIcon,
    Card,
    CardContent,
    SfRadio,
    Footer,
    LoadingCircle
  },
  methods: {
    openCart() {
      toggleCartSidebar();
    }
  },
  setup(_, context) {
    const paymentMethod = ref('');
    const order = ref({});
    const isOrderVerified = ref(false);
    const enableLoader = ref(false);

    const { init, poll, pollResults } = useConfirmOrder('confirm-order');
    const isProductConfirmed = async () => {
      if (order.value.cart.items[0].tags) {
        await fetch('https://dev.studio.dhiway.com/api/v1/cord/order_confirm', {
          method: 'POST',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify({
            identifier: order.value.bapId,
            order_price: order.value.cart.totalPrice,
            quantity: order.value.cart.totalItems,
            listId: order.value.cart.items[0].tags.product_list_id,

            blockHash: order.value.cart.items[0].tags.blockhash
          })
        })
          .then((res) => {
            if (res.status === 200) {
              isOrderVerified.value = true;
            }
          })
          .catch((e) => console.error(e));
      } else {
        return;
      }
    };

    const changePaymentMethod = (value) => {
      paymentMethod.value = value;
    };

    const isPayConfirmActive = computed(() => {
      return paymentMethod.value !== '';
    });

    const proceedToConfirm = async () => {
      enableLoader.value = true;
      await isProductConfirmed();
      order.value.paymentMethod = paymentMethod.value;
      const params = createConfirmOrderRequest(
        order.value.transactionId,
        order.value.cart,
        order.value.shippingAddress,
        order.value.billingAddress,
        order.value.shippingAsBilling,
        '12.9063433,77.5856825',
        {
          amount: cartGetters.getTotals(order.value.cart).total,
          status: 'PAID',
          transactionId: order.value.transactionId
        }
      );
      const response = await init(params);
      await poll({ messageId: response.context.message_id });
    };

    const goBack = () => context.root.$router.back();

    watch(
      () => pollResults.value,
      (newValue) => {
        if (newValue?.message?.order) {
          order.value.order = newValue?.message?.order;

          const orderHistory =
            JSON.parse(localStorage.getItem('orderHistory')) ?? [];
          orderHistory.push(order.value);
          localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
          // localStorage.removeItem('orderProgress');
          // localStorage.removeItem('transactionId');

          context.root.$router.push({
            path: '/ordersuccess',
            query: {
              id: order.value.transactionId
            }
          });
        }
      }
    );

    onBeforeMount(() => {
      order.value = JSON.parse(localStorage.getItem('orderProgress'));
      console.log(order.value);
    });
    return {
      paymentMethod,
      changePaymentMethod,
      order,
      cartGetters,
      goBack,
      isPayConfirmActive,
      proceedToConfirm,
      enableLoader,
      isProductConfirmed,
      isOrderVerified
    };
  }
};
</script>
<style lang="scss" scoped>
// .header-top{
//     position: fixed;
//     width: 100%;
//     top: 45px;
//     z-index: 9;
// }
// .header-push{
//     top: 107px;
//     position: relative;
//     padding-bottom: 107px;
// }
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

.loader-circle {
  width: 100%;
  position: fixed;
  z-index: 1;
  // top: 130px;
  left: 0;
  height: 95vh;
}

.flex-space-bw {
  justify-content: space-between;
}
</style>
