import Vue from 'vue';
import VueCompositionAPI, { reactive, computed } from '@vue/composition-api';

// We need to register it again because of Vue instance instantiation issues
Vue.use(VueCompositionAPI);

const state = reactive({
  isCartSidebarOpen: false,
  isWishlistSidebarOpen: false,
  isLoginModalOpen: false,
  isCategoryGridView: true,
  isFilterSidebarOpen: false,
  isSearchOpen: false,
  searchString: '',
  isLocationVisible: true,
  IsSearchVisible: true,
  selectedLocation: {
    latitude: '',
    longitude: '',
    address: ''
  }
});

const useUiState = () => {
  const isCartSidebarOpen = computed(() => state.isCartSidebarOpen);
  const toggleCartSidebar = () => {
    state.isCartSidebarOpen = !state.isCartSidebarOpen;
  };

  const isWishlistSidebarOpen = computed(() => state.isWishlistSidebarOpen);
  const toggleWishlistSidebar = () => {
    state.isWishlistSidebarOpen = !state.isWishlistSidebarOpen;
  };

  const isLoginModalOpen = computed(() => state.isLoginModalOpen);
  const toggleLoginModal = () => {
    state.isLoginModalOpen = !state.isLoginModalOpen;
  };

  const isCategoryGridView = computed(() => state.isCategoryGridView);
  const changeToCategoryGridView = () => {
    state.isCategoryGridView = true;
  };
  const changeToCategoryListView = () => {
    state.isCategoryGridView = false;
  };

  const isFilterSidebarOpen = computed(() => state.isFilterSidebarOpen);
  const toggleFilterSidebar = () => {
    state.isFilterSidebarOpen = !state.isFilterSidebarOpen;
  };

  const isSearchOpen = computed(() => state.isSearchOpen);
  const toggleSearch = () => {
    state.isSearchOpen = !state.isSearchOpen;
  };

  const searchString = computed(() => state.searchString);
  const changeSearchString = (data) => {
    state.searchString = data;

  };

  const IsSearchVisible = computed(() => state.IsSearchVisible);
  const toggleSearchVisible = () => {
    state.IsSearchVisible = !state.IsSearchVisible;
  };

  const isLocationVisible = computed(() => state.isLocationVisible);
  const toggleLocationVisible = () => {
    state.isLocationVisible = !state.isLocationVisible;
  };

  const selectedLocation = computed(() => state.selectedLocation);
  const updateLocation = (location) => {
    state.selectedLocation = location;
  };

  return {
    isCartSidebarOpen,
    isWishlistSidebarOpen,
    isLoginModalOpen,
    isCategoryGridView,
    isFilterSidebarOpen,
    isSearchOpen,
    searchString,
    IsSearchVisible,
    isLocationVisible,
    selectedLocation,
    toggleCartSidebar,
    toggleWishlistSidebar,
    toggleLoginModal,
    changeToCategoryGridView,
    changeToCategoryListView,
    toggleFilterSidebar,
    toggleSearch,
    changeSearchString,
    toggleSearchVisible,
    toggleLocationVisible,
    updateLocation
  };
};

export default useUiState;
