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
          v-model="location"
          type="text"
          placeholder="Enter Location"
          aria-label="Select Location"
          @click="isShow = !isShow"
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
      <client-only>
        <button v-popover:location-popover>Toggle popover</button>
        <Popover name="location-popover" class="location-popover" >
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
          <!-- <li v-for="(result, i) in searchResults" :key="i">
              {{ result }}
            </li> -->
        </Popover>
      </client-only>
    </slot>
  </div>
</template>

<script>
import { SfButton, SfIcon } from '@storefront-ui/vue';
export default {
  data: () => ({
    location: '',
    searchResults: [],
    service: null,
  }),
  metaInfo() {
    return {
      script: [
        {
          src: `https://maps.googleapis.com/maps/api/js?key=AIzaSyC7a8StVzn6y8rQzrLyFEUA1TnHhd5RRXg&libraries=places`,
          async: true,
          defer: true,
          callback: () => this.MapsInit(),
        },
      ],
    };
  },
  directives:{
    popover: () => process.client? import('vue-js-popover/src/directive'): null
  },
  methods: {
    MapsInit() {
      this.service = new window.google.maps.places.AutocompleteService();
      console.log(this.service);
      // debugger
    },
    displaySuggestions(predictions, status) {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
        this.searchResults = [];
        return;
      }
      this.searchResults = predictions.map(
        (prediction) => prediction.description
      );
    },
  },
  watch: {
    location(newValue) {
      if (newValue) {
        this.service.getPlacePredictions(
          {
            input: this.location,
            types: ['(cities)'],
          },
          this.displaySuggestions
        );
      }
    },
  },
  name: 'LocationSearchBar',
  components: {
    SfButton,
    SfIcon,
    Popover: () => process.client? import('vue-js-popover/src/Popover.vue'): null,
  },
};
</script>