<template>
  <SfFooter class="footer">
    <p><span>By</span> <img src="../assets/images/p-b-google.png" alt="" /> </p>
    <p><span class="powered-by">Powered by</span> <img src="../assets/images/beckn-logo.png" alt="" /> </p>
  </SfFooter>
</template>

<script>
import { SfFooter } from '@storefront-ui/vue';

export default {
  components: {
    SfFooter
  }
};
</script>
<style lang="scss">
.sf-footer {
  text-align: center;
  background: #fff;
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
