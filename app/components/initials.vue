<template lang='pug'>
.initials-form.form-block
  input(type='text' placeholder='фамилия' v-model='initialsForm.surname' :class='{"error": !$v.initialsForm.surname.required||!$v.initialsForm.surname.alpha}')
  input(type='text' placeholder='имя' v-model='initialsForm.name' :class='{"error": !$v.initialsForm.name.required||!$v.initialsForm.name.alpha}')
  input(type='text' placeholder='отчество' v-model='initialsForm.lastname' :class='{error:!$v.initialsForm.lastname.alpha}')
  input(type='date' placeholder='дата рождения' :max='maxDate' v-model='initialsForm.birthday' :class='{"error": !$v.initialsForm.birthday.required}')
  .initials-form__tel
    input(type='tel' ref='tel' placeholder='номер телефона' @focus='telFocused=true' @blur='telFocused=false' v-model='initialsForm.tel' :class='{"error":$v.initialsForm.tel.$invalid}')
    .initials-form__pattern(v-if='$v.initialsForm.tel.$invalid&&!telFocused') 7 *** *** ****  
  .initials-form__gender
    label.initials-form__radio
      checkbox(val='мужчина' v-model='initialsForm.gender' type='radio' :selVal='initialsForm.gender')
      |Мужчина
    label.initials-form__radio
      checkbox(val='женщина' v-model='initialsForm.gender' type='radio' :selVal='initialsForm.gender')
      |Женщина
  customSelect(
    :values='clientType' 
    :error='!$v.initialsForm.clientType.required' 
    title='выберите минимум 1 значение' 
    type='checkbox' 
    @option-select='handleClientTypeOptionSelect($event)' 
    name='Группа клиентов'
    :model='initialsForm.clientType')
  customSelect(
    :values='doctors'
    type='radio'
    name='Лечаший врач'
    @option-select='handleDoctorOptionSelect'
    :model='initialsForm.doctor')
  label.initials-form__sms
    checkbox(type='checkbox' :val='initialsForm.sms' v-model='initialsForm.sms' single='true')
    |не отправлять смс
  .initials-form__buttons.buttons
    .button.button_clear(@click='clear') очистить
    .button.button_accept(:class='{button_disabled: $v.initialsForm.$invalid}' @click='accept') принять
</template>
<script>
  import customSelect from './custom-select.vue'
  import checkbox from './c-checkbox.vue'
  import {required,minLength,helpers} from 'vuelidate/lib/validators'
  const numeric = helpers.regex('numeric', /^7 \d{3} \d{3} \d{4}$/)
  const alpha = helpers.regex('alpha', /^[a-zа-яё]*$/i)
  export default {
    data(){
      return {
        clientType:['VIP', 'Проблемные', 'ОМС'],
        doctors:['Иванов', 'Захаров', 'Чернышева'],
        telFocused:false,
        telString:'',
        maxDate: new Date().toLocaleDateString().split('.').reverse().join('-'),
        initialsForm:{
          sms:false,
          gender: null,
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
        name: {required,alpha},
        surname:{required,alpha},
        lastname:{alpha},
        birthday:{required},
        tel:{required,numeric},
        clientType:{required},

      }
    },
    props:['tab'],
    components:{
      customSelect,
      checkbox
    },
    methods:{
      clear(){
        Object.keys(this.initialsForm).forEach((el,i)=>{
          this.initialsForm[el] = null
        })
        this.$emit('form-data-ready',{data:null,i:this.tab})
      },
      accept(){
        if(this.$v.initialsForm.$invalid) return

        this.$emit('form-data-ready',{data:this.initialsForm,i:this.tab})
      }
      ,
      handleDoctorOptionSelect(e){
        this.initialsForm.doctor = e
        
      },
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
      console.log(this.maxDate)
      this.$refs.tel.addEventListener('keyup', this.reg)
      this.$refs.tel.addEventListener('blur', this.handleTelBlur)
    }
  }
</script>
<style lang='sass'>
@import './../vars.sass'

.button
  width: 100%
  display: flex
  justify-content: center
  align-items: center
  padding: 10px 20px
  border-radius: 3px
  border: 1px solid
  cursor: pointer
  &:active,
  &_disabled
    opacity: 0.5
    cursor: default

  &_accept
    color: $blue
    border-color: $blue

  &_clear
    color: $warn
    border-color: $warn

input
  width: 100%
  border: 1px solid #cccccc
  border-radius: 3px
  outline: none
  color: #333
  font-size: 11px
  font-family: Tahoma
  padding: 10px 20px
  box-sizing: border-box
  &::placeholder
    color: #ccc

.form-block
  min-width: 320px
  display: grid
  grid-gap: 30px
  padding: 40px
  border-radius: 5px
  border: 1px solid #ccc
  border-top: 0
  border-top-right-radius: 0
  border-top-left-radius: 0

.buttons
  display: grid
  grid-gap: 5px
  grid-auto-flow: column

.initials-form
  &__sms
    display: grid 
    grid-auto-flow: column  
    grid-gap: 5px
    justify-content: center 
  &__tel
    display: grid
    grid-gap: 5px
    justify-items: center

    input
      justify-self: stretch

  &__gender
    display: flex
    justify-content: space-around

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