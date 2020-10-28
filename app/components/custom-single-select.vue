<template lang="pug">
.custom-select
  .custom-select__option(v-for='doc,index in doctors')
    label
      input(type="radio" name='doc' :value='doc' @change='handleDocSelect' v-model='doctor')
      |{{doc}}
</template>
<script>

  export default {
    data(){
      return {
        doctor: null
      }
    },
    props:['doctors'],
    components:{

    },
    methods:{
      handleDocSelect(e){
        console.log(this.doctor)

      }
      
    },
    mounted(){
    }
  }
</script>
<style lang="sass">


</style>