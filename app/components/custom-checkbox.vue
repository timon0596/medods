<template lang='pug'>
.custom-checkbox(@click='onClick')
  template(v-if='type=="radio"')
    transition(name='mark')
      .custom-checkbox__mark(v-if='initVal==val')
  template(v-if='type=="checkbox"')
    transition(name='mark')
      .custom-checkbox__mark(v-if='checkedProp')
</template>
<script>
  export default {
    data(){
      return {
        checked: false
      }
    },
    methods:{
      onClick(){
        this.checked=!this.checked
        this.$emit('change',this.checked)
      }
    },
    props:['initVal','val','type','checkedProp'],
  }
</script>
<style lang='sass'>
@import './../vars.sass'
input[type='radio'],
input[type='checkbox']
  display: none


.custom-checkbox
  position: relative
  width: 12px
  height: 12px
  border: 1px solid $blue
  border-radius: 20%
  &__mark
    width: 6px
    height: 12px
    border: 3px solid $blue
    border-top: 0
    border-left: 0
    border-radius: 15%
    transform-origin: 100% 100%
    transform: rotate(45deg) translate(-50%,0)
    position: absolute
.mark-enter-active,
.mark-leave-active
  transition: all 0.25s ease
.mark-enter,
.mark-leave-to
  transform: rotate(0deg) translate(-50%,0)
  opacity: 0
</style>