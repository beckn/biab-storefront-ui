<template>
  <div>
    <div class="top-bar">
      <div @click="goBack" class="sf-chevron--left sf-chevron icon_back">
        <span class="sf-search-bar__icon">
          <SfIcon color="var(--c-primary)" size="20px" icon="chevron_left" />
        </span>
      </div>
      <div class="header-push">Order Details</div>
    </div>

    <div v-if="enableLoader" key="loadingCircle" class="loader-circle">
      <LoadingCircle :enable="enableLoader" />
    </div>

    <div class="sub-heading"></div>
    <div v-if="!enableLoader" class="details">
      <div class="provider-head p-0">
        <div class="provide-img">
          <img
            :src="
              cartGetters.getProviderImage(
                cartGetters.getBppProvider(order.cart)
              )
                ? cartGetters.getProviderImage(
                    cartGetters.getBppProvider(order.cart)
                  )
                : require('~/assets/images/store-placeholder.png')
            "
          />
        </div>
        <div class="p-name">
          {{
            providerGetters.getProviderName(
              cartGetters.getBppProvider(order.cart)
            )
          }}
        </div>
        <div class="text-padding">
          <!-- <span class="p-distance"> by </span> {{ order.cart.bpp.descriptor.name }} -->
        </div>

        <!-- <div class="text-padding">
            <div class="flexy-center">
              <div class="p-name">Abc</div>
              <div class="text-padding">
                <span class="p-distance"> by </span>
                <span>BCA</span>
              </div>
            </div>
          </div> -->
      </div>

      <div class="sub-heading">
        <div class="p-name">Items</div>
      </div>

      <div
        :key="index + 'new'"
        v-for="(product, index) in cartGetters.getItems(order.cart)"
        class="checkout-product"
      >
        <div class="s-p-image">
          <SfImage
            :src="cartGetters.getItemImage(product)"
            alt="product img"
            :width="85"
            :height="90"
          />
        </div>
        <div class="s-p-details">
          <div class="s-p-name">{{ cartGetters.getItemName(product) }}</div>
          <div class="s-p-weight">x {{ cartGetters.getItemQty(product) }}</div>
          <div class="s-p-price">
            ₹ {{ cartGetters.getItemPrice(product).regular }}
          </div>
        </div>
      </div>

      <div class="sub-heading"></div>

      <Card>
        <SfAccordion>
          <SfAccordionItem :header="'Shipping'">
            <AddressCard
              :name="order.shippingAddress.name"
              :address="order.shippingAddress.address"
              :mobile="order.shippingAddress.mobile"
              :building="order.shippingAddress.building"
              :pincode="order.shippingAddress.pincode"
            />
          </SfAccordionItem>
        </SfAccordion>
      </Card>

      <div class="sub-heading"></div>

      <Card>
        <SfAccordion>
          <SfAccordionItem :header="'Billing'">
            <CardContent v-if="order.shippingAsBilling" class="flex-space-bw">
              <div class="address-text">Same as Shipping Details</div>
            </CardContent>
            <AddressCard v-else
              :name="order.billingAddress.name"
              :address="order.billingAddress.address"
              :mobile="order.billingAddress.mobile"
              :building="order.billingAddress.building"
              :pincode="order.billingAddress.pincode"
            />
          </SfAccordionItem>
        </SfAccordion>
      </Card>

      <div class="sub-heading"></div>

      <Card>
        <SfAccordion>
          <SfAccordionItem :header="'Payment'">
            <!-- <CardContent class="flex-space-bw">
              <div class="address-text">SubTotal</div>
              <div class="address-text">
                ₹{{ cartGetters.getTotals(order.cart).total }}
              </div>
            </CardContent>
            <CardContent class="flex-space-bw">
              <div class="address-text">Delivery Charges</div>
              <div class="address-text">₹0.00</div>
            </CardContent>
            <CardContent class="flex-space-bw">
              <div class="address-text">Taxes (CGST)</div>
              <div class="address-text">₹0.00</div>
            </CardContent>
            <CardContent class="flex-space-bw">
              <div class="address-text">Taxes(SGST)</div>
              <div class="address-text">₹0.00</div>
            </CardContent> -->
            <CardContent
              v-for="breakup in order.cart.quote.breakup"
              :key="breakup.title"
              class="flex-space-bw"
            >
              <div class="address-text">{{ breakup.title }}</div>
              <div class="address-text">₹{{ breakup.price.value }}</div>
            </CardContent>
            <div><hr class="sf-divider divider" /></div>
            <CardContent class="flex-space-bw">
              <div class="address-text bold">Total</div>
              <div class="address-text bold">
                ₹{{ cartGetters.getTotals(order.cart).total }}
              </div>
            </CardContent>
            <CardContent class="flex-space-bw">
              <div class="address-text">Method</div>
              <div class="address-text">{{ order.paymentMethod }}</div>
            </CardContent>
            <CardContent class="flex-space-bw">
              <div class="address-text">Status</div>
              <div class="address-text">{{ order.order.payment.status }}</div>
            </CardContent>
            <CardContent class="flex-space-bw">
              <div class="address-text">Transaction Id</div>
              <div class="address-text">
                <!-- {{ order.order.payment.params.transaction_id }} -->
              </div>
            </CardContent>
          </SfAccordionItem>
        </SfAccordion>
      </Card>

      <div class="sub-heading">
        <!-- <div class="p-name">Order</div> -->
      </div>
      <Card>
        <SfAccordion>
          <SfAccordionItem :header="'Order'">
            <CardContent class="flex-space-bw">
              <div class="address-text">ID</div>
              <div class="address-text">{{ order.order.id }}</div>
            </CardContent>
            <CardContent class="flex-space-bw">
              <div class="address-text">Placed at</div>
              <div class="address-text">{{ order.order.created_at }}</div>
            </CardContent>
            <CardContent class="flex-space-bw">
              <div class="address-text">Status</div>
              <div class="address-text">Confirmed</div>
            </CardContent>
          </SfAccordionItem>
        </SfAccordion>
      </Card>

      <div class="sub-heading">
        <!-- <div class="p-name">Order</div> -->
      </div>
      <Card>
        <SfAccordion>
          <SfAccordionItem :header="'Fulfillment'">
            <CardContent class="flex-space-bw">
              <div class="address-text">ID</div>
              <div class="address-text">#99J787jL</div>
            </CardContent>
            <CardContent class="flex-space-bw">
              <div class="address-text">Provider</div>
              <div class="address-text">₹0.00</div>
            </CardContent>
            <CardContent class="flex-space-bw">
              <div class="address-text">Status</div>
              <div class="address-text">Confirmed</div>
            </CardContent>
          </SfAccordionItem>
        </SfAccordion>
      </Card>
      <div class="fulfillment-progress">
        <div class="head">
          <span>Fulfillment Progress</span>
        </div>
        <div class="sub-head">
          <img src="/icons/calendar.svg" alt="" />
          <span>ETA</span>
          <span class="time">Today, 1.30pm</span>
        </div>
        <div class="tabs-container">
          <div
            class="tab"
            :class="{ fill: tab }"
            v-for="(tab, index) in fulfillmentStep"
            :key="index"
          ></div>
        </div>
        <div
          class="track-details"
          :class="{
            first: index === 0,
            last: index === fulfillmentSteps.length - 1,
          }"
          v-for="(step, index) in fulfillmentSteps"
          :key="index"
        >
          <div class="check-container">
            <div v-if="index !== 0" class="dot"></div>
            <div v-if="index !== 0" class="dot"></div>
            <div class="check"><img src="/icons/check.svg" alt="" /></div>
            <div v-if="index !== fulfillmentSteps.length - 1" class="dot"></div>
            <div v-if="index !== fulfillmentSteps.length - 1" class="dot"></div>
          </div>
          <div class="step-details">
            <div class="step-name">{{ step.status }}</div>
            <div class="step-time">{{ step.time }}</div>
          </div>
        </div>
      </div>
      <button class="sf-button color-primary support-btn" @click="openSupportModal = true" >
        <div class="f-btn-text">Contact Support</div>
        <img class="btn-img" src="/icons/support.svg" />
      </button>
      <button class="color-light sf-button cancel-order-btn" @click="onCancel">
        <div class="btn-text">Cancel Order</div>
      </button>
      <ModalSlide :visible="openSupportModal" @close="openSupportModal = false">
        <div class="modal-heading">Contact Support</div>
        <div><hr class="sf-divider" /></div>
        <div class="modal-body">
          <div class="support-text">
            You can reach out to one of our customer
            support executives for any help, queries
            or feedback to {{providerGetters.getProviderName(cartGetters.getBppProvider(order.cart))}}
          </div>
          <SfButton class="support-btns" aria-label="Close modal" type="button">Call us</SfButton>
          <SfButton class="support-btns" aria-label="Close modal" type="button">Email us</SfButton>
          <SfButton class="support-btns" aria-label="Close modal" type="button">Chat with us</SfButton>
        </div>
      </ModalSlide>
    </div>
  </div>
</template>
<script>
import {
  SfSteps,
  SfSidebar,
  SfButton,
  SfModal,
  SfCheckbox,
  SfAccordion,
  SfImage,
  SfInput,
  SfIcon
} from '@storefront-ui/vue';
import ModalSlide from '~/components/ModalSlide.vue';
import LoadingCircle from '~/components/LoadingCircle';
import SfAccordionItem from '~/components/Accordion.vue';
import AddressInputs from '~/components/AddressInputs.vue';
import Footer from '~/components/Footer.vue';
import { cartGetters, providerGetters } from '@vue-storefront/beckn';

import { ref, onBeforeMount } from '@vue/composition-api';
import Card from '~/components/Card.vue';
import CardContent from '~/components/CardContent.vue';

import ProductCard from '~/components/ProductCard';
import AddressCard from '~/components/AddressCard';

export default {
  name: 'OrderDetails',
  components: {
    SfButton,
    SfSteps,
    SfSidebar,
    SfModal,
    SfCheckbox,
    Footer,
    ModalSlide,
    SfInput,
    Card,
    SfImage,
    CardContent,
    ProductCard,
    AddressInputs,
    SfAccordion,
    SfAccordionItem,
    SfIcon,
    LoadingCircle,
    AddressCard
  },
  setup(_, context) {
    // const isThankYou = computed(() => currentStep.value === 'thank-you');

    const order = ref(null);
    const enableLoader = ref(true);
    const transactionId = context.root.$route.query.id;
    const fulfillmentStep = [{status: 'Items Packed', time: 'May 2021, 2021 12:40 PM'}, {status: 'Delivery agent assigned', time: 'May 2021, 2021 12:40 PM'}, {status: 'Agent enroute to store', time: 'May 2021, 2021 12:40 PM'}, null, null, null, null];
    const fulfillmentSteps = [{status: 'Items Packed', time: 'May 2021, 2021 12:40 PM'}, {status: 'Delivery agent assigned', time: 'May 2021, 2021 12:40 PM'}, {status: 'Agent enroute to store', time: 'May 2021, 2021 12:40 PM'}];
    const openSupportModal = ref(false);
    const goBack = () => context.root.$router.back();
    const onCancel = () => context.root.$router.push('/cancelorder');

    onBeforeMount(async () => {
      const orders = JSON.parse(localStorage.getItem('orderHistory')) ?? [];

      order.value = orders.find((ord) => {
        return ord.transactionId === transactionId;
      });
      enableLoader.value = false;
    });

    return {
      goBack,
      order,
      cartGetters,
      providerGetters,
      fulfillmentStep,
      fulfillmentSteps,
      openSupportModal,
      onCancel,
      enableLoader
    };
  }
};
</script>

<style lang="scss" scoped>
.header-top{
    position: fixed;
    width: 100%;
    top: 45px;
    z-index: 9;
}

.bold {
  font-weight: 600;
}

.card-checkbox {
  margin-bottom: 20px;
}

.sf-checkbox__checkmark:hover {
  --checkbox-border-color: transparent !important;
  border: 0;
}
.sf-input {
  input {
    font-size: 14px;
    &:placeholder {
      font-size: 14px;
    }
  }
}

.s-p-weight {
  margin-top: 6px;
  font-size: 14px;
  color: #8a8d8e;
}

.flex-space-bw {
  justify-content: space-between;
}

.details {
  margin: 2px 20px;
}

.address-bar-icon {
  margin: 10px 10px 1px 10px;
}

.address-text {
  align-self: center;
  margin-left: 6px;
}

.sub-heading {
  margin: 14px 0px;
  display: flex;
  justify-content: space-between;
}

.footer {
  position: fixed;
  bottom: 0;
}

.icon_back {
  position: absolute;
  left: 0;
  margin: 10px;
}

.color-def {
  color: #f37a20;
}

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

.p-name {
  font-size: 16px;
  font-weight: 600;
  color: #37474f;
}
#checkout {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}
.checkout-product:first-child {
  border-top: 0px solid rgba(0, 0, 0, 0.3);
}
.checkout-product {
  display: flex;
  margin-top: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  padding-bottom: 15px;
  &:first-child(2) {
    border-top: 0 !important;
  }
  .s-p-image {
    margin-right: 25px;
  }
  .s-p-name {
    font-size: 11px;
    color: #000;
  }
  .s-p-price {
    font-size: 16px;
    font-weight: 600;
    margin-top: 10px;
    color: #f37a20;
  }
}
.checkout {
  @include for-desktop {
    display: flex;
  }
  &__main {
    @include for-desktop {
      flex: 1;
      padding: var(--spacer-xl) 0 0 0;
    }
  }
  &__aside {
    @include for-desktop {
      flex: 0 0 25.5rem;
      margin: 0 0 0 4.25rem;
    }
  }
  &__steps {
    --steps-content-padding: 0 var(--spacer-base);
    @include for-desktop {
      --steps-content-padding: 0;
    }

    &-auth::v-deep .sf-steps__step:first-child {
      --steps-step-color: #e8e4e4;
    }
  }
}
.modal-heading {
  margin: 20px;
  font-size: 20px;
  font-weight: 500;
}

.modal-body {
  padding: 28px;
  .support-text{
    font-size: 15px;
  }
  .support-btns{
    margin-top: 20px;
    width: 100%;
  }
}
</style>
