<template>
  <div class="location-blk d-flex w-100">
    <SfCircleIcon
      class="sf-circle-icon--large left-pos"
      aria-label="marker"
      icon="marker"
      icon-size="18px"
    />
    <div class="layout-container">
      <div class="location-content">
        <client-only>
          <div class="location-icon">
            <slot>
              <div>
                <p>{{ locationText }}</p>
              </div>
              <div
                @click="toggleIsShow"
                v-e2e="'app-header-location-input-div'"
              >
                <template>
                  <SfButton class="button-pos sf-button--pure">
                    <span class="sf-search-bar__icon">
                      <SfIcon
                        color="var(--c-text)"
                        size="18px"
                        icon="chevron_down"
                      />
                    </span>
                  </SfButton>
                </template>
              </div>
            </slot>
          </div>
          <div v-if="isLocationSelected">
            <input
              v-model="location"
              type="text"
              aria-label="Select Location"
              class="
                  sf-header__search
                  sf-search-bar
                  sf-header__search
                  be-search-location
                "
              disabled="isActive"
              v-e2e="'app-header-location-input'"
            />
          </div>
        </client-only>
        <template>
          <div id="location" class="location-drop">
            <SfSidebar
              :visible="!!isLocationdropOpen"
              :button="false"
              title="My Location"
              @close="toggleLocationDrop"
              class="sidebar sf-sidebar--right"
            >
              <transition name="fade">
                <client-only>
                  <LocationSearchBar
                    @locationSelected="locationSelected"
                    @toggleLocationDrop="toggleLocationDrop"
                    v-e2e="'app-location-sidebar'"
                  />
                </client-only>
              </transition>
            </SfSidebar>
          </div>
        </template>
        <div class="popover-blk">
          <template>
            <div v-if="!!isShow" @click="toggleIsShow">
              <ModalComponent
                @toggleLocationDrop="toggleLocationDrop"
                class="modalclass"
                v-e2e="'app-header-location-modal'"
              />
            </div>
          </template>
        </div>
      </div>
      <div class="user-cart-content">
        <div class="cart-content">
          <nuxt-link :to="localePath('/cart')">
            <SfButton class="button-pos sf-button--pure">
              <SfIcon icon="empty_cart" />
            </SfButton>
          </nuxt-link>
        </div>
        <div class="user-content">
          <nuxt-link :to="localePath('/')">
            <SfButton class="button-pos sf-button--pure">
              <SfIcon icon="profile" />
            </SfButton>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { SfCircleIcon, SfButton, SfSidebar, SfIcon } from '@storefront-ui/vue';
import { ref } from '@vue/composition-api';
import LocationSearchBar from './LocationSearchBar.vue';
import ModalComponent from './ModalComponent.vue';
import { useUiState } from '~/composables';

export default {
  name: 'Location',
  components: {
    SfCircleIcon,
    SfButton,
    SfSidebar,
    SfIcon,
    LocationSearchBar,
    ModalComponent
  },

  props: {
    isDisabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isActive: false
    };
  },
  setup() {
    const { selectedLocation, updateLocation } = useUiState();
    const isLocationdropOpen = ref(false);
    const isShow = ref(false);
    const location = ref(selectedLocation?.value?.address);

    const toggleLocationDrop = () => {
      isLocationdropOpen.value = !isLocationdropOpen.value;
    };

    const toggleIsShow = () => {
      isShow.value = !isShow.value;
    };

    const locationSelected = (latitude, longitude, address) => {
      location.value = address;
      toggleLocationDrop();
      updateLocation({
        latitude: latitude,
        longitude: longitude,
        address: address
      });
    };

    return {
      isLocationdropOpen,
      toggleLocationDrop,
      isShow,
      toggleIsShow,
      location,
      locationSelected
    };
  },
  computed: {
    isLocationSelected() {
      return this.location !== '';
    },
    locationText() {
      return this.location !== '' ? 'Your location' : 'Set location';
    }
  }
};
</script>

<style lang="scss" scoped>
.sf-circle-icon {
  --icon-color: #f37a20;
}
.layout-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.notShown {
  visibility: hidden !important;
  position: absolute;
}
.button-pos {
  display: flex;
  align-items: center;
  height: 5px;
  padding-left: 5px;
}

.location-icon {
  display: flex;
  width: 125px;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 13px;
  letter-spacing: 0em;
  text-align: left;
}
.userIcon {
  background-color: #f37a20;
}

.user-cart-content {
  display: flex;
  width: 100px;
  justify-content: space-between;
}
</style>
