<template lang='pug'>
.form-container
  form.form
    initials
    addres
</template>
<script>
  import initials from './components/initials.vue'
  import addres from './components/addres.vue'
  export default {
    data(){
      return {

      }
    },
    components:{
      initials,
      addres
    },
    methods:{

    }
  }
</script>
<style lang="sass"></style>