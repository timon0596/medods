<template lang="pug">
.custom-select
  .custom-select__header
    .custom-select__name {{name}}
    .custom-select__expand(@click='expandToggle' :class='{"custom-select__expand_active": expanded}')
  .custom-select__options(:class='{"custom-select__options_expanded": expanded}')
    .custom-select__option(v-for='option,index in values')
      label
        input(:type="type" :value='option' @change='handleClientTypeSelect' v-model='selectedValues')
        checkbox
        |{{option}}
</template>
<script>
  import checkbox from './custom-checkbox.vue'
  export default {
    data(){
      return {
        selectedValues: [],
        expanded:false
      }
    },
    props:['values','type','name'],
    components:{
      checkbox
    },
    methods:{
      handleClientTypeSelect(e){
        this.$emit('option-select',this.selectedValues)
      },
      expandToggle(){
        this.expanded=!this.expanded
      }
      
    },
    mounted(){
    }
  }
</script>
<style lang="sass">
@import './../vars.sass'
.custom-select
  padding: 5px
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
    border-top: 10px solid $blue

    &_active
      transform: rotate(180deg) translate(0,12%)

</style>