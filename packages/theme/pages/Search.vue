<template>
  <div class="search-page">
    <div class="search-bar side-padding">
      <SfSearchBar
        placeholder="Search for items"
        aria-label="Search"
        :icon="null"
        :value="searchKey"
        @input="(value) => (searchKey = value)"
        @keydown.enter="searchHit($event)"
      >
        <template #icon>
          <SfButton
            v-if="searchKey"
            class="sf-search-bar__button sf-button--pure"
            @click="clearSearch"
          >
            <span class="sf-search-bar__icon">
              <SfIcon color="var(--c-text)" size="20px" icon="cross" />
            </span>
          </SfButton>
          <SfButton
            v-else
            class="sf-search-bar__button sf-button--pure"
            @click="
              isSearchOpen ? (isSearchOpen = false) : (isSearchOpen = true)
            "
          >
            <span class="sf-search-bar__icon">
              <SfIcon color="var(--c-text)" size="20px" icon="search" />
            </span>
          </SfButton>
        </template>
      </SfSearchBar>
    </div>
    <div class="details">
      <transition-group name="sf-fade" mode="out-in" v-if="!enableLoader">
        <div
          v-if="pollResults && pollResults.length > 0"
          class="search__wrapper-results"
          key="results"
        >
          <div class="side-padding result-num">
            <span
              ><span v-e2e="'total-result'">{{
                totalResults(pollResults)
              }}</span>
              results found</span
            >
          </div>
          <div v-for="(bpp, bppIndex) in pollResults" :key="bppIndex">
            <div
              v-for="(provider, prIndex) in bpp.bpp_providers"
              :key="prIndex"
            >
              <div class="results--mobile">
                <ProductCard
                  v-for="(product, pIndex) in provider.items.slice(0, 5)"
                  @goToProduct="goToProduct(product, provider, bpp)"
                  :key="
                    bppIndex +
                      '-' +
                      prIndex +
                      '-' +
                      pIndex +
                      '-' +
                      keyVal +
                      'product'
                  "
                  :pName="productGetters.getName(product)"
                  :pRetailer="
                    providerGetters.getProviderBpp(bpp.bpp_descriptor)
                  "
                  :pPrice="productGetters.getPrice(product).regular"
                  :pImage="productGetters.getGallery(product)[0].small[0]"
                  :pDistance="'800m away'"
                  :pWieght="productGetters.getProductWeight(product) + ' kg'"
                  :pCount="cartGetters.getItemQty(isInCart({ product }))"
                  @updateItemCount="
                    (item) => updateItemCount(item, provider, bpp, pIndex)
                  "
                  :horizontalView="false"
                />
              </div>
            </div>
          </div>
        </div>

        <div v-if="noSearchFound" key="no-search" class="before-results">
          <SfImage
            src="/icons/feather_search.svg"
            class=""
            alt="error"
            loading="lazy"
          />
          <p>
            <b>{{ $t('Your search did not yield ') }}</b>
          </p>
          <p>
            <b>{{ $t('any results ') }}</b>
          </p>
          <p>{{ $t('Please try searching again using ') }}</p>
          <p>{{ $t('different keyword') }}</p>
        </div>
      </transition-group>

      <LoadingCircle :enable="enableLoader" key="loding-cir" />
    </div>
    <div v-if="cartGetters.getTotalItems(cart)" class="sr-footer">
      <Footer
        @buttonClick="footerClick"
        :totalPrice="cartGetters.getTotals(cart).total"
        :totalItem="cartGetters.getTotalItems(cart)"
        buttonText="View Cart"
      >
        <template v-slot:buttonIcon>
          <SfIcon icon="empty_cart" color="white" :coverage="1" />
        </template>
      </Footer>
    </div>
  </div>
</template>
<script>
import { SfIcon, SfSearchBar, SfButton, SfImage } from '@storefront-ui/vue';
import { ref, onBeforeMount, watch } from '@vue/composition-api';
import LoadingCircle from '~/components/LoadingCircle';
import ProductCard from '~/components/ProductCard';
import Footer from '~/components/Footer';
import { useUiState } from '~/composables';
import debounce from 'lodash.debounce';
import {
  productGetters,
  providerGetters,
  cartGetters,
  useCart,
  useFacet,
  useSearch
} from '@vue-storefront/beckn';

export default {
  name: 'Search',
  components: {
    LoadingCircle,
    SfIcon,
    SfSearchBar,
    SfButton,
    ProductCard,
    Footer,
    SfImage
  },
  setup(_, context) {
    const {
      searchString,
      changeSearchString,
      selectedLocation,
      toggleLoadindBar,
      clearCartPopup,
      updateExpPageData
    } = useUiState();
    const goBack = () => {
      context.root.$router.back();
    };

    const { addItem, cart, isInCart, load } = useCart();
    const data = context.root.$route.params.searchKey;
    console.log(data);
    const searchKey = ref(data);
    const enableLoader = ref(Boolean(data));
    const keyVal = ref(0);
    const { search, result } = useFacet();
    const { pollResults, poll, polling, stopPolling } = useSearch('search');
    const noSearchFound = ref(false);

    console.log(cart);

    watch(
      () => clearCartPopup.value,
      (newVal) => {
        if (!newVal) {
          keyVal.value++;
        }
      }
    );

    const handleSearch = debounce((paramValue) => {
      if (polling.value) stopPolling();
      enableLoader.value = true;
      if (noSearchFound.value) noSearchFound.value = false;
      toggleLoadindBar(false);

      search({
        term: paramValue,
        locationIs:
          selectedLocation?.value?.latitude +
          ',' +
          selectedLocation?.value?.longitude
        // eslint-disable-next-line no-unused-vars
      }).then((_) => {
        localStorage.setItem(
          'transactionId',
          result.value.data.ackResponse.context.transaction_id
        );

        poll({
          // eslint-disable-next-line camelcase
          message_id: result.value.data.ackResponse.context.message_id
        });
      });

      console.log('result value', pollResults.value);
    }, 1000);

    watch(
      () => pollResults.value,
      (newValue) => {
        if (newValue?.length > 0 && enableLoader.value) {
          enableLoader.value = false;
          toggleLoadindBar(true);
        }
      }
    );

    watch(
      () => polling.value,
      (newValue) => {
        if (!newValue) {
          enableLoader.value = false;
          toggleLoadindBar(false);
          if (pollResults?.value.length === 0) {
            noSearchFound.value = true;
          }
        } else {
          enableLoader.value = true;
          noSearchFound.value = false;
        }
      }
    );

    onBeforeMount(async () => {
      await load();
      if (searchKey.value) {
        handleSearch(searchKey.value);
      }
    });

    const searchHit = (value) => {
      if (value?.target?.value) {
        if (value.target.value === searchString.value) {
          handleSearch(value.target.value);
        } else {
          changeSearchString(value.target.value);
          console.log(searchString.value);
        }
      }
    };

    watch(searchString, (newVal) => {
      if (newVal !== '') {
        searchKey.value = newVal;
        handleSearch(newVal);
      }
    });

    const onSearchChange = (value) => {
      searchKey.value = value;
      console.log(searchKey.value);
    };

    const clearSearch = () => {
      searchKey.value = '';
      handleSearch('');
    };

    const totalResults = (newValue) => {
      if (newValue) {
        let reusltNum = 0;
        for (const bpp of newValue) {
          for (const provider of bpp.bpp_providers) {
            reusltNum += provider.items.length;
          }
        }
        return reusltNum;
      }
    };

    const footerClick = () => {
      context.root.$router.push('/cart');
    };

    const goToProduct = (product, provider, bpp) => {
      const data = btoa(
        JSON.stringify({
          product,
          bpp: {
            id: bpp.bpp_id,
            descriptor: bpp.bpp_descriptor
          },
          bppProvider: {
            id: provider.id,
            descriptor: provider.descriptor
          },
          locations: provider.locations
        })
      );
      context.root.$router.push({
        path: '/product',
        query: {
          data: data
        }
      });
    };

    const updateItemCount = (data, provider, bpp, index) => {
      addItem({
        product: provider.items[index],
        quantity: data,
        customQuery: {
          bpp: {
            id: bpp.bpp_id,
            descriptor: bpp.bpp_descriptor
          },
          bppProvider: {
            id: provider.id,
            descriptor: provider.descriptor
          },
          locations: provider.locations
        }
      });
    };

    const openProvider = (bpp, provider) => {
      updateExpPageData({
        bpp: {
          // eslint-disable-next-line camelcase
          bpp_descriptor: bpp.bpp_descriptor,
          // eslint-disable-next-line camelcase
          bpp_id: bpp.bpp_id
        },
        provider,
        searchValue: searchKey.value
      });
      context.root.$router.push('/ExploreProvider');
    };

    return {
      goBack,
      enableLoader,
      productGetters,
      providerGetters,
      cartGetters,
      searchKey,
      keyVal,
      noSearchFound,
      cart,
      pollResults,
      isInCart,
      onSearchChange,
      clearSearch,
      updateItemCount,
      handleSearch,
      searchHit,
      footerClick,
      totalResults,
      goToProduct,
      openProvider
    };
  }
};
</script>

<style lang="scss" scoped></style>
