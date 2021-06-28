<template>
  <div>
    <SfMegaMenu
      :visible="isSearchOpen"
      :title="$t('Search results')"
      class="search"
    >
      <transition-group name="sf-fade" mode="out-in">
        <div v-if="providers && providers.length > 0" class="search__wrapper-results" key="results">
          <div class="h-padding result-num">
            <span><span v-e2e="'total-result'">{{ providers.length }}</span> results found</span>
          </div>
          <div v-for="(provider, index) in providers" :key="index" >
            <div class="provider-head flexy-center h-padding">
              <div class="flexy">
                <SfImage
                  class="back"
                  src="/icons/google.svg"
                  alt="Vila stripe maxi shirt dress"
                  :width="35"
                  :height="35"
                />
                <div class="text-padding">
                  <div class="flexy-center">
                    <div class="p-name">{{provider.name}}</div>
                    <div class="text-padding"> <span class="p-distance">by</span>  <span>{{provider.by}}</span></div>
                  </div>
                  <div class="p-distance">{{provider.distance}} km</div>
                </div>
              </div>
              <div class="exp-provider">Explore All</div>
            </div>
            <div class="results--mobile">
              <ProductCard
                v-for="(product, index) in provider.products"
                :key="index"
                :pName="productGetters.getName(product)"
                :pPrice="$n(productGetters.getPrice(product).regular, 'currency')"
                :pImage="productGetters.getCoverImage(product)"
                :pWieght="'8.5 kg'"
              />
            </div>
          </div>
          <div class="action-buttons smartphone-only">
            <SfButton class="action-buttons__button color-light" @click="$emit('close')">{{ $t('Cancel') }}</SfButton>
          </div>
        </div>
        <div v-if="noSearchFound" class="before-results">
          <SfImage src="/icons/feather_search.svg" class="" alt="error" loading="lazy"/>
          <p ><b>{{ $t('Your search did not yield ') }}</b></p>
          <p ><b>{{ $t('any results ') }}</b></p>
          <p >{{ $t('Please try searching again using ') }}</p>
          <p >{{ $t('different keyword') }}</p>
        </div>
        <div v-else key="no-results" class="before-results">
          <SfImage src="/error/error.svg" class="before-results__picture" alt="error" loading="lazy"/>
          <p class="before-results__paragraph">{{ $t('You haven’t searched for items yet') }}</p>
          <p class="before-results__paragraph">{{ $t('Let’s start now – we’ll help you') }}</p>
          <!-- <SfButton class="before-results__button color-secondary smartphone-only" @click="$emit('close')">{{ $t('Go back') }}</SfButton> -->
        </div>
      </transition-group>
    </SfMegaMenu>
  </div>
</template>
<script>
import {
  SfMegaMenu,
  SfList,
  SfBanner,
  SfProductCard,
  SfScrollable,
  SfMenuItem,
  SfButton,
  SfImage
} from '@storefront-ui/vue';
import { ref, watch, computed } from '@vue/composition-api';
import { productGetters } from '@vue-storefront/beckn';
import ProductCard from './ProductCard';

export default {
  name: 'SearchResults',
  components: {
    SfMegaMenu,
    SfList,
    SfBanner,
    SfProductCard,
    SfScrollable,
    SfMenuItem,
    SfButton,
    SfImage,
    ProductCard
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    result: {
      type: Object
    },
    noSearchFound: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const isSearchOpen = ref(props.visible);
    const providers = computed(() => props.result?.providers);
    const categories = computed(() => props.result?.categories);

    watch(() => props.visible, (newVal) => {
      isSearchOpen.value = newVal;
      if (isSearchOpen.value) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
        emit('removeSearchResults');
      }
    });

    return {
      isSearchOpen,
      productGetters,
      providers,
      categories
    };
  }
};
</script>
<style lang="scss" scoped>
.flexy{
  display: flex;
}
.flexy-center{
  display: flex;
  align-items: center;
}
.result-num{
  font-size: 12px;
  font-weight: 400;
  padding-bottom: 10px;
}
.provider-head{
  display: flex;
  justify-content: space-between;
  .p-name{
    font-size: 19px;
    font-weight: 600;
  }

  .p-distance{
    font-size: 12px;
    font-weight: 400;
    color: #8D9091;
  }
}
.h-padding{
  padding-left: var(--spacer-sm);
  padding-right: var(--spacer-sm);
}
.text-padding{
  padding-left: 10px;
}
.back{
  background-color: #d2d2d2;
}
.exp-provider{
  color: #5ECE7B;
  font-size: 12px;
  font-weight: 600;

}
.search {
  position: absolute;
  right: 0;
  left: 0;
  z-index: 3;
  --mega-menu-column-header-margin: var(--spacer-sm) 0 var(--spacer-xl);
  --mega-menu-content-padding: 0;
  --mega-menu-height: auto;
  @include for-desktop {
    --mega-menu-content-padding: var(--spacer-xl) 0;
  }
  &__wrapper-results {
    display: flex;
    flex-direction: column;
    width: 100%;
    @include for-desktop {
      flex-direction: row;
      flex: 1;
    }
  }
  &__categories {
    flex: 0 0 220px;
  }
  &__results {
    flex: 1
  }
  &__header {
    margin-left: var(--spacer-sm);
  }
  ::v-deep .sf-bar {
    display: none;
  }
  ::v-deep .sf-mega-menu-column__header {
    display: none;
    @include for-desktop {
      display: flex;
    }
  }
}
.results {
  &--mobile {
    display: flex;
    // flex-wrap: wrap;
    // justify-content: space-around;
    background: var(--c-white);
    padding: var(--spacer-base) var(--spacer-sm);
    // --product-card-max-width: 9rem ;
    overflow-y: scroll;
  }
}
.see-all {
  padding: var(--spacer-xl) 0 0 var(--spacer-sm);
}
.action-buttons {
  padding: var(--spacer-xl) var(--spacer-sm) var(--spacer-3xl);
  background: var(--c-white);
  width: 100%;
  &__button {
    width: calc(100% - 32px);
  }
}
.results-listing {
  display: flex;
  flex-wrap: wrap;
  margin-left: var(--spacer-2xs);
}
.result-card {
  margin: var(--spacer-sm) 0;
  @include for-desktop {
    margin: var(--spacer-2xs) 0;
  }
}

.before-results {
  box-sizing: border-box;
  padding: var(--spacer-base) var(--spacer-sm) var(--spacer-2xl);
  width: 100%;
  text-align: center;
  @include for-desktop {
    padding: 0;
  }
  &__picture {
    --image-width: 230px;
    margin-top: var(--spacer-2xl);
    @include for-desktop {
      --image-width: 18.75rem;
      margin-top: var(--spacer-base);
    }
  }
  &__paragraph {
    font-family: var(--font-family--primary);
    font-weight: var(--font-weight--normal);
    font-size: var(--font-size--base);
    color: var(--c-text-muted);
    margin: 0;
    @include for-desktop {
      font-size: var(--font-size--lg);
    }
    &:first-of-type {
      margin: var(--spacer-xl) auto var(--spacer-xs);
    }
  }
  &__button {
    margin: var(--spacer-xl) auto;
    width: 100%;
  }
}
</style>
