<template>
  <div id="product">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <div class="product">
      <LazyHydrate when-idle>
        <!-- <SfGallery :images="productGallery" class="product__gallery" /> -->
        <SfImage
          :src="productGetters.getGallery(product)[0].small[0]"
          alt="product img"
          :width="550"
          :height="350"
        />
      </LazyHydrate>

      <div class="product__info">
        <div class="product__header">
          <SfHeading
            :title="productGetters.getName(product)"
            :level="3"
            class="sf-heading--no-underline sf-heading--left"
          />
          <SfIcon
            icon="drag"
            size="xxl"
            color="var(--c-text-disabled)"
            class="product__drag-icon smartphone-only"
          />
        </div>
        <div class="product__price-and-rating">
          <div class="s-p-price">
            ₹ {{ productGetters.getPrice(product).regular }}
          </div>
          <AddToCart :value="null" @updateItemCount="null" />
          <!-- <SfPrice
            :regular="$n(productGetters.getPrice(product).regular, 'currency')"
            :special="productGetters.getPrice(product).special && $n(productGetters.getPrice(product).special, 'currency')"
          /> -->
          <!-- <div>
            <div class="product__rating">
              <SfRating
                :score="averageRating"
                :max="5"
              />
              <a v-if="!!totalReviews" href="#" class="product__count">
                ({{ totalReviews }})
              </a>
            </div>
            <SfButton class="sf-button--text">{{ $t('Read all reviews') }}</SfButton>
          </div> -->
        </div>
        <div>
          <!-- <p class="product__description">
            {{ description }}
          </p>
          <SfButton class="sf-button--text desktop-only product__guide">
            {{ $t('Size guide') }}
          </SfButton> -->
          <!-- <SfSelect
            v-if="options.size"
            :value="configuration.size"
            @input="size => updateFilter({ size })"
            label="Size"
            class="sf-select--underlined product__select-size"
            :required="true"
          >
            <SfSelectOption
              v-for="size in options.size"
              :key="size.value"
              :value="size.value"
            >
              {{size.label}}
            </SfSelectOption>
          </SfSelect> -->
          <!-- <div v-if="options.color && options.color.length > 1" class="product__colors desktop-only">
            <p class="product__color-label">{{ $t('Color') }}:</p>
            <SfColor
              v-for="(color, i) in options.color"
              :key="i"
              :color="color.value"
              class="product__color"
              @click="updateFilter({color})"
            />
          </div>
          <SfAddToCart
            v-e2e="'product_add-to-cart'"
            :stock="stock"
            v-model="qty"
            :disabled="loading"
            :canAddToCart="stock > 0"
            class="product__add-to-cart"
            @click="addItem({ product, quantity: parseInt(qty) })"
          /> -->
        </div>

        <LazyHydrate when-idle>
          <SfTabs :open-tab="1" class="product__tabs">
            <SfTab title="Description">
              <div class="product__description">
                {{ description }}
              </div>
              <!-- <SfProperty
                v-for="(property, i) in properties"
                :key="i"
                :name="property.name"
                :value="property.value"
                class="product__property"
              >
                <template v-if="property.name === 'Category'" #value>
                  <SfButton class="product__property__button sf-button--text">
                    {{ property.value }}
                  </SfButton>
                </template>
              </SfProperty>-->
            </SfTab>
            <!-- <SfTab title="Read reviews">
              <SfReview
                v-for="review in reviews"
                :key="reviewGetters.getReviewId(review)"
                :author="reviewGetters.getReviewAuthor(review)"
                :date="reviewGetters.getReviewDate(review)"
                :message="reviewGetters.getReviewMessage(review)"
                :max-rating="5"
                :rating="reviewGetters.getReviewRating(review)"
                :char-limit="250"
                read-more-text="Read more"
                hide-full-text="Read less"
                class="product__review"
              />
            </SfTab>
            <SfTab
              title="Additional Information"
              class="product__additional-info"
            >
            <div class="product__additional-info">
              <p class="product__additional-info__title">{{ $t('Brand') }}</p>
              <p>{{ brand }}</p>
              <p class="product__additional-info__title">{{ $t('Instruction1') }}</p>
              <p class="product__additional-info__paragraph">
                {{ $t('Instruction2') }}
              </p>
              <p class="product__additional-info__paragraph">
                {{ $t('Instruction3') }}
              </p>
              <p>{{ careInstructions }}</p>
            </div>
            </SfTab>-->
          </SfTabs>
        </LazyHydrate>
        <div class="bottom-bar-cart">
          <div>Total</div>
          <div class="cart-checkout">
            <svg
              width="26"
              height="25"
              viewBox="0 0 26 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.27824 21.7754C7.80574 21.7754 8.23449 22.2041 8.23449 22.7316C8.23449 23.2591 7.80574 23.6866 7.27824 23.6866C6.75074 23.6866 6.32324 23.2591 6.32324 22.7316C6.32324 22.2041 6.75074 21.7754 7.27824 21.7754Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M21.3435 21.7754C21.871 21.7754 22.2997 22.2041 22.2997 22.7316C22.2997 23.2591 21.871 23.6866 21.3435 23.6866C20.816 23.6866 20.3872 23.2591 20.3872 22.7316C20.3872 22.2041 20.816 21.7754 21.3435 21.7754Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.4375 1.0625L4.0375 1.5125L5.24125 15.8538C5.33875 17.0225 6.315 17.92 7.4875 17.92H21.1275C22.2475 17.92 23.1975 17.0975 23.3588 15.9875L24.545 7.79C24.6913 6.77875 23.9075 5.87375 22.8863 5.87375H4.455"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.6567 10.4938H19.123"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div>View Cart</div>
            <div class="sf-chevron--right sf-chevron">
              <span class="sf-chevron__bar sf-chevron__bar--left" />
              <span class="sf-chevron__bar sf-chevron__bar--right" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <LazyHydrate when-visible>
      <RelatedProducts
        :products="relatedProducts"
        :loading="relatedLoading"
        title="Match it with"
      />
    </LazyHydrate>

    <LazyHydrate when-visible>
      <InstagramFeed />
    </LazyHydrate>

    <LazyHydrate when-visible>
      <MobileStoreBanner />
    </LazyHydrate> -->
  </div>
</template>
<script>
import {
  SfProperty,
  SfHeading,
  SfPrice,
  SfRating,
  SfSelect,
  SfAddToCart,
  SfTabs,
  SfGallery,
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

import InstagramFeed from '~/components/InstagramFeed.vue';
import RelatedProducts from '~/components/RelatedProducts.vue';
import AddToCart from '~/components/AddToCart.vue';
// import { ref, computed } from '@vue/composition-api';
import {
//   useCart,
  productGetters
} from '@vue-storefront/beckn';
import { onSSR } from '@vue-storefront/core';
import MobileStoreBanner from '~/components/MobileStoreBanner.vue';
import LazyHydrate from 'vue-lazy-hydration';

export default {
  name: 'Product',
  transition: 'fade',

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup() {
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

    onSSR(async () => {
      // await search({ id });
      // await searchRelatedProducts({ catId: [categories.value[0]], limit: 8 });
      // await searchReviews({ productId: id });
    });

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
      productGetters
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
    SfAddToCart,
    SfTabs,
    SfGallery,
    SfIcon,
    SfImage,
    AddToCart,
    SfBanner,
    SfSticky,
    SfReview,
    SfBreadcrumbs,
    SfButton,
    InstagramFeed,
    RelatedProducts,
    MobileStoreBanner,
    LazyHydrate
  },
  data() {
    const product = JSON.parse(`{
  "descriptor": {
    "images": [
      "https://i.ibb.co/rZqPDd2/Coffee-2-Cothas.jpg"
    ],
    "name": "Cothas Coffee 1 kg"
  },
  "id": "cothas-coffee-1-kg",
  "matched": true,
  "price": {
    "currency": "INR",
    "value": "250"
  },
  "recommended": true
}`);
    return {
      stock: 5,
      product,
      properties: [
        {
          name: 'Product Code',
          value: '578902-00'
        },
        {
          name: 'Category',
          value: 'Pants'
        },
        {
          name: 'Material',
          value: 'Cotton'
        },
        {
          name: 'Country',
          value: 'Germany'
        }
      ],
      description:
        'Find stunning women cocktail and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.',
      detailsIsActive: false,
      brand:
        'Brand name is the perfect pairing of quality and design. This label creates major everyday vibes with its collection of modern brooches, silver and gold jewellery, or clips it back with hair accessories in geo styles.',
      careInstructions: 'Do not wash!',
      breadcrumbs: [
        {
          text: 'Home',
          route: {
            link: '#'
          }
        },
        {
          text: 'Category',
          route: {
            link: '#'
          }
        },
        {
          text: 'Pants',
          route: {
            link: '#'
          }
        }
      ]
    };
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

.bottom-bar-cart {
  display: flex;
  justify-content: space-around;
  margin-bottom: 0px;
  .cart-checkout {
    background: #f37a20;
  }
}
.product {
  @include for-desktop {
    display: flex;
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
