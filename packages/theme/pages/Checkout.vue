<template>
  <div>
    <div class="top-bar">
      <div @click="goBack" class="sf-chevron--left sf-chevron icon_back">
              <span class="sf-search-bar__icon">
        <SfIcon color="var(--c-primary)" size="20px" icon="chevron_left" />
      </span>
      </div>
      <div>Checkout</div>
    </div>
    <div class="details">
      <div class="sub-heading">
        <div class="p-name">Items in Cart</div>
      </div>

      <div class="provider-head p-0">
          <!-- <SfImage
            class="back"
            :src="providerGetters.getProviderImages(provider)[0]"
            alt="Vila stripe maxi shirt dress"
            :width="35"
            :height="35"
          /> -->
          <div class="provide-img"><img :src="cartGetters.getProviderImage(cart.bppProvider)?cartGetters.getProviderImage(cart.bppProvider):require('~/assets/images/store-placeholder.png')" /></div>
          <div class="p-name"> {{ cart.bppProvider.descriptor.name }} </div>
          <div class="text-padding"> <span class="p-distance"> by </span> {{ cart.bpp.descriptor.name }} </div>

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

      <div
        :key="index + 'new'"
        v-for="(product, index) in cartGetters.getItems(cart)"
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
          <!-- <div class="s-p-weight">{{ _pWieght }}</div> -->
          <div class="s-p-price">
            ₹ {{ cartGetters.getItemPrice(product).regular }}
          </div>
        </div>
      </div>

      <div class="sub-heading">
        <div class="p-name">Shipping</div>
        <SfButton
          v-if="isShippingAddressFilled"
          class="sf-button--pure"
          @click="toggleShippingModal"
        >
          <div class="color-def">Change</div>
        </SfButton>
      </div>
      <Card v-if="isShippingAddressFilled">
        <CardContent>
          <div class="address-bar-icon">
            <svg
              width="19"
              height="21"
              viewBox="0 0 19 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.7402 19.0747V17.0747C17.7402 16.0138 17.3188 14.9964 16.5687 14.2463C15.8185 13.4961 14.8011 13.0747 13.7402 13.0747H5.74023C4.67937 13.0747 3.66195 13.4961 2.91181 14.2463C2.16166 14.9964 1.74023 16.0138 1.74023 17.0747V19.0747M13.7402 5.07471C13.7402 7.28385 11.9494 9.07471 9.74023 9.07471C7.5311 9.07471 5.74023 7.28385 5.74023 5.07471C5.74023 2.86557 7.5311 1.07471 9.74023 1.07471C11.9494 1.07471 13.7402 2.86557 13.7402 5.07471Z"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="address-text">{{ shippingAddress.name }}</div>
        </CardContent>
        <div><hr class="sf-divider divider" /></div>
        <CardContent>
          <div class="address-bar-icon">
            <svg
              width="20"
              height="24"
              viewBox="0 0 20 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 10C19 17 10 23 10 23C10 23 1 17 1 10C1 7.61305 1.94821 5.32387 3.63604 3.63604C5.32387 1.94821 7.61305 1 10 1C12.3869 1 14.6761 1.94821 16.364 3.63604C18.0518 5.32387 19 7.61305 19 10Z"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="address-text">
            {{ shippingAddress.address }}
          </div>
        </CardContent>
        <div><hr class="sf-divider divider" /></div>
        <CardContent>
          <div class="address-bar-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.57 5.37109C15.5467 5.56166 16.4443 6.03935 17.148 6.74303C17.8517 7.44671 18.3294 8.34436 18.52 9.32109L14.57 5.37109ZM14.57 1.37109C16.5992 1.59653 18.4915 2.50527 19.9362 3.9481C21.3808 5.39093 22.292 7.2821 22.52 9.31109L14.57 1.37109ZM21.52 17.2911V20.2911C21.5211 20.5696 21.464 20.8453 21.3525 21.1004C21.2409 21.3556 21.0773 21.5847 20.872 21.773C20.6668 21.9612 20.4245 22.1046 20.1607 22.1938C19.8969 22.283 19.6173 22.3162 19.34 22.2911C16.2628 21.9567 13.307 20.9052 10.71 19.2211C8.29378 17.6858 6.24529 15.6373 4.70995 13.2211C3.01993 10.6123 1.9682 7.64209 1.63995 4.55109C1.61496 4.27456 1.64783 3.99585 1.73645 3.73272C1.82508 3.46958 1.96752 3.22778 2.15472 3.02271C2.34191 2.81765 2.56976 2.6538 2.82374 2.54162C3.07773 2.42943 3.35229 2.37136 3.62995 2.37109H6.62995C7.11526 2.36632 7.58574 2.53817 7.95371 2.85463C8.32168 3.17108 8.56203 3.61054 8.62995 4.09109C8.75658 5.05116 8.9914 5.99382 9.32995 6.90109C9.4645 7.25902 9.49362 7.64801 9.41386 8.02197C9.3341 8.39594 9.14882 8.7392 8.87995 9.01109L7.60995 10.2811C9.03351 12.7846 11.1064 14.8575 13.61 16.2811L14.88 15.0111C15.1518 14.7422 15.4951 14.5569 15.8691 14.4772C16.243 14.3974 16.632 14.4266 16.99 14.5611C17.8972 14.8996 18.8399 15.1345 19.8 15.2611C20.2857 15.3296 20.7294 15.5743 21.0465 15.9486C21.3636 16.3229 21.5321 16.8007 21.52 17.2911Z"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="address-text">{{ shippingAddress.mobile }}</div>
        </CardContent>
      </Card>
      <Card v-if="!isShippingAddressFilled">
        <CardContent>
          <div class="address-bar-icon">
            <svg
              width="16"
              height="21"
              viewBox="0 0 16 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 1C11.8598 1 15 4.1402 15 8C15 13.2126 9.80472 18.1458 7.99934 19.7024C6.19334 18.1482 1 13.2239 1 8C1 4.1402 4.14018 1 8 1ZM8 0C3.58176 0 0 3.5817 0 8C0 14.8571 8 21 8 21C8 21 16 14.8571 16 8C16 3.5817 12.4182 0 8 0ZM7 12H9V9H12V7H9V4H7V7H4V9H7V12Z"
                fill="#F37A20"
              />
            </svg>
          </div>
          <div @click="toggleShippingModal" class="address-text color-def">
            Add Shipping Details
          </div>
        </CardContent>
      </Card>

      <div class="sub-heading">
        <div class="p-name">Billing</div>
        <SfButton
          v-if="isBillingAddressFilled || shippingAsBilling"
          class="sf-button--pure"
          @click="toggleShippingModal"
        >
          <div class="color-def">Change</div>
        </SfButton>
      </div>
      <Card v-if="!isBillingAddressFilled">
        <CardContent>
          <div class="address-bar-icon">
            <SfCheckbox
              @change="changeShippingAsBilling"
              :selected="shippingAsBilling"
              name="shipping"
            />
          </div>
          <div class="address-text">Same as Shipping Details</div>
        </CardContent>
      </Card>

      <div class="sub-heading">
        <div class="p-name">Payment</div>
      </div>
      <Card>
        <CardContent class="flex-space-bw">
          <div class="address-text">SubTotal</div>
          <div class="address-text">0.00</div>
        </CardContent>
        <CardContent class="flex-space-bw">
          <div class="address-text">Delivery Charges</div>
          <div class="address-text">0.00</div>
        </CardContent>
        <CardContent class="flex-space-bw">
          <div class="address-text">Taxes (CGST)</div>
          <div class="address-text">0.00</div>
        </CardContent>
        <CardContent class="flex-space-bw">
          <div class="address-text">Taxes(SGST)</div>
          <div class="address-text">0.00</div>
        </CardContent>
        <div><hr class="sf-divider divider" /></div>
        <CardContent class="flex-space-bw">
          <div class="address-text bold">Total</div>
          <div class="address-text bold">0.00</div>
        </CardContent>
      </Card>

      <div class="sub-heading">
        <div class="p-name">Order Policy</div>
      </div>
    </div>
    <Footer
      :totalPrice="cartGetters.getTotals(cart).total"
      :totalItem="cartGetters.getTotalItems(cart)"
      buttonText="Proceed To Pay"
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
    <ModalSlide :visible="shippingAddressModal" @close="toggleShippingModal">
      <AddressInputs
        :buttonText="'Save Shipping Details'"
        :headingText="'Shipping Details'"
        :addressDetails="shippingAddress"
        @getAddress="toggleShippingModal"
      />
    </ModalSlide>
    <ModalSlide :visible="billingAddressModal" @close="toggleBillingModal">
      <AddressInputs
        :buttonText="'Save Billing Details'"
        :buttonEnable="false"
        :headingText="'Billing Details'"
        :addressDetails="billingAddress"
      />
    </ModalSlide>
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
import { useUiState } from '~/composables';
import { useCart, cartGetters } from '@vue-storefront/beckn';

import { computed, ref } from '@vue/composition-api';
import Card from '~/components/Card.vue';
import CardContent from '~/components/CardContent.vue';

import ProductCard from '~/components/ProductCard';

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
    SfIcon
  },
  setup(_, context) {
    // const isThankYou = computed(() => currentStep.value === 'thank-you');

    const shippingAsBilling = ref(false);
    const shippingAddressModal = ref(false);
    const billingAddressModal = ref(false);
    const { toggleSearchVisible, toggleLocationVisible } = useUiState();

    // const billingAddressModal = ref(false);

    const { cart } = useCart();

    const shippingAddress = ref({
      name: '',
      mobile: '',
      building: '',
      landmark: '',
      address: ''
    });

    const billingAddress = ref({
      name: '',
      mobile: '',
      building: '',
      landmark: '',
      address: ''
    });

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
      shippingAddressModal.value = !shippingAddressModal.value;
    };

    const changeShippingAsBilling = () => {
      shippingAsBilling.value = !shippingAsBilling.value;
    };

    const toggleBillingModal = () => {
      billingAddressModal.value = !billingAddressModal.value;
    };

    const goBack = () => context.root.$router.back();

    toggleSearchVisible();
    toggleLocationVisible();

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
      isBillingAddressFilled,
      cart
    };
  }
};
</script>

<style lang="scss" scoped>
.bold {
  font-weight: 600;
}

.sf-checkbox__checkmark:hover{
  --checkbox-border-color: transparent !important;
    border: 0;
}
.sf-input{
  input{
    font-size: 14px;
    &:placeholder{
      font-size: 14px;
    }
  }
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
.checkout-product:first-child{
border-top: 0px solid rgba(0, 0, 0, 0.3);

}
.checkout-product{
  display: flex;
  margin-top: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  padding-bottom: 15px;
  &:first-child(2){
    border-top: 0 !important;
  }
  .s-p-image{
    margin-right: 25px;
  }
  .s-p-name{
    font-size: 11px;
    color: #000;
  }
  .s-p-price{
    font-size: 16px;
    font-family: 'roboto';
    margin-top: 10px;
    color: #F37A20;
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
