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
        fields:{
          document:[],
        }
      }
    },
    validations:{
      fields:{
        document: {required}
      }
    },
    components:{
      customSelect,
      checkbox
    },
    methods:{
      handleDocumentOptionSelect(e){
        this.fields.document=e
      },
      clear(){

        for(let key in this.fields){
          this.fields[key] = null
        }
        
      },
      accept(){
        if(this.$v.$invalid) return

        this.$emit('form-data-ready',this.$data)
      },
    },
    mounted(){
    }
  }
</script>
<style lang='sass'>
@import './../vars.sass'

</style>