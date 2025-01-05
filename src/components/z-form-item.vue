<template>
  <div class="w-full space-y-[18px]" >
    <template v-if="label">
      <slot name="label" :label="label">
        <div class="text-[18px] opacity-[0.4]">
          {{label}}
        </div>
      </slot>
    </template>
    <template v-if="type == 'custom'">
      <slot  :fieldValue="fieldValue"
             :input="updateFieldValue"></slot>
    </template>
    <template v-if="!type || type == 'text' || type == 'password'">
      <input :placeholder="placeholder"
             :type="!type ? 'text' : type "
             :name="name"
             v-model="fieldValue"
             v-bind="$attrs"
             class="w-full rounded-[5px] h-[45px] bg-transparent border-[2px] border-[var(--pop-input-border-color)] outline-0 px-[15px]">
    </template>
    <template v-if="type == 'textarea'">
      <textarea :placeholder="placeholder"
                v-model="fieldValue"
                :name="name"
                v-bind="$attrs"
                class="w-full rounded-[5px] h-[154px] bg-transparent border-[2px] border-[var(--pop-input-border-color)] outline-0 p-[15px]"
                cols="30" rows="5"></textarea>
    </template>
    <span v-if="errorMessage" class="text-[16px] text-red-500 pl-[8px] pt-[5px]">{{errorMessage}}</span>
  </div>
</template>

<script lang="ts" setup>
import {useField} from "vee-validate";

type Props = {
  type?: 'text' | 'password' | 'select' | 'textarea' | 'custom',
  placeholder?: string,
  options?: Array<{ label: string, value: string }>,
  disabled?: boolean,
  required?: boolean,
  validation?:any,
  name: any,
  label?:string,
}

const props = withDefaults(defineProps<Props>(), {
  type: undefined,
  placeholder: '',
  disabled: false,
  required: false,
  name: '',
})


const { value: fieldValue, errorMessage } = useField(props.name, props.validation);

const updateFieldValue = (newValue: any) => {
  fieldValue.value = newValue;
};
</script>

<style lang="scss" scoped>
textarea {
  resize: none;
}
</style>