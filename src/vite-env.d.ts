/// <reference types="vite/client" />

declare module 'vue3-scroll-seamless';
declare module '@fontsource/pacifico';

// 添加Vue文件的类型声明
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}