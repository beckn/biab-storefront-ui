<template>
  <div class="s-product">
    <div :class="{ horizontal: horizontalView, vertical: !horizontalView }">
      <div class="s-p-image">
        <SfImage
          @click="$emit('goToProduct')"
          :src="_pImage"
          alt="product img"
          :width="horizontalView ? 85 : 75"
          :height="90"
        />
      </div>
      <div class="s-p-details">
        <div class="price-verified">
          <div @click="$emit('goToProduct')" class="s-p-name">{{ _pName }}</div>
        </div>
        <!-- <div class="s-p-weight">{{ _pWieght }}</div> -->
        <div
          class="price-increase"
          v-if="!!_updatedPrice && _updatedPrice !== _pPrice"
        >
          Price increased by <span>₹{{ _updatedPrice - _pPrice }}</span>
        </div>
        <div class="verify-inline-container">
          <div class="s-p-price" v-if="_updatedCount !== 0">
            ₹ {{ _updatedPrice ? _updatedPrice : _pPrice }}
          </div>
          <div class="verify-button" v-if="false">
            <SfImage
              @click="showModal(_pName)"
              alt="verified-icon"
              src="/icons/verified icon badge.png"
              :width="19"
              :height="19"
            />
            <div :id="_pName" class="tooltiptext">
              ONDC Verified
              <SfImage
                alt="verified-icon"
                src="/icons/agmark-verified-logo.png"
                :width="10"
                :height="10"
              />
            </div>
          </div>
        </div>
        <span class="out-stock" v-if="_updatedCount === 0">Out of Stock</span>
      </div>
      <div class="s-p-add-cart">
        <SfImage
          v-if="deleteCard"
          src="/icons/delete.svg"
          alt="delete-icon"
          @click="$emit('deleteItem')"
        />
        <AddToCart
          v-if="!dropdownCouner"
          v-e2e="'add-to-cart'"
          :value="_pCount"
          @updateItemCount="(data) => $emit('updateItemCount', data)"
        />
        <div v-if="dropdownCouner" class="dropdown-container d-flex ">
          <span
            class="avail-unit"
            v-if="!!_updatedCount && _updatedCount !== _pCount"
            >{{ _updatedCount }} units are available</span
          >
          <div class="position-relative">
            <div
              class="dropdown-button"
              v-if="_updatedCount !== 0"
              @click="openDropdown = !openDropdown"
            >
              <div>{{ _pCount }}</div>
              <SfIcon icon="chevron_down" size="xxs" />
            </div>
            <div class="dowpdown" v-if="openDropdown">
              <div
                class="dowpdown-item"
                :class="{
                  border: index !== count.length - 1,
                  'color-text': count === 'More'
                }"
                v-for="(count, index) in dpList"
                :key="index"
                @click="dropdownClick(count)"
              >
                {{ count }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { SfImage, SfIcon } from '@storefront-ui/vue';
import AddToCart from './AddToCart.vue';
import { productGetters } from '@vue-storefront/beckn';
import { ref, computed } from '@vue/composition-api';

export default {
  name: 'ProductCard',
  components: {
    SfImage,
    AddToCart,
    SfIcon
  },
  props: {
    product: { type: Object },
    pName: { type: String, default: '' },
    pWieght: { type: String, default: '' },
    pPrice: { type: Number, default: '' },
    pImage: { type: String, default: '' },
    pCount: { type: Number, default: 0 },
    updatedPrice: { type: Number, default: null },
    updatedCount: { type: Number, default: null },
    horizontalView: { type: Boolean, default: true },
    deleteCard: { type: Boolean, default: false },
    dropdownCouner: { type: Boolean, default: false },
    pTags: { type: Boolean, default: false }
  },

  setup(props, { emit }) {
    const _pName = computed(() => props.pName);
    const _pWieght = computed(() => props.pWieght);
    const _pPrice = computed(() => props.pPrice);
    const _pImage = computed(() => props.pImage);
    const _pCount = computed(() => props.pCount);
    const _updatedPrice = computed(() => props.updatedPrice);
    const _updatedCount = computed(() => props.updatedCount);
    const dpList = [1, 2, 3, 4, 'More'];
    const openDropdown = ref(false);
    const _pTags = computed(() => props.pTags);
    const dropdownClick = (data) => {
      console.log(data);
      if (data === 'More') {
        emit('dropdownMore');
        openDropdown.value = false;
      } else {
        emit('updateItemCount', data);
        openDropdown.value = false;
      }
    };

    return {
      productGetters,
      _pName,
      _pWieght,
      _pPrice,
      _pImage,
      _pCount,
      dpList,
      openDropdown,
      _updatedPrice,
      _updatedCount,
      dropdownClick,
      _pTags
    };
  },
  methods: {
    getProductBase(product) {
      this.$emit('removeSearchResults');
      return btoa(JSON.stringify(product));
    },
    showModal(pName) {
      const element = document.getElementById(pName);
      element.style.display = 'inline-block';
      setTimeout(() => {
        element.style.display = 'none';
      }, 2000);
    }
  }
};
</script>
<style lang="scss" scoped>
.dropdown-container {
  position: relative;
  .dropdown-button {
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #f37a20;
    font-weight: 700;
    width: 70px;
    height: 30px;
    border: 1px solid #d9d9d9;
    box-sizing: border-box;
    border-radius: 6px;
  }

  .dowpdown {
    background: #ffffff;
    box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    padding: 0 7px;
    position: absolute;
    width: 56px;
    z-index: 1;
    .dowpdown-item {
      display: flex;
      justify-content: center;
      padding: 7px 0;
    }
    .border {
      border-bottom: 1px solid rgba(226, 226, 226, 0.7);
    }
    .color-text {
      color: #f37a20;
      cursor: pointer;
    }
  }
}
.price-verified {
  display: flex;
}

.verify-inline-container {
  display: flex;
  justify-content: space-between;
}

.s-p-details {
  display: flex;
  flex-direction: column;
}

.verified {
  margin-top: 4px;
  padding: 1px;
  background-color: #f37a20;
  color: white;
  font-size: 6px;
  width: 44px;
  height: 30px;
  cursor: pointer;
}

.verified-text {
  font-size: 14px;
}

.verify-button {
  padding-left: 40px;
  position: relative;
}

.tooltiptext {
  display: none;
  width: 90px;
  background-color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 2px 6px;
  margin-top: -16px;
  font-size: 10px;
  font-weight: bold;
  border: 1px solid #888;
  position: absolute;
  z-index: 1;
}
</style>
