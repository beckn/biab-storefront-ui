<template>
  <div v-if="cart">
    <div class="top-bar">
      <div @click="goBack" class="sf-chevron--left sf-chevron icon_back">
        <span class="sf-search-bar__icon">
          <SfIcon color="var(--c-primary)" size="20px" icon="chevron_left" />
        </span>
      </div>
      <div>Order Details</div>
    </div>

    <div class="sub-heading"></div>
    <div class="details">
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
              v-if="isShippingAddressFilled"
              :name="shippingAddress.name"
              :address="shippingAddress.address"
              :mobile="shippingAddress.mobile"
            />
          </SfAccordionItem>
        </SfAccordion>
      </Card>

      <div class="sub-heading"></div>

      <Card>
        <SfAccordion>
          <SfAccordionItem :header="'Payment'">
            <CardContent class="flex-space-bw">
              <div class="address-text">SubTotal</div>
              <div class="address-text">
                ₹{{ cartGetters.getTotals(cart).total }}
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
            </CardContent>
            <div><hr class="sf-divider divider" /></div>
            <CardContent class="flex-space-bw">
              <div class="address-text bold">Total</div>
              <div class="address-text bold">
                ₹{{ cartGetters.getTotals(cart).total }}
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
              <div class="address-text">#99J787jL</div>
            </CardContent>
            <CardContent class="flex-space-bw">
              <div class="address-text">Placed at</div>
              <div class="address-text">₹0.00</div>
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
import SfAccordionItem from '~/components/Accordion.vue';
import AddressInputs from '~/components/AddressInputs.vue';
import Footer from '~/components/Footer.vue';
import {
  useCart,
  cartGetters,
  providerGetters,
  useAddress,
  useInitOrder
} from '@vue-storefront/beckn';

import { useUiState } from '~/composables';

import { computed, ref, onBeforeMount } from '@vue/composition-api';
import Card from '~/components/Card.vue';
import CardContent from '~/components/CardContent.vue';

import ProductCard from '~/components/ProductCard';
import AddressCard from '~/components/AddressCard';

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
    SfAccordion,
    SfAccordionItem,
    SfIcon,
    AddressCard
  },
  setup(_, context) {
    // const isThankYou = computed(() => currentStep.value === 'thank-you');

    const shippingAsBilling = ref(false);
    const shippingAddressModal = ref(false);
    const billingAddressModal = ref(false);

    // const billingAddressModal = ref(false);

    const { cart, load } = useCart();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { selectedLocation } = useUiState();

    const {
      // polling ,
      pollResults: onInitResult,
      poll: onInitOrder,
      init
    } = useInitOrder();

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

    const proceedToPay = computed(() => {
      console.log(
        isShippingAddressFilled.value &&
          (isBillingAddressFilled.value || shippingAsBilling.value)
      );
      return (
        isShippingAddressFilled.value &&
        (isBillingAddressFilled.value || shippingAsBilling.value)
      );
    });

    const initOrder = async () => {
      const bAddress = shippingAsBilling.value
        ? shippingAddress
        : billingAddress;

      const items = cart.value.items.map((item) => {
        return {
          id: item.id,
          quantity: { count: item.quantity },
          // eslint-disable-next-line camelcase
          bpp_id: cart.value.bpp.id,
          provider: {
            id: cart.value.bppProvider.id,
            locations: [
              './retail.kirana/ind.blr/36@mandi.succinct.in.provider_location'
            ]
          }
        };
      });

      // TODO REMOVE hardcoded values
      const params = {
        context: {
          // eslint-disable-next-line camelcase
          transaction_id: localStorage.getItem('transactionId')
        },
        message: {
          items: items,

          // eslint-disable-next-line camelcase
          billing_info: {
            address: {
              door: bAddress.value.landmark,
              country: 'IND',
              city: '',
              street: bAddress.value.address,

              // eslint-disable-next-line camelcase
              area_code: '560078',
              state: '',
              building: selectedLocation.value.address
            },
            phone: bAddress.value.mobile,
            name: bAddress.value.name,
            email: ''
          },

          // eslint-disable-next-line camelcase
          delivery_info: {
            type: 'home_delivery',
            name: shippingAddress.value.name,
            phone: shippingAddress.value.mobile,
            email: '',
            location: {
              address: {
                door: shippingAddress.value.landmark,
                country: 'IND',
                city: '',
                street: shippingAddress.value.address,

                // eslint-disable-next-line camelcase
                area_code: '560078',
                state: '',
                building: ''
              },
              gps: '12.9063433,77.5856825'
            }
          }
        }
      };
      // debugger;
      const response = await init(params);
      console.log(response);
      await onInitOrder({
        // eslint-disable-next-line camelcase
        messageId: response.context.message_id
      });
      console.log(onInitResult);
    };

    onBeforeMount(async () => {
      await load();
    });

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
      providerGetters,
      isBillingAddressFilled,
      cart,
      proceedToPay,
      initOrder
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
</style>
