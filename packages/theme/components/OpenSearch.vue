<template>
<div>
    <div class="open-search">
        <h3>Open <br /> Commerce</h3>
        <h4>for All</h4>
        <p>A global marketplace to discover and buy anything you need. Just type what you want to buy and we'll take care of the rest.</p>
        <div class="open-search-input">
        <input v-on:keyup.enter="openSearch" v-model="message" type="text" placeholder="Search for anything" />
        <SfButton class="sf-search-bar__button sf-button--pure" @click="openSearch">
            <span class="sf-search-bar__icon">
            <SfIcon color="var(--c-text)" size="18px" icon="search" />
            </span>
        </SfButton>
        </div>
    </div>

    <div class="sf-footer">
      <SfFooter class="footer">
    <!-- <p><span>By</span> <img src="../assets/images/p-b-phonepe.png" alt="" /> </p> -->
    <p><span class="powered-by">Powered by</span> <img src="../assets/images/beckn-logo.png" alt="" /> </p>
  </SfFooter>
    </div>
    </div>
</template>
<script>
import {
  SfButton,
  SfIcon
} from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import { SfFooter } from '@storefront-ui/vue';
const { toggleSearch, changeSearchString } = useUiState();

export default {
  components: {
    SfButton,
    SfIcon,
    SfFooter
  },
  data() {
    return {
      message: ''
    };
  },
  methods: {
    openSearch() {
      changeSearchString(this.message);
      toggleSearch();
    }
  }
};
</script>

<style lang="scss" scoped>
.open-search{
    @media (min-width: 560px) {
        padding-top: 40px;
        width: 50%;
        margin: auto;
    }
        padding: 40px 20px;
    h3{
        font-size: 40px;
        font-weight: 800;
        color: #F37A20;
        line-height: 45px;
    }
    h4{
      font-size: 27px;
      font-weight: 800;
      line-height: 30px;
    }
    p{
      font-size: 15px;
      font-weight: 400;
      line-height: 20px;
      color: #7C7C7C;
      margin-bottom: 30px;
    }
    .open-search-input{
          display: flex;
      margin-bottom: 40px;
      position: relative;
      &.disable{
        input{
          border: 1px solid #fff;
        }
        button{
          background: #bfbfbf;
          .sf-icon{
            --icon-color: #fff !important;
          }
        }
      }
      input{
        box-shadow: 0px 10px 24px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        border: 1px solid transparent;
        padding: 22px 10px;
        width: calc(100% - 22px);
        font-size: 15px;
        font-weight: 700;
        &::placeholder{
          font-size: 14px;
          line-height: 17px;
          color: #DBDBDC;
        }
        &:focus{
          border: 1px solid #F37A20 !important;
        }
      }
      button{
        padding: 17px;
        height: 63px;
        top: 0;
        background: #F37A20;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
            right: 0;
        .sf-icon{
          --icon-color: #fff !important;
        }
      }
    }
}
.sf-footer {
  text-align: center;
  background: #FBFCFF !important;
  position: fixed;
    bottom: 10px;
    width: 100%;
    padding: 0;
  p{
    margin: 0;
    span{
      font-size: 17px;
      position: relative;
      top: -6px;
        &.powered-by{
          font-size: 10px;
          top: -1px !important;
        }
    }
  }
}
</style>
