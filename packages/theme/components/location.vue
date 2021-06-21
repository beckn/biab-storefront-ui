<template>
    <!-- <p>test</p> -->
    <div class="location-blk d-flex w-100">
        <SfCircleIcon
            class="sf-circle-icon--large left-pos green-primary"
            aria-label="marker"
            icon="marker"
            icon-size="28px"
          />
       <div class="location-content">
          <slot>
            <div>
              <p>Your Location</p>
            </div>
          </slot>
          <location />
          <slot name="locationInput">
              <div class="position-relative">
                <input type="text"
                    placeholder="Enter Location"
                    aria-label="Select Location"
                    class="sf-header__search be-search-location sf-search-bar sf-header__search be-search-location" />
                <SfButton
            class="sf-search-bar__button sf-button--pure"
            @click="toggleLocationDrop"
          >
            <SfIcon
              icon="chevron_down"
              color="var(--c-text)" size="18px"
            />
          </SfButton>
              </div>
          </slot>

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
                    <div class="collected-product-list">
                        <transition-group name="fade" tag="div">
                        <p>test</p>
                        </transition-group>
                    </div>

                </transition>
                </SfSidebar>
            </div>
        </template>
    </div>
    </div>
</template>

<script>
import { SfCircleIcon, SfButton, SfSidebar, SfIcon } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
export default {
  components: {
    SfCircleIcon,
    SfButton,
    SfSidebar,
    SfIcon
  },
  setup() {
    const { isLocationdropOpen, toggleLocationDrop } = useUiState();
    return {
      isLocationdropOpen,
      toggleLocationDrop
    };
  }
};
</script>

<style lang="scss" scoped>
.sf-circle-icon {
  --icon-color: var(--c-primary);
}
</style>
