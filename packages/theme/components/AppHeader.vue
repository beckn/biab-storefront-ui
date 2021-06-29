<style lang="scss">
@import '../assets/styles.scss';
</style>

<template>
  <div class="header-container">
    <div class="header h-padding">
      <nuxt-link :to="localePath('/')" >
        <SfImage src="/icons/beckn-logo.svg" :width="63" :height="20" alt="Vue Storefront Next" class=""/>
      </nuxt-link>
      <SfIcon icon="more" color="green-primary" />
    </div>
    <div class="location-btn h-padding flexy">
      <div v-if="isSearchOpen" class="icon-padding center-pos" @click="closeSearch">
        <SfIcon color="var(--c-text)" size="20px" icon="chevron_left" />
      </div>
      <Location @locationSelected="locationSelected" class="location-section" v-e2e="'app-header-location'" />
    </div>
    <div
      class="sf-header--has-mobile-search"
      :class="{'header-on-top h-padding': isSearchOpen}"
    >
      <div class="search-bar">
        <SfSearchBar
          ref="searchBarRef"
          :placeholder="$t('Search for items E.g. atta, milk')"
          aria-label="Search"
          class="sf-header__search be-search-location"
          :value="term"
          @input="handleSearch"
          @keydown.enter="handleSearch($event)"
          @focus="isSearchOpen = true"
          @keydown.esc="closeSearch"
          v-e2e="'app-header-search-box'"
        >
          <template #icon>
            <SfButton
              v-if="!!term"
              class="sf-search-bar__button sf-button--pure"
              @click="clearSearch"
            >
              <span class="sf-search-bar__icon">
                <SfIcon color="var(--c-text)" size="18px" icon="cross" />
              </span>
            </SfButton>
            <SfButton
              v-else
              class="sf-search-bar__button sf-button--pure"
              @click="isSearchOpen ? isSearchOpen = false : isSearchOpen = true"
            >
              <span class="sf-search-bar__icon">
                <SfIcon color="var(--c-text)" size="20px" icon="search" />
              </span>
            </SfButton>
          </template>
        </SfSearchBar>
      </div>
    </div>
    <SearchResults :visible="isSearchOpen" :result="result" :noSearchFound="false" @close="closeSearch" @removeSearchResults="removeSearchResults" />
    <!-- <SfOverlay :visible="isSearchOpen" /> -->
  </div>
</template>

<script>
import {
  SfHeader,
  SfImage,
  SfIcon,
  SfButton,
  SfBadge,
  SfSearchBar,
  SfOverlay,
  SfMenuItem,
  SfLink,
  SfBottomModal,
  SfCircleIcon
} from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import { useCart, useWishlist, useUser, cartGetters, useFacet, useOnSearch } from '@vue-storefront/beckn';
import { computed, ref, onBeforeUnmount, watch } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useUiHelpers } from '~/composables';
import LocaleSelector from './LocaleSelector';
import Location from './Location';
import SearchResults from '~/components/SearchResults';
import { clickOutside } from '@storefront-ui/vue/src/utilities/directives/click-outside/click-outside-directive.js';
import {
  mapMobileObserver,
  unMapMobileObserver
} from '@storefront-ui/vue/src/utilities/mobile-observer.js';
import debounce from 'lodash.debounce';

export default {
  components: {
    SfHeader,
    SfImage,
    LocaleSelector,
    SfIcon,
    SfButton,
    SfBadge,
    SfSearchBar,
    SearchResults,
    SfOverlay,
    SfMenuItem,
    SfLink,
    SfBottomModal,
    SfCircleIcon,
    Location
  },
  directives: { clickOutside },
  data() {
    return {
      location: {}
    };
  },
  methods: {
    locationSelected(latitude, longitude, address) {
      this.location = {latitude: latitude, longitude: longitude, address: address};
    }
  },
  setup(props, { root }) {
    const {
      toggleCartSidebar,
      toggleWishlistSidebar,
      toggleLoginModal
    } = useUiState();
    const { setTermForUrl, getFacetsFromURL } = useUiHelpers();
    const { isAuthenticated, load: loadUser } = useUser();
    const { cart, load: loadCart } = useCart();
    const { result: facetResults, search } = useFacet();
    const { pollResults, poll } = useOnSearch();
    const { load: loadWishlist } = useWishlist();
    const term = ref(getFacetsFromURL().phrase);
    const isSearchOpen = ref(false);
    const searchBarRef = ref(null);
    const result = ref(null);

    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      return count ? count.toString() : null;
    });

    const accountIcon = computed(
      () => (isAuthenticated.value ? 'profile_fill' : 'profile')
    );

    // TODO: https://github.com/DivanteLtd/vue-storefront/issues/4927
    const handleAccountClick = async () => {
      if (isAuthenticated.value) {
        return root.$router.push('/my-account');
      }

      toggleLoginModal();
    };

    onSSR(async () => {
      await loadUser();
      await loadCart();
      await loadWishlist();
    });

    const closeSearch = () => {
      if (!isSearchOpen.value) return;

      term.value = '';
      isSearchOpen.value = false;
    };

    const handleSearch = debounce(async (paramValue) => {
      if (!paramValue.target) {
        // term.value = paramValue;
      } else {
        term.value = paramValue.target.value;
        await search({ term: term.value });
        // alert('Response for message id: ' + facetResults.value.data.ackResponse.context.message_id + ' ::: ' + facetResults.value.data.ackResponse.message.ack.status);
        await poll(facetResults.value.data.ackResponse.context.message_id);
        console.log('POLL', pollResults);
        result.value = pollResults;
        console.log('result value', result.value);
      }

    }, 1000);

    const isMobile = computed(() => mapMobileObserver().isMobile.get());

    const closeOrFocusSearchBar = () => {
      if (isMobile.value) {
        return closeSearch();
      } else {
        term.value = '';
        return searchBarRef.value.$el.children[0].focus();
      }
    };

    const clearSearch = () => {
      term.value = '';
    };

    watch(() => term.value, (newVal, oldVal) => {
      const shouldSearchBeOpened = (!isMobile.value && term.value.length > 0) && ((!oldVal && newVal) || (newVal.length !== oldVal.length && isSearchOpen.value === false));
      if (shouldSearchBeOpened) {
        isSearchOpen.value = true;
      }
    });

    const removeSearchResults = () => {
      result.value = null;
    };

    onBeforeUnmount(() => {
      unMapMobileObserver();
    });

    return {
      accountIcon,
      cartTotalItems,
      handleAccountClick,
      toggleCartSidebar,
      toggleWishlistSidebar,
      setTermForUrl,
      term,
      isSearchOpen,
      closeSearch,
      handleSearch,
      result,
      closeOrFocusSearchBar,
      searchBarRef,
      isMobile,
      removeSearchResults,
      clearSearch
    };
  }
};
</script>

<style lang="scss" scoped>
.sf-header {
  --header-padding: var(--spacer-sm);
  @include for-desktop {
    --header-padding: 0;
  }
  &__logo-image {
    height: 100%;
  }
}

.center-pos{
  display: flex;
  justify-content: center;
  align-items: center;
}

.flexy{
  display: flex;
}

.header-container{
  background-color: #ffffff;
  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f5f5f5;
    padding: 10px 0;
    position: relative;
    &:after{
      content: '';
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      height: 5px;
      background:linear-gradient(270deg, #F37A20 17.41%, #616161 53.73%, #F37A20 100%);
    }
  }
  .h-padding{
    padding-left: var(--spacer-sm);
    padding-right: var(--spacer-sm);
  }
  .search-bar{
    width: 100%;
  }

  .icon-padding{
    padding-right: 10px;
  }

  .location-btn{
    color: #37474F;
    padding-top: 10px;
    padding-bottom: 5px;
    .selected-location{
      font-size: 13px;
      font-weight: 500;
    }
    .location-text{
      font-size: 11px;
    }
  }
}

.sf-overlay{
  background: unset;
}

.header-on-top {
  z-index: 2;
}
.nav-item {
  --header-navigation-item-margin: 0 var(--spacer-base);
  .sf-header-navigation-item__item--mobile {
    display: none;
  }
}

.cart-badge {
  position: absolute;
  bottom: 40%;
  left: 40%;
}
</style>
