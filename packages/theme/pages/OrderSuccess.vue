<template>
  <div id="payment">
    <div class="top-bar"></div>
    <div class="content">
      <div class="sub-heading">
        <svg
          width="132"
          height="132"
          viewBox="0 0 132 132"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d)">
            <circle
              cx="65.6698"
              cy="62.6698"
              r="58.6698"
              stroke="#40A1D8"
              stroke-width="6"
            />
          </g>
          <path
            d="M56.0531 74.5179L45.2838 63.756C44.704 63.1753 43.9167 62.8489 43.0958 62.8489C42.2748 62.8489 41.4876 63.1753 40.9078 63.756C39.6974 64.9656 39.6974 66.9195 40.9078 68.129L53.8806 81.0928C55.091 82.3024 57.0463 82.3024 58.2566 81.0928L91.0922 48.2801C92.3026 47.0705 92.3026 45.1167 91.0922 43.9071C90.5124 43.3264 89.7252 43 88.9042 43C88.0833 43 87.296 43.3264 86.7162 43.9071L56.0531 74.5179Z"
            fill="#40A1D8"
          />
          <defs>
            <filter
              id="filter0_d"
              x="0"
              y="0"
              width="131.34"
              height="131.34"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="3" />
              <feGaussianBlur stdDeviation="2" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>
      <div class="details">
        <div class="sub-heading dis-block">
          <div class="p-name flex-set">Success!</div>
          <div class="p-name flex-set">Your Order Has Been Placed</div>
        </div>
        <div class="sub-heading">
          Thank You! Your order is currently being processed
        </div>
        <button
          class="sf-button button color-primary"
          link=""
          @click="goToOrderDetails"
        >
          <!-- button icon template  -->
          <slot name="buttonIcon" />
          <div class="f-btn-text">View Order</div>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  SfButton,
  SfRadio,
  SfIcon
} from '@storefront-ui/vue';

// import { ref, computed } from '@vue/composition-api';
// import { onMounted } from '@vue/composition-api';
// import helpers from '../helpers/helpers';
// import { useCart } from '@vue-storefront/beckn';

import Card from '~/components/Card.vue';

import Footer from '~/components/Footer.vue';
import CardContent from '~/components/CardContent.vue';
export default {
  name: 'OrderSuccess',
  components: {
    SfButton,
    SfIcon,
    Card,
    CardContent,
    SfRadio,
    Footer
  },
  setup(_, context) {
    const transactionId = context.root.$route.query.id;

    const goToOrderDetails = ()=>{

      context.root.$router.push({
        path: '/orderdetails',
        query: {
          id: transactionId
        }
      });
    };
    return {
      goToOrderDetails
    };
  }
};
</script>
<style lang="scss" scoped>
.top-bar {
  align-items: center;
  display: flex;
  font-size: 18px;
  justify-content: space-around;
  height: 60px;
  font-weight: 500;
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.07);
}

.dis-block{
    display: block !important;
}

.details {
  margin: 2px 20px;
}

.content {
  margin: 2px 20px;
}

.p-name {
  font-size: 16px;
  font-weight: 600;
  color: #37474f;
}

.button {
  width: 100%;
}

.flex-set {
  display: flex;
  justify-content: space-around;
}

.sub-heading {
  margin: 34px 0px;
  display: flex;
  justify-content: space-around;
}
</style>
