<template>
  <form @submit.prevent="onFormSubmit">
      <slot/>
  </form>
</template>

<script setup lang="ts">
import {useForm} from "vee-validate";
const model = defineModel('formData')
const validationSchema = defineModel('validationSchema')
const isCustom = defineModel<boolean>('isCustom', {
  default:false
})

const emit = defineEmits(['success','update:formData'])

const {validate,resetForm,values,setFieldValue} = useForm({
  validationSchema:validationSchema,
  initialValues:model
});

watch(()=>model.value,(newVal:any)=>{
  Object.keys(newVal).forEach((item:any)=>{
    if(newVal[item]){
      setFieldValue(item,newVal[item])
    }
  })
},{
  deep:true
})

watch(()=>values,(newVal:any)=>{
  emit('update:formData',newVal)
},{
  deep:true
})


const validateForm =async (call:(value:any)=>void)=>{
  const { valid, errors } = await validate();
  if (valid) {
    call && call(values);
  } else {
    console.log(errors);
  }
}

// 手动控制表单提交
const onFormSubmit =async (event: Event) => {
  event.preventDefault();
  if(isCustom.value) return;
  const { valid, errors } = await validate();
  if (valid) {
    emit('success',values);
  } else {
    console.log(errors);
  }
};

defineExpose({
  resetForm,
  validateForm
})
</script>

<style lang="scss" scoped>

</style>
