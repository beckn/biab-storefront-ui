<template>
  <div id="product">
    <!-- <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    /> -->
    <div class="product">
      <div @click="goBack" class="sf-chevron--left sf-chevron icon_back">
        <span class="sf-chevron__bar sf-chevron__bar--left" />
        <span class="sf-chevron__bar sf-chevron__bar--right" />
      </div>
      <div class="images">
        <LazyHydrate when-visible>
        <ImagesScroll
          :imageWidth="550"
          :imageHeight="400"
          :images="images"
          class="product__gallery"
        />
      </LazyHydrate>
      </div>

      <div class="product__info">
        <div class="product__header">
          <SfHeading
            :title="productGetters.getName(product)"
            :level="3"
            class="sf-heading--no-underline sf-heading--left"
          />
          <!-- <SfIcon
            icon="drag"
            size="xxl"
            color="var(--c-text-disabled)"
            class="product__drag-icon smartphone-only"
          /> -->
        </div>
        <div class="product__price-and-rating">
          <div class="s-p-price">
            ₹ {{ productGetters.getPrice(product).regular }}
          </div>
          <AddToCart :value="null" @updateItemCount="updateCart" />
        </div>
        <div><hr class="sf-divider divider" /></div>

        <LazyHydrate when-idle>
          <SfAccordion class="product__tabs">
            <SfAccordionItem :header="'Product Description'">
              <div class="prouct__description">
                {{ productGetters.getLongDescription(product) }}
              </div>
            </SfAccordionItem>
          </SfAccordion>
        </LazyHydrate>

        <div v-if="cart>0" class="bottom-bar-cart">
        <ul class="list-inline">
            <li>
              <h3>Total</h3>
              <h4>{{productGetters.getPrice(product).regular * cart}} <span>{{cart}} Items</span></h4>
            </li>
            <li class="d-flex b-cart-blk" @click="toggleCartSidebar">
              <SfIcon
                icon="add_to_cart"
                size="sm"
                color="white"
                :coverage="1"
              />
              View Cart
              <SfIcon
                class="mt"
                icon="chevron_right"
                size="20px"
                color="white"
                :coverage="1"
              />
            </li>
          </ul>
        <!-- <div class="cart-checkout">
            <div>
              </div>
            <div class="sf-chevron--right sf-chevron">
              <span class="sf-chevron__bar sf-chevron__bar--left" />
              <span class="sf-chevron__bar sf-chevron__bar--right" />
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  SfProperty,
  SfHeading,
  SfPrice,
  SfRating,
  SfSelect,
  SfAccordion,
  SfIcon,
  SfImage,
  SfBanner,
  SfAlert,
  SfSticky,
  SfReview,
  SfBreadcrumbs,
  SfButton,
  SfColor
} from '@storefront-ui/vue';

import AddToCart from '~/components/AddToCart.vue';
import ImagesScroll from '~/components/ImagesScroll.vue';
import SfAccordionItem from '~/components/Accordion.vue';
// import Footer from '~/components/Footer.vue';
import { useUiState } from '~/composables';
import { ref } from '@vue/composition-api';
import {
  //   useCart,
  productGetters
} from '@vue-storefront/beckn';
import { onSSR } from '@vue-storefront/core';
import MobileStoreBanner from '~/components/MobileStoreBanner.vue';
import LazyHydrate from 'vue-lazy-hydration';
import { onBeforeMount } from '@vue/composition-api';

export default {
  name: 'Product',
  transition: 'fade',

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, context) {
    const { toggleCartSidebar, toggleSearchVisible, toggleLocationVisible } =
      useUiState();

    toggleSearchVisible();
    toggleLocationVisible();
    const data = context.root.$route.query.data;
    const product = JSON.parse(Buffer.from(data, 'base64').toString());
    console.log(product);
    const images = [
      productGetters.getGallery(product)[0].small[0],
      productGetters.getGallery(product)[0].small[0],
      productGetters.getGallery(product)[0].small[0]
    ];
    // toggleLocationVisible()
    // const qty = ref(1);
    // const { id } = context.root.$route.params;
    // const { products, search } = useProduct('products');
    // const { products: relatedProducts, search: searchRelatedProducts, loading: relatedLoading } = useProduct('relatedProducts');
    // const { addItem, loading } = useCart();
    // const { reviews: productReviews, search: searchReviews } = useReview('productReviews');

    // const product = computed(() => productGetters.getFiltered(products.value, { master: true, attributes: context.root.$route.query })[0]);
    // const options = computed(() => productGetters.getAttributes(products.value, ['color', 'size']));
    // const configuration = computed(() => productGetters.getAttributes(product.value, ['color', 'size']));
    // const categories = computed(() => productGetters.getCategoryIds(product.value));
    // const reviews = computed(() => reviewGetters.getItems(productReviews.value));

    // TODO: Breadcrumbs are temporary disabled because productGetters return undefined. We have a mocks in data
    // const breadcrumbs = computed(() => productGetters.getBreadcrumbs ? productGetters.getBreadcrumbs(product.value) : props.fallbackBreadcrumbs);
    // const productGallery = computed(() => productGetters.getGallery(product.value).map(img => ({
    //   mobile: { url: img.small },
    //   desktop: { url: img.normal },
    //   big: { url: img.big },
    //   alt: product.value._name || product.value.name
    // })));
    const goBack = () => context.root.$router.back();

    onSSR(async () => {
      // await search({ id });
      // toggleLocationVisible()
      // await searchRelatedProducts({ catId: [categories.value[0]], limit: 8 });
      // await searchReviews({ productId: id });
    });
    onBeforeMount(async () => {
      // toggleSearchVisible();
      // toggleLocationVisible();
    });

    const cart = ref(0);

    const updateCart = (value) => {
      cart.value = value;
    };

    // const updateFilter = (filter) => {
    //   context.root.$router.push({
    //     path: context.root.$route.path,
    //     query: {
    //       ...configuration.value,
    //       ...filter,
    //     },
    //   });
    // };

    return {
      // updateFilter,
      // configuration,
      // product,
      // reviews,
      // reviewGetters,
      // averageRating: computed(() => productGetters.getAverageRating(product.value)),
      // totalReviews: computed(() => productGetters.getTotalReviews(product.value)),
      // relatedProducts: computed(() => productGetters.getFiltered(relatedProducts.value, { master: true })),
      // relatedLoading,
      // options,
      // qty,
      // addItem,
      // loading,
      images,
      toggleCartSidebar,
      goBack,
      cart,
      updateCart,
      product,
      toggleSearchVisible,
      productGetters,
      toggleLocationVisible
      // productGallery
    };
  },
  components: {
    SfAlert,
    SfColor,
    SfProperty,
    SfHeading,
    SfPrice,
    SfRating,
    SfSelect,
    SfIcon,
    SfImage,
    AddToCart,
    SfBanner,
    SfSticky,
    SfReview,
    SfBreadcrumbs,
    SfButton,
    MobileStoreBanner,
    LazyHydrate,
    SfAccordionItem,
    SfAccordion,
    ImagesScroll
  }
};
</script>

<style lang="scss" scoped>
#product {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
  }
}

.images {
  height: 400px;
  overflow: hidden;
}

.icon_back {
  position: absolute;
  margin: 20px;
  z-index: 2;
  // width:100%;
}

.bottom-bar-cart {
  display: flex;
  justify-content: space-around;
  margin-bottom: 0px;
  box-shadow: 0px -5px 40px rgba(0, 0, 0, 0.15);
  position: fixed;
  bottom: 0;
  z-index: 999;
  width: 100%;
  .cart-checkout {
    background: #f37a20;
  }
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    width: 100%;
    margin: 0;
    li {
      width: 50%;
      padding: 12px 0px 12px 50px;
      display: block;
      background: #fff;
      h3 {
        font-size: 12px;
        font-weight: 600;
        color: #000;
      }
      h4 {
        font-size: 16px;
        color: #f37a20;
        span {
          font-size: 10px;
          color: #8d9091;
          font-weight: 400;
        }
      }
      &.b-cart-blk {
        font-size: 16px;
        color: #fcfcfc;
        background: #f37a20;
        display: flex !important;
        justify-content: space-around;
        padding: 0px 25px !important;
        padding-top: 20px !important;
        .mt {
          margin-top: 4px;
        }
      }
    }
  }
}

.divider {
  width: 90%;
  margin: auto;
}
.s-p-price {
  color: #f37a20;
  font-size: 22px;
}

.product {
  @include for-desktop {
    display: flex;
  }

  &__image {
    img {
      object-fit: contain !important;
    }
  }
  &__info {
    margin: var(--spacer-sm) auto;
    @include for-desktop {
      max-width: 32.625rem;
      margin: 0 0 0 7.5rem;
    }
  }
  &__header {
    --heading-title-color: var(--c-link);
    --heading-title-font-weight: var(--font-weight--bold);
    --heading-padding: 0;
    margin: 0 var(--spacer-sm);
    display: flex;
    justify-content: space-between;
    @include for-desktop {
      --heading-title-font-weight: var(--font-weight--semibold);
      margin: 0 auto;
    }
  }
  &__drag-icon {
    animation: moveicon 1s ease-in-out infinite;
  }
  &__price-and-rating {
    margin: 0 var(--spacer-sm) var(--spacer-base);
    align-items: center;
    display: flex;
    justify-content: space-between;
    @include for-desktop {
      margin: var(--spacer-sm) 0 var(--spacer-lg) 0;
    }
  }
  &__rating {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: var(--spacer-xs) 0 var(--spacer-xs);
  }
  &__count {
    @include font(
      --count-font,
      var(--font-weight--normal),
      var(--font-size--sm),
      1.4,
      var(--font-family--secondary)
    );
    color: var(--c-text);
    text-decoration: none;
    margin: 0 0 0 var(--spacer-xs);
  }
  &__description {
    @include font(
      --product-description-font,
      var(--font-weight--light),
      var(--font-size--base),
      1.6,
      var(--font-family--primary)
    );
  }
  &__select-size {
    margin: 0 var(--spacer-sm);
    @include for-desktop {
      margin: 0;
    }
  }
  &__colors {
    @include font(
      --product-color-font,
      var(--font-weight--normal),
      var(--font-size--lg),
      1.6,
      var(--font-family--secondary)
    );
    display: flex;
    align-items: center;
    margin-top: var(--spacer-xl);
  }
  &__color-label {
    margin: 0 var(--spacer-lg) 0 0;
  }
  &__color {
    margin: 0 var(--spacer-2xs);
  }
  &__add-to-cart {
    margin: var(--spacer-base) var(--spacer-sm) 0;
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }
  &__guide,
  &__compare,
  &__save {
    display: block;
    margin: var(--spacer-xl) 0 var(--spacer-base) auto;
  }
  &__compare {
    margin-top: 0;
  }
  &__tabs {
    --tabs-title-z-index: 0;
    margin: var(--spacer-lg) auto var(--spacer-2xl);
    --tabs-title-font-size: var(--font-size--lg);
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }
  &__property {
    margin: var(--spacer-base) 0;
    &__button {
      --button-font-size: var(--font-size--base);
    }
  }
  &__review {
    padding-bottom: 24px;
    border-bottom: var(--c-light) solid 1px;
    margin-bottom: var(--spacer-base);
  }
  &__additional-info {
    color: var(--c-link);
    @include font(
      --additional-info-font,
      var(--font-weight--light),
      var(--font-size--sm),
      1.6,
      var(--font-family--primary)
    );
    &__title {
      font-weight: var(--font-weight--normal);
      font-size: var(--font-size--base);
      margin: 0 0 var(--spacer-sm);
      &:not(:first-child) {
        margin-top: 3.5rem;
      }
    }
    &__paragraph {
      margin: 0;
    }
  }
  &__gallery {
    flex: 1;
  }
}
.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}
@keyframes moveicon {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 30%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
</style>
