<template>
  <div v-if="orderStatus">
    <div class="top-bar">
        <div @click="goBack" class="sf-chevron--left sf-chevron icon_back">
            <span class="sf-search-bar__icon">
            <SfIcon color="var(--c-primary)" size="20px" icon="chevron_left" />
            </span>
        </div>
        <div>Order Details</div>
    </div>
    <div class="details">
        <div class="sub-heading">
            <div class="p-name">Items ({{ orderGetters.getItems(order).length }})</div>
        </div>

        <div class="provider-head p-0">
            <div class="provide-img">
                <img
                    :src="
                    cartGetters.getProviderImage(cartGetters.getBppProvider(cart))
                        ? cartGetters.getProviderImage(cartGetters.getBppProvider(cart))
                        : require('~/assets/images/store-placeholder.png')
                    "
                />
            </div>
            <div class="p-name">
                {{
                    providerGetters.getProviderName(cartGetters.getBppProvider(cart))
                }}
            </div>
            <div class="text-padding">
                <span class="p-distance"> by </span> {{ cart.bpp.descriptor.name }}
            </div>
        </div>

        <div
            :key="index + 'new'"
            v-for="(product, index) in orderGetters.getItems(cart)"
            class="checkout-product"
        >
            <div class="s-p-image">
            <SfImage
                :src="orderGetters.getItemImage(product)"
                alt="product img"
                :width="85"
                :height="90"
            />
            </div>
            <div class="s-p-details">
            <div class="s-p-name">{{ orderGetters.getItemName(product) }}</div>
            <div class="s-p-weight">x {{ orderGetters.getItemQty(product) }}</div>
            <div class="s-p-price">
                ₹ {{ orderGetters.getItemPrice(product).regular }}
            </div>
            </div>
        </div>

        <div class="sub-heading">
            <div class="p-name">Shipping</div>
        </div>
        <AddressCard
            v-if="isShippingAddressFilled"
            :name="shippingAddress.name"
            :address="shippingAddress.address"
            :mobile="shippingAddress.mobile"
        />

        <div class="sub-heading">
            <div class="p-name">Billing</div>
        </div>
        <AddressCard
            v-if="isBillingAddressFilled && !shippingAsBilling"
            :name="billingAddress.name"
            :address="billingAddress.address"
            :mobile="billingAddress.mobile"
        />
        <PaymentCard
            :heading="'Payment'"
            :totalPaid="orderGetters.getPaidAmount()"
            :totalBalance="orderGetters.getBalanceAmount()"
            :breakup="orderGetters.getPaymentBreakup()"
            :paymentMethod="orderGetters.getMethod()"
            :transactionStatus="orderGetters.getTransactionStatus()"
            :transactionId="orderGetters.getTransactionId()"
        >
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
  SfImage,
  SfInput,
  SfIcon
} from '@storefront-ui/vue';
import ModalSlide from '~/components/ModalSlide.vue';
import AddressInputs from '~/components/AddressInputs.vue';
import Footer from '~/components/Footer.vue';
import {
  useCart,
  providerGetters,
  cartGetters,
  orderGetters,
  useAddress
} from '@vue-storefront/beckn';

import { computed, ref, onBeforeMount } from '@vue/composition-api';
import Card from '~/components/Card.vue';
import CardContent from '~/components/CardContent.vue';

import ProductCard from '~/components/ProductCard';
import AddressCard from '~/components/AddressCard';
import PaymentCard from '~/components/PaymentCard';

export default {
  name: 'Checkout',
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
    SfIcon,
    AddressCard,
    PaymentCard
  },
  setup(_, context) {
    // const isThankYou = computed(() => currentStep.value === 'thank-you');

    const shippingAsBilling = ref(false);
    const shippingAddressModal = ref(false);
    const billingAddressModal = ref(false);

    // const billingAddressModal = ref(false);

    const { cart, load } = useCart();

    const {
      getBillngAddress,
      getShippingAddress,
      setBillingAddress,
      setShippingAddress
    } = useAddress();

    const shippingAddress = ref(getShippingAddress());

    const billingAddress = ref(getBillngAddress());

    const isShippingAddressFilled = computed(() => {
      // debugger;
      return (
        shippingAddress.value.name !== '' &&
        shippingAddress.value.mobile !== '' &&
        shippingAddress.value.building !== '' &&
        shippingAddress.value.address !== ''
      );
    });
    const isBillingAddressFilled = computed(() => {
      return (
        billingAddress.value.name !== '' &&
        billingAddress.value.mobile !== '' &&
        billingAddress.value.building !== '' &&
        billingAddress.value.address !== ''
      );
    });

    const toggleShippingModal = () => {
      setShippingAddress(shippingAddress.value);
      shippingAddressModal.value = !shippingAddressModal.value;
    };

    const changeShippingAsBilling = () => {
      shippingAsBilling.value = !shippingAsBilling.value;
    };

    const toggleBillingModal = () => {
      setBillingAddress(billingAddress.value);
      billingAddressModal.value = !billingAddressModal.value;
    };

    const goBack = () => context.root.$router.back();

    onBeforeMount(() => {
      load();
    });

    const getTotal = () => {
      // Write sum code here
    };

    return {
      shippingAsBilling,
      changeShippingAsBilling,
      shippingAddressModal,
      billingAddressModal,
      toggleShippingModal,
      toggleBillingModal,
      shippingAddress,
      goBack,
      billingAddress,
      isShippingAddressFilled,
      cartGetters,
      orderGetters,
      providerGetters,
      isBillingAddressFilled,
      cart,
      getTotal
    };
  }
};
</script>

<style lang="scss" scoped>
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
  margin: 16px 0px;
  display: flex;
  justify-content: space-between;
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
    font-family: 'roboto';
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
</style>
