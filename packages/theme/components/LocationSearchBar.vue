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
          class="
            sf-header__search
            be-search-location
            sf-search-bar
            sf-header__search
            be-search-location
          "
        />
        <ul>
          <li>
            HSR layout
            <span>2nd block</span>
          </li>
          <!-- <li v-for="(result, i) in searchResults" :key="i">
            {{ result }}
          </li> -->
        </ul>
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
  data: () => ({
    location: '',
    searchResults: [],
    service: null
  }),
  metaInfo () {
    return {
      script:[{
        src: `https://maps.googleapis.com/maps/api/js?key=<key>&libraries=places`,
        async: true,
        defer: true,
        callback: () => this.MapsInit()
      }]
    }
  },
  methods: {
    MapsInit () {
      this.service = new window.google.maps.places.AutocompleteService()
      console.log(this.service)
      debugger
    },
    displaySuggestions (predictions, status) {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
        this.searchResults = []
        return
      }
      this.searchResults = predictions.map(prediction => prediction.description) 
    }
  },
  watch: {
    location (newValue) {
      if (newValue) {
        this.service.getPlacePredictions({
          input: this.location,
          types: ['(cities)']
        }, this.displaySuggestions)
      }
    }
  },
  name: 'LocationSearchBar',  
  components: {
    SfButton,
    SfIcon,
  },
};
</script>