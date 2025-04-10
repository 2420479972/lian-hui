<template>
  <div class="grid  py-3 text-sm" :style="{'grid-template-columns':`repeat(${cols}, minmax(0, 1fr))`}">
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
