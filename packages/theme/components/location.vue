<template>
  <div class="location-blk d-flex w-100">
    <SfCircleIcon
      class="sf-circle-icon--large left-pos green-primary"
      aria-label="marker"
      icon="marker"
      icon-size="28px"
    />
    <div class="location-content">
      <client-only>
        <!-- <LocationSearchBar @toggleLocationDrop="toggleLocationDrop" /> -->
        <div>
          <slot>
            <div>
              <p>Your Location</p>
            </div>
          </slot>
          <slot name="locationInput">
            <div class="position-relative" @click="toggleIsShow">
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
                disabled="!isActive"
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
        <SfButton
          class="sf-search-bar__button sf-button--pure m-r-25"
          @click="toggleLocationDrop"
        >
          <SfIcon icon="info" color="var(--c-text)" size="18px" />
        </SfButton>
      </client-only>
      <template>
        <div id="location">
          <SfSidebar
            :visible="!!isLocationdropOpen"
            :button="false"
            title="My Location"
            @close="toggleLocationDrop"
            class="sidebar sf-sidebar--right"
          >
            <transition name="fade" mode="out-in">
              <client-only>
                <LocationSearchBar @toggleLocationDrop="toggleLocationDrop" />
              </client-only>
            </transition>
          </SfSidebar>
        </div>
      </template>
    <!-- <button @click="isShow = !isShow">click Me</button> -->
    <div class="popover-blk">
      <template>
        <div v-if="!!isShow"  @click="toggleIsShow">
            <ModalComponent class="modalclass" />
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

  data() {
    return {
      isActive: true
    };
  },
  setup() {
    const isLocationdropOpen = ref(false);
    const isShow = ref(false);
    const toggleLocationDrop = () => {
      isLocationdropOpen.value = !isLocationdropOpen.value;
    };
    const toggleIsShow = () => {
      isShow.value = !isShow.value;
    };

    return {
      isLocationdropOpen,
      toggleLocationDrop,
      isShow,
      toggleIsShow
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
