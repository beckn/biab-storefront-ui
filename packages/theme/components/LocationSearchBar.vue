<template>
  <div>
    <slot>
      <div>
        <p>Your Location</p>
      </div>
    </slot>
    <slot name="locationInput">
      <div class="position-relative">
        <input
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
        />
        <SfButton
          class="sf-search-bar__button sf-button--pure"
          @click="$emit('toggleLocationDrop')"
        >
          <SfIcon icon="chevron_down" color="var(--c-text)" size="18px" />
        </SfButton>
      </div>
    </slot>
  </div>
</template>

<script>
import { SfButton, SfIcon } from '@storefront-ui/vue';
export default {
  name: 'LocationSearchBar',  
  components: {
    SfButton,
    SfIcon,
  },
  setup() {
  },
};
</script>