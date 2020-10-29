<template lang="pug">
.custom-select
  .custom-select__header
    .custom-select__name {{name}}
    .custom-select__expand(@click='expandToggle' :class='{"custom-select__expand_active": expanded}')
  .custom-select__options(:class='{"custom-select__options_expanded": expanded}')
    .custom-select__option(v-for='option,index in values')
      label
        input(:type="type" :value='option' @change='handleClientTypeSelect' v-model='selectedValues')
        |{{option}}
</template>
<script>

  export default {
    data(){
      return {
        selectedValues: [],
        expanded:false
      }
    },
    props:['values','type','name'],
    components:{

    },
    methods:{
      handleClientTypeSelect(e){
        console.log(this.selectedValues)
      },
      expandToggle(){
        this.expanded=!this.expanded
        console.log(this.expanded)
      }
      
    },
    mounted(){
    }
  }
</script>
<style lang="sass">
.custom-select
  &__options
    display: none
    grid-gap: 10px

    &_expanded
      display: grid

  &__header
    display: flex
    justify-content: space-between
    align-items: center

  &__expand
    display: flex
    justify-content: center
    align-items: center
    transform: translate(0, 25%)
    border: 10px solid transparent
    border-top: 10px solid #000

    &_active
      transform: rotate(180deg) translate(0,25%)

</style>