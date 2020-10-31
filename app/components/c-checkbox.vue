<template lang='pug'>
label.custom-checkbox
  input(:type="type" :value="val" v-model="model" @change='q($event)')
  transition(name='mark')
    template(v-if='single')
      .custom-checkbox__mark(v-if='val')
    template(v-else)
      .custom-checkbox__mark(v-if='check')
</template>
<script>
  export default {
    data(){
      return {
        checked: false
      }
    },
    props: [ 'value', 'val' ,'type','selVal','single'],
    computed: {
      check(){
        if(this.single){
          return this.checked
        }
        else if(this.type=='checkbox'){
          return this.selVal.indexOf(this.val)!=-1
        }else{
          return this.value==this.val
        }
      },
      model: {
         get() {
           return this.value;
         },
         set(val) {
          this.checked=!this.checked
          this.$emit('input', val);
         },
       },
     },
     methods:{
      q(e){
        this.checked=e.target.checked
      }
     }
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