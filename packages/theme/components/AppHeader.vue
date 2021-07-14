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
    <LoadingBar :enable='enableLoadindBar'/>
    <div v-if="isLocationVisible" class="location-btn h-padding flexy">
      <div v-if="isSearchOpen" class="icon-padding center-pos" @click="closeSearch">
        <SfIcon color="var(--c-text)" size="20px" icon="chevron_left" />
      </div>
      <Location :isDisabled="!isSearchOpen" @locationSelected="locationSelected" :class="{'disable-location' : isSearchOpen }" class="location-section v-center-pos" v-e2e="'app-header-location'" />
    </div>
    <div
      v-if="isSearchOpen"
      class="sf-header--has-mobile-search h-padding"
      :class="{'header-on-top': isSearchOpen}"
    >
      <div v-if="IsSearchVisible" class="search-bar">
        <SfSearchBar
          ref="searchBarRef"
          :placeholder="$t('Search for items E.g. atta, milk')"
          aria-label="Search"
          class="sf-header__search be-search-location"
          :value="term"
          @input="onSearchChange"
          @keydown.enter="handleSearch($event)"
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
    <SearchResults :visible="isSearchOpen" :result="result" :noSearchFound="noSearchFound" :enableLoader="enableloadingCircle" @removeSearchResults="removeSearchResults" />
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
import LoadingBar from './LoadingBar';

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
    Location,
    LoadingBar
    // Product
  },
  directives: { clickOutside },
  setup(props, { root }) {
    const {
      toggleCartSidebar,
      toggleWishlistSidebar,
      toggleLoginModal,
      searchString,
      isSearchOpen,
      toggleSearch,
      changeSearchString,
      IsSearchVisible, toggleSearchVisible,
      toggleLocationVisible, isLocationVisible
    } = useUiState();
    // const { setTermForUrl } = useUiHelpers();
    const { setTermForUrl} = useUiHelpers();
    const { isAuthenticated, load: loadUser } = useUser();
    const { cart, load: loadCart } = useCart();
    const { search, facetResults } = useFacet();
    const { pollResults, poll, polling } = useOnSearch();
    const { load: loadWishlist } = useWishlist();
    const searchBarRef = ref(null);
    const result = ref(null);
    const location = ref(null);
    const enableLoadindBar = ref(false);
    const enableloadingCircle = ref(false);
    const term = ref('');
    const noSearchFound = ref(false);

    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      return count ? count.toString() : null;
    });

    const accountIcon = computed(
      () => (isAuthenticated.value ? 'profile_fill' : 'profile')
    );

    const onSearchChange = (data) => {
      term.value = data;
    };

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
      if (!isSearchOpen) return;

      changeSearchString('');
      if (enableloadingCircle.value) enableloadingCircle.value = false;
      if (enableLoadindBar.value) enableLoadindBar.value = false;
      toggleSearch();
    };

    const locationSelected = (latitude, longitude, address) => {
      console.log(address);
      location.value = latitude + ',' + longitude;
    };

    const handleSearch = debounce(async (paramValue) => {
      if (paramValue?.target?.value) {
        changeSearchString(paramValue.target.value);
        return;
      }
      enableloadingCircle.value = true;
      await search({ term: paramValue, locationIs: location.value });

      watch(()=>pollResults.value.length, (newValue)=>{
        if (newValue > 0 && enableloadingCircle.value && !enableLoadindBar.value) {
          enableloadingCircle.value = false;
          enableLoadindBar.value = true;
        }
      });
      // eslint-disable-next-line camelcase
      await poll({message_id: facetResults.value.data.ackResponse.context.message_id});
      console.log('POLL', pollResults.value.length);

      result.value = pollResults;
      watch(()=>polling.value, (newValue)=>{
        if (!newValue) {
          enableloadingCircle.value = false;
          enableLoadindBar.value = false;
          if (result?.value?.value.length === 0) {
            noSearchFound.value = true;
          }
        }
      });

      console.log('result value', result.value);
    }, 1000);

    watch(searchString, (newVal)=>{
      if (newVal !== '') {
        term.value = newVal;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        handleSearch(newVal);
      }
    });

    const isMobile = computed(() => mapMobileObserver().isMobile.get());

    const clearSearch = () => {
      term.value = '';
      changeSearchString('');
      if (enableloadingCircle.value) enableloadingCircle.value = false;
      if (noSearchFound.value) noSearchFound.value = false;
    };

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
      closeSearch,
      handleSearch,
      result,
      searchBarRef,
      isMobile,
      removeSearchResults,
      clearSearch,
      location,
      locationSelected,
      LoadingBar,
      enableLoadindBar,
      enableloadingCircle,
      noSearchFound,
      isSearchOpen,
      searchString,
      onSearchChange,
      term,
      IsSearchVisible,
      toggleSearchVisible,
      toggleLocationVisible,
      isLocationVisible
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

.v-center-pos{
  display: flex;
  align-items: center;
}

.header-container{
  background-color: #ffffff;
  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f5f5f5;
    padding: 10px 0;
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
    cursor: pointer;
  }

  .location-btn{
    color: #37474F;
    padding: 13px 15px;
    box-shadow: 0px 4px 60px rgba(0, 0, 0, 0.07);
    position: relative;
    z-index: 99;
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
