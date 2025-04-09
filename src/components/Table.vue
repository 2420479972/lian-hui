<template>
  <component :is="Header"></component>
  <div :class="['flex-1 w-full overflow-y-auto overflow-x-hidden',customClass]">
    <slot name="body"></slot>
  </div>
</template>

<script setup lang="ts">
type Props = {
  cols:number,
  customClass:string
}
const props = withDefaults(defineProps<Props>(),{
  cols:4,
  customClass:''
})

const Header = h('div',{
  class:['grid   py-3  text-xs text-gray-400 font-medium',`grid-cols-${props.cols}`]
},{
  header: () => h('h1', '我是标题'),
})

</script>

<style lang="scss" scoped>

</style>
