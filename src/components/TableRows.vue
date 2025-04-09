<template>
  <div :class="[`grid grid-cols-${cols} py-3 text-sm bg-darkBlue bg-opacity-40`]">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
type Props = {
  cols:number
}
withDefaults(defineProps<Props>(),{
  cols:4
})

</script>

<style lang="scss" scoped>

</style>
