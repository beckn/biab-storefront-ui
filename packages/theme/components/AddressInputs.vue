<template>
  <div>
    <div class="modal-heading">{{ headingText }}</div>
    <div><hr class="sf-divider" /></div>
    <div class="address-inputs-container">
      <SfInput
        v-model="address.name"
        :type="'text'"
        :label="'Name'"
        :name="'Name'"
        @change="() => {}"
      />
      <SfInput
        v-model="address.mobile"
        :type="'number'"
        :label="'Mobile Number'"
        pattern="[0-9]{10}"
        maxlength="10"
        autocomplete="tel"
        :name="'mobile'"
        @change="() => {
          address.mobile.replace(/^(\+\d\d)|\D|\s/g, '')
        }"
      />
      <SfInput
        v-model="address.address"
        :type="'text'"
        :label="'Complete Address'"
        :name="'address'"

        @change="() => {}"
      />
      <SfInput
        v-model="address.building"
        :type="'text'"
        :label="'Building Name Floor'"
        :name="'building'"
        @change="() => {}"
      />
      <SfInput
        v-model="address.pincode"
        :type="'number'"
        :maxlength="6"
        :max="999999"
        min="0"
        pattern="[0-9]{6}"
        :label="'Pincode'"
        :name="'Pincode'"
        :valid="true"
        :errorMessage="'lolz'"
        @input="() => {
        }"
      />
      <SfInput
        v-model="address.landmark"
        :type="'text'"
        :label="'Landmark (Optional)'"
        :name="'locality'"
        @change="() => {}"
      />
      <SfButton
        class="address-button"
        aria-label="Close modal"
        type="button"
        @click="saveDetails"
        style="width: 100%"
        >{{ buttonText }}</SfButton
      >
    </div>
  </div>
</template>

<script>
import { SfButton, SfInput } from '@storefront-ui/vue';
import { ref } from '@vue/composition-api';
export default {
  name: 'AddressInputs',
  components: {
    SfButton,
    SfInput
  },
  props: {
    buttonText: {
      type: String,
      default: ''
    },
    headingText: {
      type: String,
      default: ''
    },
    addressDetails: {
      type: Object,
      default: {
        name: '',
        mobile: '',
        building: '',
        landmark: '',
        address: ''
      }
    }
  },
  setup(props, { emit }) {
    const address = ref(props.addressDetails);

    const saveDetails = () => {
      emit('getAddress', address.value);
    };

    return {
      address,
      saveDetails
    };
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

.address-inputs-container {
  margin: 12px 28px;
}

.modal-heading {
  margin: 20px;
  font-size: 20px;
  font-weight: 500;
}
</style>
