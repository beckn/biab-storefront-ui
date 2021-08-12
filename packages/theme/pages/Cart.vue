<template>
  <div id="cart">
    <div class="top-bar">
      <div @click="goBack" class="sf-chevron--left sf-chevron icon_back">
        <span class="sf-search-bar__icon">
          <SfIcon color="var(--c-primary)" size="20px" icon="chevron_left" />
        </span>
      </div>
      <div class="header-push">Cart</div>
    </div>
    <div v-if="enableLoader" key="loadingCircle" class="loader-circle">
      <LoadingCircle :enable="enableLoader" />
    </div>
    <div v-if="cartGetters.getTotalItems(cart)" class="provider-head">
      <div class="provide-img">
        <img
          :src="
            cartGetters.getProviderImage(cart.bppProvider)
              ? cartGetters.getProviderImage(cart.bppProvider)
              : require('~/assets/images/store-placeholder.png')
          "
        />
      </div>
      <div class="p-name">{{ cart.bppProvider.descriptor.name }}</div>
      <div class="text-padding">
        <span class="p-distance"> by </span> {{ cart.bpp.descriptor.name }}
      </div>
    </div>
    <div>
      <div v-if="errOutOfStock" class="cart-error-msg">
        <img src="../assets/images/bx_bx-error.png" alt="" />
        <p>
          Some items are currently available. Please remove these items and
          proceed to checkout.
        </p>
      </div>
      <div v-if="errUpdateCount" class="cart-warning-msg">
        <img src="../assets/images/bx_bx-error-circle.png" alt="" />
        <p>
          Oops, required quantity not available! Update items with available
          quantity and proceed? <br /><span @click="updateAll"
            ><a>Yes, update all</a></span
          >
        </p>
      </div>
      <div v-if="errPricechange" class="cart-warning-msg">
        <img src="../assets/images/bx_bx-error-circle.png" alt="" />
        <p>
          Prices of some of the items in your cart have changed.Please verify
          and proceed.
        </p>
      </div>
    </div>
    <transition name="sf-fade" mode="out-in">
      <div
        v-if="cartGetters.getTotalItems(cart)"
        key="my-cart"
        class="my-cart"
      >
        <div class="collected-product-list">
          <transition-group name="sf-fade" tag="div">
            <ProductCard
              name="product-card"
              class="product-card"
              v-for="(product, index) in cartGetters.getItems(cart)"
              :key="index + 'new'"
              :pName="cartGetters.getItemName(product)"
              :pPrice="cartGetters.getItemPrice(product).regular"
              :pImage="cartGetters.getItemImage(product)"
              :pCount="cartGetters.getItemQty(product)"
              :updatedPrice="cartGetters.getUpdatedPrice(product)"
              :updatedCount="cartGetters.getUpdatedCount(product)"
              :horizontalView="false"
              :deleteCard="true"
              :dropdownCouner="true"
              @updateItemCount="(item) => updateItemCount(item, index)"
              @deleteItem="updateItemCount(0, index)"
              @dropdownMore="toggleModal(index)"
            />
          </transition-group>
        </div>
      </div>
      <div v-else key="empty-cart" class="empty-cart">
        <div class="empty-cart__banner">
          <SfImage
            alt="Empty bag"
            class="empty-cart__image"
            src="/icons/empty-cart.svg"
          />
          <SfHeading
            title="Your cart is empty"
            :level="2"
            class="empty-cart__heading"
            description="Looks like you haven’t added any items to the bag yet. Start
            shopping to fill it in."
          />
        </div>
      </div>
    </transition>
    <div class="c-footer" v-if="cartGetters.getTotalItems(cart)">
      <Footer
        @buttonClick="footerClick"
        :totalPrice="cartGetters.getTotals(cart).total"
        :totalItem="cartGetters.getTotalItems(cart)"
        :buttonEnable="!errOutOfStock && !errUpdateCount && !enableLoader"
        buttonText="checkout"
      >
        <template v-slot:buttonIcon>
          <SfIcon icon="empty_cart" color="white" :coverage="1" />
        </template>
      </Footer>
    </div>
    <ModalSlide :visible="openModal" @close="toggleModal">
      <div class="modal-heading">Cart Quantity</div>
      <div><hr class="sf-divider" /></div>
      <div class="modal-body">
        <div class="inputs-container">
          <SfInput
            v-model="itemNumber"
            type="number"
            label="Enter Quantity"
            name="locality"
            @change="() => {}"
          />
        </div>
        <SfButton
          class="add-quantity"
          aria-label="Close modal"
          type="button"
          @click="addQuantity"
          style="width: 100%"
          >Add quantity</SfButton
        >
      </div>
    </ModalSlide>
  </div>
</template>
<script>
import {
  SfSidebar,
  SfHeading,
  SfButton,
  SfIcon,
  SfProperty,
  SfPrice,
  SfCollectedProduct,
  SfImage,
  SfInput
} from '@storefront-ui/vue';
import { useCart, cartGetters, useQuote } from '@vue-storefront/beckn';
import ProductCard from '~/components/ProductCard';
import Footer from '~/components/Footer';
import ModalSlide from '~/components/ModalSlide';
import { ref, onBeforeMount, watch } from '@vue/composition-api';
import { useUiState } from '~/composables';
import LoadingCircle from '~/components/LoadingCircle';

export default {
  name: 'Cart',
  components: {
    SfSidebar,
    SfButton,
    SfHeading,
    SfIcon,
    SfProperty,
    SfPrice,
    SfCollectedProduct,
    SfImage,
    ProductCard,
    Footer,
    ModalSlide,
    SfInput,
    LoadingCircle
  },
  setup(_, { root }) {
    const { cart, addItem, load, setCart } = useCart();
    const { init, poll, pollResults, stopPolling } = useQuote();
    const openModal = ref(false);
    const modelOpenIndex = ref(-1);
    const itemNumber = ref(null);
    const { toggleSearchVisible } = useUiState();

    const errOutOfStock = ref(false);
    const errUpdateCount = ref(false);
    const errPricechange = ref(false);
    const enableLoader = ref(true);

    toggleSearchVisible(false);

    const matchQuote = async () => {
      if (cart.value.totalItems > 0 && localStorage.getItem('transactionId')) {
        enableLoader.value = true;
        const transactionId = localStorage.getItem('transactionId');
        const cartItems = await cart.value.items.map((item) => {
          return {
            id: item.id,
            quantity: { count: item.quantity },
            // eslint-disable-next-line camelcase
            bpp_id: cart.value.bpp.id,
            provider: {
              id: cart.value.bppProvider.id,
              locations: [item.location_id]
            }
          };
        });

        const cartData = await init({
          // eslint-disable-next-line camelcase
          context: { transaction_id: transactionId },
          message: { cart: { items: cartItems } }
        });

        watch(
          () => pollResults.value,
          (newValue) => {
            if (newValue?.error) {
              throw 'api fail';
            }
            if (newValue?.message?.quote) {
              stopPolling();
              const updatedCartData = cart.value.items.map((cartItem) => {
                if (cartItem.updatedCount) cartItem.updatedCount = null;
                if (cartItem.updatedPrice) cartItem.updatedPrice = null;
                const quoteItem = newValue.message.quote?.items.filter(
                  (quoteItem) => quoteItem.id === cartItem.id
                )[0];
                const singleItemValue =
                  quoteItem.price.value / quoteItem.quantity.selected.count;
                console.log(
                  'price',
                  parseFloat(cartItem.price.value),
                  parseFloat(singleItemValue)
                );
                if (
                  parseFloat(cartItem.price.value) !==
                  parseFloat(singleItemValue)
                ) {
                  cartItem.updatedPrice = singleItemValue;
                  errPricechange.value = true;
                }
                if (cartItem.quantity !== quoteItem.quantity.selected.count) {
                  cartItem.updatedCount = quoteItem.quantity.selected.count;
                  if (quoteItem.quantity.selected.count === 0)
                    errOutOfStock.value = true;
                  else errUpdateCount.value = true;
                }
                return cartItem;
              });
              cart.value.items = updatedCartData;
              cart.value.quote = newValue?.message?.quote.quote;
              setCart(cart.value);
              enableLoader.value = false;
              console.log('cart', cart);
            }
          }
        );
        if (cartData?.context?.message_id) {
          await poll({ messageId: cartData.context.message_id });
        }
      } else {
        enableLoader.value = false;
      }
    };

    const updateItemCount = (data, index, matchQ = true) => {
      console.log(data, index);
      addItem({
        product: cart.value.items[index],
        quantity: data,
        customQuery: {
          bpp: cart.value.bpp,
          bppProvider: cart.value.bppProvider,
          locations: cart.value.locations
        }
      });
      if (matchQ) matchQuote();
    };

    const footerClick = () => {
      root.$router.push('/checkout');
    };

    const toggleModal = (index = -1) => {
      modelOpenIndex.value = index;
      openModal.value = !openModal.value;
    };

    const addQuantity = () => {
      updateItemCount(Number(itemNumber.value), modelOpenIndex.value);
      toggleModal();
    };

    const goBack = () => {
      root.$router.back();
      toggleSearchVisible(true);
    };

    const updateAll = () => {
      for (let i = 0; i < cart.value.items.length; i++) {
        console.log(cart.value.items[i].quantity);
        if (
          Boolean(cart.value.items[i]?.updatedCount) &&
          cart.value.items[i].updatedCount !== cart.value.items[i].quantity
        ) {
          updateItemCount(cart.value.items[i].updatedCount, i, false);
        }
      }
      errUpdateCount.value = false;
      matchQuote();
    };

    onBeforeMount(async () => {
      await load();
      await matchQuote();
    });

    return {
      cartGetters,
      cart,
      openModal,
      itemNumber,
      updateItemCount,
      footerClick,
      toggleModal,
      addQuantity,
      goBack,
      errOutOfStock,
      errUpdateCount,
      errPricechange,
      enableLoader,
      updateAll
    };
  }
};
</script>

<style lang="scss" scoped>
.sf-sidebar__aside{
  top: 45px;
}
.sf-bar {
  padding: 0px 10px;
}
.sf-icon {
  width: 20px;
  height: 20px;
}
#cart {
  // margin-top: 45px;
  --sidebar-z-index: 3;
  --overlay-z-index: 3;
  @include for-desktop {
    & > * {
      --sidebar-bottom-padding: var(--spacer-base);
      --sidebar-content-padding: var(--spacer-base);
    }
  }
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
  .icon_back {
    position: absolute;
    left: 0;
    margin: 10px;
  }
}

.loader-circle {
  width: 100%;
  position: fixed;
  z-index: 1;
  top: 110px;
  left: 0;
  height: calc(100vh - 170px);
}

.modal-heading {
  margin: 20px;
  font-size: 20px;
  font-weight: 500;
}

.modal-body {
  padding: 28px;
}

.inputs-container {
  margin-bottom: 28px;
}

.sf-sidebar__content {
  padding: 0 !important;
}

.c-footer {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
}

.product-card {
  margin-bottom: 10px;
}
.cart-summary {
  margin-top: var(--spacer-xl);
}
.my-cart {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  height: calc(100vh - 235px);
  overflow: scroll;
  &__total-items {
    margin: 0;
  }
  &__total-price {
    --price-font-size: var(--font-size--xl);
    --price-font-weight: var(--font-weight--medium);
    margin: 0 0 var(--spacer-base) 0;
  }
}
.empty-cart {
  --heading-description-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-color: var(--c-primary);
  --heading-title-font-weight: var(--font-weight--semibold);
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  &__banner {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex: 1;
  }
  &__heading {
    padding: 0 var(--spacer-base);
  }
  &__image {
    --image-width: 16rem;
    margin: 0 0 var(--spacer-2xl) 7.5rem;
  }
  @include for-desktop {
    --heading-title-font-size: var(--font-size--xl);
    --heading-title-margin: 0 0 var(--spacer-sm) 0;
  }
}
.collected-product-list {
  flex: 1;
}
.collected-product {
  margin: 0 0 var(--spacer-sm) 0;
  &__properties {
    margin: var(--spacer-xs) 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    flex: 2;
    &:first-child {
      margin-bottom: 8px;
    }
  }
  &__actions {
    transition: opacity 150ms ease-in-out;
  }
  &__save,
  &__compare {
    --button-padding: 0;
    &:focus {
      --cp-save-opacity: 1;
      --cp-compare-opacity: 1;
    }
  }
  &__save {
    opacity: var(--cp-save-opacity, 0);
  }
  &__compare {
    opacity: var(--cp-compare-opacity, 0);
  }
  &:hover {
    --cp-save-opacity: 1;
    --cp-compare-opacity: 1;
    @include for-desktop {
      .collected-product__properties {
        display: none;
      }
    }
  }
}
</style>

