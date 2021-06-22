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

    <div class="popover-blk">
    <!-- <button @click="isShow = !isShow">click Me</button> -->
      <template>
        <SfButton
          class="sf-search-bar__button sf-button--pure m-r-25"
          @click="isShow = !isShow"
          >
          <span class="sf-search-bar__icon">
            <SfIcon color="var(--c-text)" size="18px" icon="info" />
          </span>
        </SfButton>
      </template>
      <template>
        <div v-if="isShow">      
          <div class="popover-content position-relative">
            <h3>Device location is not enabled</h3>
            <p>Please provide the permission to access better & hassle free delivery</p>
            <div class="position-relative">
              <input
                type="text"
                placeholder="Search for location"
                aria-label="Select Location"
                class="
                  sf-header__search
                  be-search-location
                  sf-search-bar
                  sf-header__search
                  be-search-location
                "
              />
              <template class="position-relative">
                <SfButton
                  class="sf-search-bar__button sf-button--pure"
                >
                  <span class="sf-search-bar__icon">
                    <SfIcon color="var(--c-text)" size="18px" icon="search" />
                  </span>
                </SfButton>
                <SfButton
                  class="sf-search-bar__button sf-button--pure pos-left"
                >
                  <span class="sf-search-bar__icon">
                    <SfIcon color="var(--c-text)" size="20px" icon="marker" />
                  </span>
                </SfButton>
              </template>
              
            </div>
            <ul class="location-list">
          <li>
             <SfButton
              class="sf-search-bar__button sf-button--pure pos-left"
            >
              <span class="sf-search-bar__icon">
                <SfIcon color="var(--c-text)" size="30px" icon="marker" />
              </span>
            </SfButton>
            Kormangla
            <p>Cauvery Colony, Kormangla, Bengaluru</p>
          </li>
           <li>
             <SfButton
              class="sf-search-bar__button sf-button--pure pos-left"
            >
              <span class="sf-search-bar__icon">
                <SfIcon color="var(--c-text)" size="30px" icon="marker" />
              </span>
            </SfButton>
            Kormangla
            <p>Cauvery Colony, Kormangla</p>
          </li>
          
        </ul>
            <p class="text-center semi-bold">Or</p>
            <SfButton
                class="sf-button--pure enable-location-btn"
              >
              <span class="sf-search-bar__icon">
                <SfIcon color="var(--c-white)" size="18px" icon="search" />
              </span>ENABLE LOCATION
            </SfButton>
          </div>
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
export default {
  name: 'Location',
  data: function() {
    return {
      isShow: false
    };
  },

  components: {
    SfCircleIcon,
    SfButton,
    SfSidebar,
    SfIcon,
    LocationSearchBar
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
  }
};
</script>

<style lang="scss" scoped>
.sf-circle-icon {
  --icon-color: var(--c-primary);
}
.notShown {
  visibility: hidden !important;
  position: absolute;
}
</style>
