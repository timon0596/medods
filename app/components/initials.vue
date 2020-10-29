<template lang="pug">
.initials
  <input type="text" placeholder="фамилия">
  <input type="text" placeholder="имя">
  <input type="text" placeholder="отчество">
  <input type="date" placeholder="дата рождения">
  <input type="tel" placeholder="номер телефона" pattern="[0-9]{1}-[0-9]{3}-[0-9]{3}-[0-9]{4}">
  .initials__radio
    label
      <input type="radio" name="gender">
      |мужчина
    label
      <input type="radio" name="gender">
      |женщина
  customSelect(:values='clientType' type='checkbox' name='Группа клиентов')
  customSelect(:values='doctors' type='radio' name='Лечаший врач')
  label.sms
    input(type="checkbox" v-model="sms" @change='cons').sms__input
    |не отправлять смс
</template>
<script>
  import customSelect from './custom-select.vue'
  export default {
    data(){
      return {
        clientType:['VIP', 'Проблемные', 'ОМС'],
        doctors:['Иванов', 'Захаров', 'Чернышева'],
        sms:false
      }
    },
    components:{
      customSelect
    },
    methods:{
      cons(){
        console.log(this.sms)
      }
    },
    mounted(){
    }
  }
</script>
<style lang="sass">
.initials
  width: min-content
  display: grid
  grid-gap: 30px
  justify-content: start
  justify-self: start
  padding: 40px
  border-radius: 5px
  border: 1px solid #000
  &__radio
    display: flex


</style>