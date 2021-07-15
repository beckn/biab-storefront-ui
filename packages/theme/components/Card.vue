<template>
  <div class="card">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    enable: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  border-radius: 10px;
  background: white;
  padding: 10px 28px;
  box-shadow: 0px 10px 40px 0px #00000008;

}
</style>
