<template lang='pug'>
.initials-form
  input(type='text' placeholder='фамилия' v-model='initialsForm.surname' :class='{"error": !$v.initialsForm.surname.required}')
  input(type='text' placeholder='имя' v-model='initialsForm.name' :class='{"error": !$v.initialsForm.name.required}')
  input(type='text' placeholder='отчество' v-model='initialsForm.lastname')
  input(type='date' placeholder='дата рождения' v-model='initialsForm.birthday' :class='{"error": !$v.initialsForm.birthday.required}')
  .initials-form__tel
    input(type='tel' ref='tel' placeholder='номер телефона' @focus='telFocused=true' @blur='telFocused=false' v-model='initialsForm.tel' :class='{"error":$v.initialsForm.tel.$invalid}')
    .initials-form__pattern(v-if='$v.initialsForm.tel.$invalid&&!telFocused') 7**********  
  .initials-form__gender
    label
      <input type='radio' name='gender' value='male' v-model='initialsForm.gender'>
      checkbox
      |мужчина
    label
      <input type='radio' name='gender' value='female' v-model='initialsForm.gender'>
      checkbox
      |женщина
  customSelect(:values='clientType' title='выберите минимум 1 значение' type='checkbox' @option-select='handleClientTypeOptionSelect($event)' name='Группа клиентов'  :class='{"error error_select":!$v.initialsForm.clientType.required}')
  customSelect(:values='doctors' type='radio' name='Лечаший врач')
  label.initials-form__sms
    input(type='checkbox' v-model='initialsForm.sms')
    checkbox
    |не отправлять смс
</template>
<script>
  import customSelect from './custom-select.vue'
  import checkbox from './custom-checkbox.vue'
  import {required,minLength,helpers} from 'vuelidate/lib/validators'
  const numeric = helpers.regex('numeric', /^7 \d{3} \d{3} \d{4}$/)
  export default {
    data(){
      return {
        clientType:['VIP', 'Проблемные', 'ОМС'],
        doctors:['Иванов', 'Захаров', 'Чернышева'],
        telFocused:false,
        telString:'',
        initialsForm:{
          sms:false,
          gender: 'male',
          name:null,
          surname:null,
          lastname:null,
          birthday:null,
          tel:7,
          clientType:[],
          doctor: null
        }
      }
    },
    validations:{
      initialsForm:{
        name: {required},
        surname:{required},
        birthday:{required},
        tel:{required,numeric},
        clientType:{required},

      }
    },
    components:{
      customSelect,
      checkbox
    },
    methods:{
      handleClientTypeOptionSelect(e){
        this.initialsForm.clientType=[...e]
      },
      reg(){
        let val = (this.initialsForm.tel).replace(/\s/g,'')
        val = (/\D/).test(val)?'':(val+'').match(/(\d{1})?(\d{3})?(\d{3})?(\d{4})?/)
        if(val&&val.length>=1){
          val = val.slice(1).join(' ')
          this.telString = val.trim()
        }
      },
      handleTelBlur(){
        this.initialsForm.tel = this.telString
      }
    },
    mounted(){
      this.$refs.tel.addEventListener('keyup', this.reg)
      this.$refs.tel.addEventListener('blur', this.handleTelBlur)
    }
  }
</script>
<style lang='sass'>
@import './../vars.sass'

input
  width: 100%
  height: 24px  
  border: 1px solid #cccccc
  border-radius: 3px
  outline: none
  color: #cccccc
  font-size: 11px
  font-family: Tahoma


.initials-form
  min-width: 320px
  width: min-content
  display: grid
  grid-gap: 30px
  padding: 40px
  border-radius: 5px
  border: 1px solid #ccc
  &__gender
    display: flex
  label
    display: grid
    grid-auto-flow: column
    grid-gap: 10px
    align-items: center
    position: relative

  .error
    border: 1px solid $error

    &_select
      border-right: 0
      border-bottom: 0

</style>