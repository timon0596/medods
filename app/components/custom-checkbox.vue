<template lang='pug'>
.custom-checkbox
</template>
<script>
  export default {
  }
</script>
<style lang='sass'>
@import './../vars.sass'
input[type='radio'],
input[type='checkbox']
  display: none

.custom-checkbox    
  width: 12px
  height: 12px
  border: 1px solid $blue
  border-radius: 20%

  &:after
    display: none
    content: ''
    width: 6px
    height: 12px
    border: 3px solid $blue
    border-top: 0
    border-left: 0
    border-radius: 15%
    transform-origin: 100% 100%
    transform: rotate(45deg) translate(-50%,0)
    position: absolute

input:checked + .custom-checkbox:after
  display: block
    
</style>