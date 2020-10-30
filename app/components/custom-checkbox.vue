<template lang='pug'>
.custom-checkbox
  transition(name='mark')
    .custom-checkbox__mark(v-if='initVal==val')
</template>
<script>
  export default {
    data(){
      return {
      }
    },
    props:['initVal','val'],
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