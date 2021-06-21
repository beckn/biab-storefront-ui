<template>
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
                    <div>                      
                      <slot name="locationInput">
                          <div class="position-relative">
                            <input type="text"
                                placeholder="Enter Location"
                                aria-label="Select Location"
                                class="sf-header__search be-search-location sf-search-bar sf-header__search be-search-location" />
                          </div>
                      </slot>
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
import { ref} from '@vue/composition-api';
export default {
  name: 'Location',
  components: {
    SfCircleIcon,
    SfButton,
    SfSidebar,
    SfIcon
  },
  setup() {
    const isLocationdropOpen = ref(false);
    const toggleLocationDrop = () => {
      isLocationdropOpen.value = !isLocationdropOpen.value;
    }
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
