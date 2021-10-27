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
            <div>
              <span
                ><span v-e2e="'total-result'">{{
                  totalResults(pollResults)
                }}</span>
                results found</span
              >
            </div>
            <div class="price-sort-toggler" @click="sortByPriceToggler">
              <!-- TO DO :- complete this icon after having a discussion with the designer -->
              <svg
                width="10"
                height="18"
                viewBox="0 0 10 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.04677 14.6065L4.04826 17.6058C4.10874 17.6663 4.17594 17.7222 4.24538 17.7693C4.25658 17.776 4.26777 17.7827 4.27897 17.7894C4.31033 17.8096 4.34169 17.8298 4.37305 17.8454C4.41113 17.8656 4.45145 17.8835 4.48953 17.9014C4.49401 17.9014 4.49849 17.9037 4.50297 17.9059C4.54105 17.9194 4.57912 17.9328 4.61496 17.944C4.65752 17.9574 4.70008 17.9664 4.74264 17.9754C4.82551 17.991 4.91287 18 4.99799 18C5.1279 18 5.25558 17.9821 5.38102 17.944C5.41909 17.9328 5.45717 17.9194 5.49301 17.9059C5.49749 17.9037 5.50197 17.9014 5.50645 17.9014C5.54677 17.8835 5.58485 17.8656 5.62293 17.8454C5.65429 17.8298 5.68564 17.8118 5.717 17.7894C5.79764 17.7402 5.87604 17.6797 5.94772 17.6058H5.94996L8.94921 14.6065C9.47559 14.0801 9.47559 13.229 8.94921 12.7048C8.42507 12.1807 7.5739 12.1807 7.04976 12.7048L6.34194 13.4126V1.34395C6.34194 0.602539 5.74164 0 4.99799 0C4.25658 0 3.65404 0.602539 3.65404 1.34395V13.4104L2.94846 12.7048C2.42208 12.1807 1.57315 12.1807 1.04677 12.7048C0.522629 13.229 0.522629 14.0801 1.04677 14.6065Z"
                  fill="#F37A20"
                />
              </svg>
            </div>
          </div>
          <div v-for="(bpp, bppIndex) in pollResults" :key="bppIndex">
            <div
              v-for="(provider, prIndex) in bpp.bpp_providers"
              :key="prIndex"
            >
              <div
                v-for="(product, pIndex) in sortItemsByPrice(
                  provider.items.slice(0, 5)
                )"
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
                class="results--mobile"
              >
                <ProductCard
                  @goToProduct="goToProduct(product, provider, bpp)"
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
    const searchKey = ref(data);
    const isSortAscending = ref(null);
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

    const sortByPriceToggler = () => {
      isSortAscending.value = !isSortAscending.value;
    };

    const sortItemsByPrice = (items) => {
      if (isSortAscending.value === null) {
        return items;
      }
      if (isSortAscending.value === true) {
        const ascendingSortedArray = items.sort(
          (a, b) => a?.price?.value - b?.price?.value
        );
        return ascendingSortedArray;
      }

      const descendingSortedArray = items.sort(
        (a, b) => b?.price?.value - a?.price?.value
      );
      return descendingSortedArray;
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
      sortByPriceToggler,
      sortItemsByPrice,
      isSortAscending
    };
  }
};
</script>

<style lang="scss" scoped>
.price-sort-toggler {
  padding-right: 9px;
  cursor: pointer;
}
.side-padding {
  display: flex;
  justify-content: space-between;
}
</style>
