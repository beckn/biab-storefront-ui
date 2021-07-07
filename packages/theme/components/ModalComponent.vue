
    <!-- <button @click="isShow = !isShow">click Me</button> -->

      <template>
        <div v-if="!isShow" >
          <div class="popover-content position-relative">
            <h3>Device location is not enabled</h3>
            <p>Please provide the permission to access better & hassle free delivery</p>
            <div class="position-relative" >
              <div @click="$emit('toggleLocationDrop')" v-e2e="'app-header-location-modal-input-div'">
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
                disabled="!isActive"
                v-e2e="'app-header-location-modal-input'"
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
            </div>
            <!-- <ModalComponent class="modalclass" /> -->
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

<script>
import { SfButton, SfIcon } from '@storefront-ui/vue';
import { ref } from '@vue/composition-api';

export default {
  components: {
    SfButton,
    SfIcon
  },

  setup() {
    const isShow = ref(false);
    const toggleIsShow = () => {
      isShow.value = !isShow.value;
    };

    return {
      isShow,
      toggleIsShow
    };
  }
};
</script>

<style lang="scss" scoped>
.notShown {
  visibility: hidden !important;
  position: absolute;
}
</style>
