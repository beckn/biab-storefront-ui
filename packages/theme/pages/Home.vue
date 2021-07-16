<template>
  <div id="home">
  <OpenSearch />
  <div @click="openCart">
    <!-- <button>cart</button> -->
  </div>
  </div>
</template>
<script>

import OpenSearch from '../components/OpenSearch';
import { useUiState } from '~/composables';

const { toggleCartSidebar } = useUiState();
export default {
  components: {

    OpenSearch
  },
  methods: {
    openCart() {
      toggleCartSidebar();
    }
  }
};
</script>
