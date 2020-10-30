<template lang="pug">
.custom-select
  .custom-select__option(v-for='type,index in clientType')
    label
      input(type="checkbox" :value='type' @change='handleClientTypeSelect' v-model='selectedValues')
      |{{type}}
</template>
<script>

  export default {
    data(){
      return {
        selectedValues: []
      }
    },
    props:['clientType'],
    components:{

    },
    methods:{
    },
    mounted(){
    }
  }
</script>
<style lang="sass">


</style>