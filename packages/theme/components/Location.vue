<template>
  <div class="location-blk d-flex w-100">
    <SfCircleIcon
      class="sf-circle-icon--large left-pos"
      aria-label="marker"
      icon="marker"
      icon-size="18px"
    />
    <div class="location-content">
      <client-only>
        <div>
          <slot>
            <div>
              <p>Your Location</p>
            </div>
          </slot>
          <slot name="locationInput">
            <div class="position-relative" @click="toggleIsShow" v-e2e="'app-header-location-input-div'">
              <input
                v-model="location"
                type="text"
                placeholder="Enter Location"
                aria-label="Select Location"
                class="
                  sf-header__search
                  be-search-location
                  sf-search-bar
                  sf-header__search
                  be-search-location
                "
                disabled="isActive"
                v-e2e="'app-header-location-input'"
              />
              <template>
                <SfButton
                  class="sf-search-bar__button sf-button--pure"
                  >
                  <span class="sf-search-bar__icon">
                    <SfIcon color="var(--c-text)" size="18px" icon="chevron_down" />
                  </span>
                </SfButton>
              </template>
            </div>
          </slot>
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
            <transition name="fade" mode="in-in">
              <client-only>
                <LocationSearchBar @locationSelected="locationSelected" @toggleLocationDrop="toggleLocationDrop" v-e2e="'app-location-sidebar'" />
              </client-only>
            </transition>
          </SfSidebar>
        </div>
      </template>
    <div class="popover-blk">
      <template>
        <div v-if="!!isShow"  @click="toggleIsShow">
            <ModalComponent @toggleLocationDrop="toggleLocationDrop" class="modalclass" v-e2e="'app-header-location-modal'" />
        </div>
      </template>
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
    const {selectedLocation, updateLocation } = useUiState();
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
  }
};
</script>

<style lang="scss" scoped>
.sf-circle-icon {
  --icon-color: #F37A20;
}
.notShown {
  visibility: hidden !important;
  position: absolute;
}
</style>
