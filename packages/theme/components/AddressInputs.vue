<template>
  <div>
    <div class="modal-heading">{{ headingText }}</div>
    <div><hr class="sf-divider" /></div>
    <div class="address-inputs-container">
      <SfInput
        v-e2e="'name-input'"
        :valid="!validateInput('Name')"
        :errorMessage="validateInput('Name')"
        v-model="address.name"
        :type="'text'"
        :label="'Name'"
        :name="'Name'"
      />
      <SfInput
        v-e2e="'mobile-input'"
        :valid="!validateInput('mobile')"
        :errorMessage="validateInput('mobile')"
        v-model="address.mobile"
        :type="'number'"
        :label="'Mobile Number'"
        pattern="[0-9]{10}"
        maxlength="10"
        autocomplete="tel"
        :name="'mobile'"
      />
      <SfInput
        v-e2e="'full-address-input'"
        v-model="address.address"
        :type="'text'"
        :label="'Complete Address'"
        :name="'address'"
      />
      <SfInput
        v-e2e="'building-input'"
        v-model="address.building"
        :type="'text'"
        :label="'Building Name Floor'"
        :name="'building'"
      />
      <SfInput
        v-e2e="'pin-input'"
        v-model="address.pincode"
        :type="'number'"
        :maxlength="6"
        :max="999999"
        min="0"
        pattern="[0-9]{6}"
        :label="'Pincode'"
        :name="'Pincode'"
        :valid="!validateInput('Pincode')"
        :errorMessage="validateInput('Pincode')"
      />
      <SfInput
        v-e2e="'landmark-input'"
        v-model="address.landmark"
        :type="'text'"
        :label="'Landmark (Optional)'"
        :name="'locality'"
        @change="() => {}"
      />
      <SfButton
        v-e2e="'add-address'"
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
import { ref, computed } from '@vue/composition-api';
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

    const valid = ref({
      address: false,
      pincode: false,
      mobile: false,
      name: false,
      building: false
    });

    // const validateName = () => {
    //   if (address.value.name.length > 3) {
    //     valid.value.name = true;
    //   } else {
    //     valid.value.name = false;
    //   }
    // };
    // const validateMobile = () => {
    //   const re = /^[0-9\b]+$/;
    //   if (re.test(address.value.mobile) && address.value.mobile.length === 10) {
    //     valid.value.mobile = true;
    //   } else {
    //     valid.value.mobile = false;
    //   }
    // };
    // const validateAddress = () => {
    //   if (address.value.address.length > 5) {
    //     valid.value.address = true;
    //   } else {
    //     valid.value.address = false;
    //   }
    // };
    // const validateBuilding = () => {
    //   if (address.value.building.length > 5) {
    //     valid.value.building = true;
    //   } else {
    //     valid.value.building = false;
    //   }
    // };
    // const validatePincode = () => {
    //   const re = /^[0-9\b]+$/;
    //   if (re.test(address.value.pincode) && address.value.pincode.length === 6) {
    //     valid.value.pincode = true;
    //   } else {
    //     valid.value.pincode = false;
    //   }
    // };

    const validateInput = (field) => {
      const re = /^[0-9\b]+$/;
      switch (field) {
        case 'Name':
          if (address.value.name && address.value.name.length < 4) {
            return 'Please enter a valid name';
          }
          break;
        case 'mobile':
          if (address.value.mobile && (!re.test(address.value.mobile) || address.value.mobile.length !== 10)) {
            return 'Please enter a valid mobile';
          }
          break;
        case 'Pincode':
          if (address.value.pincode && (!re.test(address.value.pincode) || address.value.pincode.length !== 6)) {
            return 'Please enter a valid pincode';
          }
          break;
        default:
          break;
      }
      return '';
    };

    const isFieldsValid = computed(() =>{
      address.value.valid = (valid.value.address && valid.value.name && valid.value.mobile && valid.value.pincode && valid.value.building);
      return (valid.value.address && valid.value.name && valid.value.mobile && valid.value.pincode && valid.value.building);
    });

    const saveDetails = () => {
      emit('getAddress', isFieldsValid.value);
    };

    return {
      address,
      saveDetails,
      valid,
      isFieldsValid,
      validateInput
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
