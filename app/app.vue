<template lang='pug'>
.form-container
  form.form(v-show='tabDataInvalid||!created')
    .nav
      .button.tab(v-for='tab,index in tabs' @click='currentTab=index' :key='index' :class='{"current-tab": index===currentTab}') {{tab}}
    .tabs
      initials(@form-data-ready='handleFormDataReady($event)' v-show='currentTab==0' tab='0')
      addres(@form-data-ready='handleFormDataReady($event)' v-show='currentTab==1' tab='1')
      passport(@form-data-ready='handleFormDataReady($event)' v-show='currentTab==2' tab='2')
  .button(:class='{button_disabled: tabDataInvalid}' @click='create' v-show='!created') создать
  .error-message(v-show='tabDataInvalid&&!created') сначала заполните все обязательные поля
  .success-message(v-show='!tabDataInvalid&&created') клиент успешно создан
</template>
<script>
  import initials from './components/initials.vue'
  import addres from './components/addres.vue'
  import passport from './components/passport.vue'
  export default {
    data(){
      return {
        currentTab:0,
        tabs:['initials','addres','passport'],
        tabData:[null,null,null],
        tabDataInvalid:true,
        created:false
      }
    },
    components:{
      initials,
      addres,
      passport
    },
    methods:{
      handleFormDataReady(e){
        this.tabData[e.i]=e.data
        this.tabDataInvalid=this.tabData.some((el)=>!el)
      },
      create(){
        if(this.tabDataInvalid) return
        this.created=true

      }
    },
    mounted(){

    }
  }
</script>
<style lang="sass">
@import './vars.sass'
*
  box-sizing: border-box
.form-container
  display: grid
  grid-gap: 5px
  justify-content: center
.form
  justify-self: start
.nav
  display: grid
  grid-auto-flow: column
.current-tab
  
  border-bottom: 0
.tab
  border-color: #ccc
  border-bottom-right-radius: 0
  border-bottom-left-radius: 0
.success-message
  width: 100%
  display: flex
  justify-content: center
  align-items: center
  padding: 10px 20px
  border-radius: 3px
  border: 1px solid $success
  cursor: pointer
  color: $success


</style>