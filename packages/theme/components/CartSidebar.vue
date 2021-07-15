<template>
  <div id="cart">
    <SfSidebar
      v-e2e="'sidebar-cart'"
      :visible="isCartSidebarOpen"
      title="Cart"
      class="sf-sidebar--right"
      @close="toggleCartSidebar"
    >
      <template #content-top>
        <div></div>
      </template>
      <transition name="sf-fade" mode="out-in">
        <div v-if="totalItems" key="my-cart" class="my-cart">
          <div class="collected-product-list">
            <transition-group name="sf-fade" tag="div">
              <ProductCard
                name="product-card"
                class="product-card"
                v-for="(product, index) in products"
                :key="index + 'new'"
                :pName="cartGetters.getItemName(product.item)"
                :pPrice="cartGetters.getItemPrice(product.item).regular"
                :pImage="cartGetters.getItemImage(product.item)"
                :pCount="cartGetters.getItemQty(product.item)"
                :horizontalView="false"
                :deleteCard="true"
                :dropdownCouner="true"
                @updateItemCount="(item) => updateItemCount(item, index)"
                @deleteItem="updateItemCount(0, index)"
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
      <Footer
        @buttonClick="footerClick"
        :totalPrice="totals.total"
        :totalItem="totalItems"
        buttonText="checkout"
      >
        <template v-slot:buttonIcon>
          <SfIcon icon="empty_cart" color="white" :coverage="1" />
        </template>
      </Footer>
    </SfSidebar>
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
  SfImage
} from '@storefront-ui/vue';
import { ref, watch } from '@vue/composition-api';
import { useCart, cartGetters } from '@vue-storefront/beckn';
import { useUiState } from '~/composables';
import ProductCard from './ProductCard';
import Footer from './Footer';

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
    Footer
  },
  setup() {
    const { isCartSidebarOpen, toggleCartSidebar } = useUiState();
    const { loadCart, addItem } = useCart();
    const products = ref([]);
    const totals = ref(cartGetters.getTotals(products));
    const totalItems = ref(cartGetters.getTotalItems(products));
    console.log(products.value);
    console.log(totalItems);

    const geItemPrice = () => {
      totals.value = cartGetters.getTotals(products);
      totalItems.value = cartGetters.getTotalItems(products);
    };

    watch(
      () => isCartSidebarOpen.value,
      (newVal) => {
        if (newVal) {
          loadCart().then((cartData) => {
            console.log(cartData);
            products.value = cartData;
            geItemPrice();
            console.log(products);
          });
        }
      }
    );

    const updateItemCount = (data, index) => {
      console.log(data, index);
      products.value[index].item.quantity = data;
      products.value = addItem(products.value[index]);
      console.log(products);
      geItemPrice();
    };

    const footerClick = () => {
      console.log('click');
    };

    return {
      products,
      isCartSidebarOpen,
      toggleCartSidebar,
      totals,
      totalItems,
      cartGetters,
      updateItemCount,
      footerClick
    };
  }
};
</script>

<style lang="scss" scoped>
#cart {
  --sidebar-z-index: 3;
  --overlay-z-index: 3;
  @include for-desktop {
    & > * {
      --sidebar-bottom-padding: var(--spacer-base);
      --sidebar-content-padding: var(--spacer-base);
    }
  }
}

.sf-sidebar__content {
  padding: 0 !important;
}

.product-card {
  margin-top: 10px;
}
.cart-summary {
  margin-top: var(--spacer-xl);
}
.my-cart {
  flex: 1;
  display: flex;
  flex-direction: column;
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
