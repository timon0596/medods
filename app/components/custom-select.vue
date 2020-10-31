<template lang="pug">
.custom-select
  .custom-select__header(@click='expandToggle')
    .custom-select__error(v-if='error') !
    .custom-select__name {{name}}
    .custom-select__expand(:class='{"custom-select__expand_active": expanded}')
  .custom-select__options-wrapper
    transition(name='options')  
      .custom-select__options(v-if='expanded')
        label.custom-select__option(v-for='option,index in values')
          checkbox(:type='type' :val='option' @input='onInput' v-model='selectedValues' :selVal='selectedValues')
          |{{option}}
</template>
<script>
  import checkbox from './c-checkbox.vue'
  export default {
    data(){
      return {
        selectedValues: [],
        expanded:false
      }
    },
    props:['values','type','name','error'],
    components:{
      checkbox
    },
    methods:{
      onInput(){
        this.$emit('option-select',this.selectedValues)
      },
      expandToggle(){
        this.expanded=!this.expanded
      },
      
    },
  }
</script>
<style lang="sass">
@import './../vars.sass'
.custom-select
  display: grid
  grid-gap: 10px
  padding: 5px
  border-top-left-radius: 3px

  &__error
    position: absolute
    left: 0
    top: 0
    width: 20px
    height: 100%
    font-size: 25px
    transform: translate(-100%, 0)
    color: $error
    display: flex
    justify-content: center
    align-items: center

  &__options-wrapper
    overflow: hidden

  &__options
    display: grid
    grid-gap: 10px
    transform-origin: 0 0

  &__option
    display: grid
    grid-auto-flow: column
    grid-gap: 5px
    justify-content: start

  &__header
    position: relative
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
    transition: transform 0.25s ease


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
.options-enter-active,
.options-leave-active
  transition: all 0.25s
.options-enter,
.options-leave-to
  transform: translate(0, -100%)
</style>