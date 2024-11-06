import {defineStore} from "pinia";
import {StyleProvider} from '@varlet/ui'
export const ThemeManager = defineStore('ThemeManager',()=>{
    const theme = ref('lightTheme');
    const baseTheme = {
        '--font-size-xs':'10px',
        '--font-size-sm':'12px',
        '--font-size-md':'14px',
        '--font-size-lg':'16px',
        '--icon-size-xs':'16px',
        '--icon-size-sm':'18px',
        '--icon-size-md':'20px',
        '--icon-size-lg':'22px',
    }
    const themeType = reactive({
        "lightTheme": {
            "--color-primary": "#fff",
            '--color-text':'#110D1E',
            '--app-bar-text-color':'#110D1E',
            '--app-bar-title-font-size':'16px',
            '--popup-content-background-color':'#fff',
            '--collapse-background':'#fff',
            '--collapse-text-color':'#0F0D1E',
            '--tabs-background':'#fff'
        },
        "darkTheme": {
            "--color-primary": "#0F0D1E",
            '--color-text':'#fff',
            '--app-bar-text-color':'#fff',
            '--app-bar-title-font-size':'16px',
            '--popup-content-background-color':'#110D1E',
            '--collapse-background':'#0F0D1E',
            '--collapse-text-color':'#88878B',
            '--tabs-background':'#0F0D1E'
        }
    })
    const toggleTheme = (type:'lightTheme' | 'darkTheme')=>{
        StyleProvider({
            ...baseTheme,
            ...themeType[type]
        })
        theme.value = type;
    }

    return{
        theme,
        toggleTheme
    }
})