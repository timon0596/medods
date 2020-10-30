<template lang="pug">
.custom-select(@click='expandToggle')
  .custom-select__header
    .custom-select__name {{name}}
    .custom-select__expand(:class='{"custom-select__expand_active": expanded}')
  .custom-select__options(:class='{"custom-select__options_expanded": expanded}')
    label.custom-select__option(v-for='option,index in values')
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
  display: grid
  grid-gap: 10px
  padding: 5px
  &__options
    display: none
    grid-gap: 10px

    &_expanded
      display: grid

  &__option
    display: grid
    grid-auto-flow: column
    grid-gap: 5px
    justify-content: start

  &__header
    height: 25px
    display: flex
    justify-content: space-between
    align-items: center

  &__expand
    position: relative
    display: flex
    justify-content: center
    align-items: center
    width: 12px
    height: 12px
    cursor: pointer

    &:after
      position: absolute
      content: ''
      display: block
      width: 100%
      height: 100%
      border: 3px solid $blue
      border-left: 0
      border-top: 0
      border-radius: 3px
      transform-origin: 100% 100%
      transform: translate(-50%, 0) rotate(45deg)
      box-sizing: border-box

    &_active
      transform: rotate(180deg)

</style>