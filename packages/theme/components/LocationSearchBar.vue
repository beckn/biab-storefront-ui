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
        <SfButton
          class="sf-search-bar__button sf-button--pure"
          @click="$emit('toggleLocationDrop')"
        >
          <SfIcon icon="chevron_down" color="var(--c-text)" size="18px" />
        </SfButton>
        <ul>
          <li v-for="(result, i) in searchResults" :key="i">
            {{ result }}
          </li>
        </ul>
        
      <!-- <Popover class="location-popover" /> -->
      </div>
      
        <!-- <ul class="location-list">
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
          
        </ul> -->
        <!-- <li v-for="(result, i) in searchResults" :key="i">
            {{ result }}
          </li> -->
         
    </slot>
  </div>
</template>

<script>
import { SfButton, SfIcon } from '@storefront-ui/vue';
// import Popover from 'vue-js-popover';
export default {
  data: () => ({
    location: '',
    searchResults: [],
    service: null
  }),
  created(){
    this.service = new window.google.maps.places.AutocompleteService()
  },
  methods: {    
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
    SfIcon
  },
};
</script>