<style lang="scss">
@import '../assets/styles.scss';
</style>

<template>
  <div class="header-container">
    <div class="fixed-head">
      <div class="fixed-head-height"></div>
      <div class="header h-padding">
        <nuxt-link :to="localePath('/')">
          <SfImage
            src="/icons/beckn.png"
            :width="63"
            :height="20"
            alt="Vue Storefront Next"
          />
        </nuxt-link>
        <div class="dropdown">
          <button class="dropbtn" @click="openHamburger = !openHamburger">
            <SfIcon icon="more" color="green-primary" />
          </button>
          <div
            v-if="openHamburger"
            @click="openHamburger = !openHamburger"
            class="dropdown-content"
          >
            <nuxt-link :to="localePath('/orders')"> My Orders </nuxt-link>
            <div><hr class="sf-divider" /></div>
            <!-- TO DO -->
            <nuxt-link :to="localePath('/')"> My Address </nuxt-link>
            <div><hr class="sf-divider" /></div>
            <!-- TO DO -->
            <nuxt-link :to="localePath('/')">Support</nuxt-link>
            <div><hr class="sf-divider" /></div>
            <!-- TO DO -->
            <nuxt-link :to="localePath('/')">About</nuxt-link>
            <div><hr class="sf-divider" /></div>
            <nuxt-link v-if="isUserAuthenticated()" :to="localePath('/Logout')"
              >Logout</nuxt-link
            >
          </div>
        </div>
        <!-- <div>
          <transition name="sf-dropdown">
            <Card class>lolz</Card>
          </transition>
        </div> -->
      </div>
      <LoadingBar
        :enable="
          enableLoadindBar &&
          ['Product', 'cart', 'Search'].includes($route.name)
        "
      />
      <div
        v-if="['home', 'Search'].includes($route.name)"
        class="location-btn h-padding flexy"
      >
        <div
          v-if="['Search'].includes($route.name)"
          class="icon-padding circle-centre"
          @click="goBack"
        >
          <SfIcon color="var(--c-text)" size="20px" icon="chevron_left" />
        </div>
        <Location
          :isDisabled="false"
          :class="{ 'disable-location': false }"
          class="location-section aline-center"
          v-e2e="'app-header-location'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { SfImage, SfIcon, SfBottomModal } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import { useWishlist, useUser, useSearch } from '@vue-storefront/beckn';
import { computed, onBeforeUnmount } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useUiHelpers } from '~/composables';
import Location from './Location';
import { clickOutside } from '@storefront-ui/vue/src/utilities/directives/click-outside/click-outside-directive.js';
import { unMapMobileObserver } from '@storefront-ui/vue/src/utilities/mobile-observer.js';
import LoadingBar from './LoadingBar';
import Card from '~/components/Card.vue';

export default {
  components: {
    SfImage,
    SfIcon,
    SfBottomModal,
    Location,
    LoadingBar,
    Card,
  },
  directives: { clickOutside },
  setup(props, { root }) {
    const { toggleLoginModal, enableLoadindBar } = useUiState();
    const { setTermForUrl } = useUiHelpers();
    const { isAuthenticated, load: loadUser } = useUser();
    const { load: loadWishlist } = useWishlist();
    const { stopPolling } = useSearch('search');

    const accountIcon = computed(() =>
      isAuthenticated.value ? 'profile_fill' : 'profile'
    );

    const openHamburger = false;

    const isUserAuthenticated = () => {
      if (root.$store.$fire.auth.currentUser === null) {
        return false;
      }
      return true;
    };

    const goBack = () => {
      stopPolling();
      root.$router.back();
    };

    const handleAccountClick = async () => {
      if (isAuthenticated.value) {
        return root.$router.push('/my-account');
      }

      toggleLoginModal();
    };

    onSSR(async () => {
      await loadUser();
      await loadWishlist();
    });

    onBeforeUnmount(async () => {
      unMapMobileObserver();
    });

    return {
      accountIcon,
      handleAccountClick,
      setTermForUrl,
      LoadingBar,
      enableLoadindBar,
      goBack,
      openHamburger,
      isUserAuthenticated,
    };
  },
};
</script>

<style lang="scss" scoped>
.header-container {
  background-color: #ffffff;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    padding: 10px 0;
    border-bottom: 0.5px solid #f1f1f1;
  }
  .h-padding {
    padding-left: var(--spacer-sm);
    padding-right: var(--spacer-sm);
  }
  .search-bar {
    width: 100%;
    margin-top: 15px;
  }

  .icon-padding {
    padding-right: 10px;
    cursor: pointer;
    .sf-icon {
      --icon-color: #f37a20 !important;
      width: 20px;
      height: 20px;
    }
  }

  .location-btn {
    color: #37474f;
    padding: 13px 15px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.07);
    position: relative;
    // z-index: 99;
    background-color: #fbfcff;
    .selected-location {
      font-size: 13px;
      font-weight: 500;
    }
    .location-text {
      font-size: 11px;
    }
  }
}

.sf-overlay {
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

.burger {
  position: absolute;
  right: 6vw;
}

.cart-badge {
  position: absolute;
  bottom: 40%;
  left: 40%;
}

/* Style the dropdown button to fit inside the topnav */
.dropdown .dropbtn {
  font-size: 17px;
  border: none;
  outline: none;
  color: white;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
  display: block;
  width: 100%;
  text-align: left;
}

/* Style the dropdown content (hidden by default) */
.dropdown-content {
  display: block;
  position: absolute;
  background-color: white;
  right: 6px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

/* Style the links inside the dropdown */
.dropdown-content a {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content a:hover {
  background: #dbdbdb;
}
</style>
