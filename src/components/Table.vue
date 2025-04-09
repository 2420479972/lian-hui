<template>
  <div :class="['grid   py-3  text-xs text-gray-400 font-medium',`grid-cols-${cols}`]">
      <slot name="header"></slot>
  </div>
  <div :class="['flex-1 w-full overflow-y-auto overflow-x-hidden',customClass]">
    <slot name="body"></slot>
  </div>
</template>

<script setup lang="ts">
type Props = {
  cols:number,
  customClass:string
}
withDefaults(defineProps<Props>(),{
  cols:4,
  customClass:''
})

</script>

<style lang="scss" scoped>

</style>
