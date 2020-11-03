<template lang='pug'>
.passport-form.form-block
  customSelect(
    :values='documentTypes' 
    :error='!$v.fields.document.required' 
    title='поле обязательное для заполнения' 
    type='radio' 
    @option-select='handleDocumentOptionSelect($event)' 
    name='тип документа'
    :model='fields.document')
  <input type='number' placeholder='серия' v-model='fields.series'>
  <input type='number' placeholder='номер' v-model='fields.number'>
  <input type='text' placeholder='кем выдан' v-model='fields.pickUp'>
  <input type='date' :max='maxDate' placeholder='дата выдачи' :class='{error: !$v.fields.date.required}' v-model='fields.date'>
  .buttons
    .button.button_clear(@click='clear') очистить
    .button.button_accept(:class='{button_disabled: $v.$invalid}' @click='accept') принять
</template>
<script>
  import customSelect from './custom-select.vue'
  import checkbox from './c-checkbox.vue'
  import {required,minLength,helpers} from 'vuelidate/lib/validators'
  const numeric = helpers.regex('numeric', /\d?/)
  const alpha = helpers.regex('alpha', /^[a-zа-яё-]*$/i)
  export default {
    data(){
      return {
        documentTypes: ['Паспорт','Свидетельство о рождении','Вод. удостоверение'],
        maxDate: new Date().toLocaleDateString().split('.').reverse().join('-'),
        fields:{
          document:[],
          series:null,
          number:null,
          pickUp:null,
          date:null
        }
      }
    },
    validations:{
      fields:{
        document: {required},
        date:{required}

      }
    },
    components:{
      customSelect,
      checkbox
    },props:['tab'],
    methods:{
      handleDocumentOptionSelect(e){
        this.fields.document=e
      },
      clear(){

        for(let key in this.fields){
          this.fields[key] = null
        }
        this.$emit('form-data-ready',{data:null,i:this.tab})
      },
      accept(){
        if(this.$v.$invalid) return

        this.$emit('form-data-ready',{data:this.fields,i:this.tab})
      },
    },
    mounted(){
    }
  }
</script>
<style lang='sass'>
@import './../vars.sass'

</style>