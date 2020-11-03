<template lang='pug'>
.form-container
  form.form
    initials
    addres(@form-data-ready='addr($event)')
    passport(@form-data-ready='addr($event)')
</template>
<script>
  import initials from './components/initials.vue'
  import addres from './components/addres.vue'
  import passport from './components/passport.vue'
  export default {
    data(){
      return {

      }
    },
    components:{
      initials,
      addres,
      passport
    },
    methods:{
      addr(e){
        console.log(e)
      }
    }
  }
</script>
<style lang="sass"></style>