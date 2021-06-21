<template>
  <div class="location-blk d-flex w-100">
    <SfCircleIcon
      class="sf-circle-icon--large left-pos green-primary"
      aria-label="marker"
      icon="marker"
      icon-size="28px"
    />
    <div class="location-content">
      <LocationSearchBar @toggleLocationDrop="toggleLocationDrop" />
      <template>
        <div id="location">
          <SfSidebar
            :visible="isLocationdropOpen"
            :button="false"
            title="My Location"
            @close="toggleLocationDrop"
            class="sidebar sf-sidebar--right"
          >
            <transition name="fade" mode="out-in">
              <LocationSearchBar @toggleLocationDrop="toggleLocationDrop" />
            </transition>
          </SfSidebar>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { SfCircleIcon, SfButton, SfSidebar, SfIcon } from '@storefront-ui/vue';
import { ref } from '@vue/composition-api';
import LocationSearchBar from './LocationSearchBar.vue';
export default {
  name: 'Location',
  components: {
    SfCircleIcon,
    SfButton,
    SfSidebar,
    SfIcon,
    LocationSearchBar,
  },
  setup() {
    const isLocationdropOpen = ref(false);
    const toggleLocationDrop = () => {
      isLocationdropOpen.value = !isLocationdropOpen.value;
    };
    return {
      isLocationdropOpen,
      toggleLocationDrop
    };
  },
};
</script>

<style lang="scss" scoped>
.sf-circle-icon {
  --icon-color: var(--c-primary);
}
</style>
