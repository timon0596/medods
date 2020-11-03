<template lang='pug'>
.addres-form.form-block
  input(type='number' placeholder='индекс' v-model='index' :class='{"error": !$v.city.$invalid}')
  input(type='text' placeholder='страна' v-model='country')
  input(type='text' placeholder='область' v-model='area')
  input(type='text' placeholder='город' v-model='city' :class='{"error": !$v.city.required}')
  input(type='text' placeholder='улица' v-model='street')
  input(type='text' placeholder='дом' v-model='house' :class='{"error": $v.house.house&&house}')
  .buttons
    .button.button_clear(@click='clear') очистить
    .button.button_accept(:class='{button_disabled: $v.$invalid}' @click='accept') принять
</template>
<script>
  import customSelect from './custom-select.vue'
  import checkbox from './c-checkbox.vue'
  import {required,minLength,helpers} from 'vuelidate/lib/validators'
  const numeric = helpers.regex('numeric', /\d?/)
  const alpha = helpers.regex('alpha', /^[a-zа-яё]*$/i)
  const house = value => {
    if (typeof value === 'undefined' || value === null || value === '') {
      return true
    }
    return /[\W]$/.test(value)
  }
  export default {
    data(){
      return {
        index:null,
        country:null,
        area:null,
        city:null,
        street:null,
        house:null
      }
    },
    validations:{
      index:{numeric},
      city:{required},
      house:{house}
    },
    components:{
      customSelect,
      checkbox
    },
    methods:{
      clear(){

      },
      accept(){

      },
    },
    mounted(){
    }
  }
</script>
<style lang='sass'>
@import './../vars.sass'

</style>