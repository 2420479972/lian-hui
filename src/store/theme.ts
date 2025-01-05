import {defineStore} from "pinia";
import {StyleProvider} from '@varlet/ui'
import {getResource} from "utils/getFile.ts";


export const ThemeManager = defineStore('ThemeManager', () => {
    const theme = ref(localStorage.getItem('theme') || 'darkTheme');
    const baseTheme = {
        '--font-size-xs': '10px',
        '--font-size-sm': '12px',
        '--font-size-md': '14px',
        '--font-size-lg': '16px',
        '--icon-size-xs': '16px',
        '--icon-size-sm': '18px',
        '--icon-size-md': '20px',
        '--icon-size-lg': '22px',
        '--app-bar-height': '69px',
        '--popup-content-background-color': 'transparent',
        '--tabs-padding':'0'
    }
    const themeType = reactive({
        "lightTheme": {
            "--color-primary": "#fff",
            '--color-text': '#110D1E',
            '--app-bar-text-color': '#110D1E',
            '--app-bar-title-font-size': '16px',
            '--popup-content-background': '#fff',
            '--collapse-background': '#fff',
            '--collapse-text-color': '#0F0D1E',
            '--tabs-background': '#fff',
            '--tab-inactive-color': '#fff',
            "--color-body": '#fff',
            '--menu-background-color': '#fff',
            "--time-picker-body-background": "transparent",
            "--tab-color-text-selected": "#14A36E",
            "--tab-color-text": "#4E5969",
            "--pop-text-bg": "rgba(41,127,255,0.05)",
            "--pop-input-border-color": "#D2D2D2",
            "--counter-button-text-color": "#110D1E",
            "--input-border-color": "#D2D2D2",
            "--hot-token-search-bg": '#F3F3F4',
            "--hot-token-card-bg": "#F3F3F4",
            "--hot-token-card-color": "#605D75",
            "--hot-token-card-button-bg": "#00A579",
            "--hot-token-card-button-color": "#fff",
            "--search-text":"#4E5969",
            "--search-title":"#12151B",

            "--watch-robot--tab-bg":"#00A579",
            "--watch-robot-tab-selected":"#fff",
            "--watch-robot-tab":"#12151B",
            "--watch-robot-title":"#4E5969",
            "--watch-robot-stop-border":"#D2D2D2",
            "--watch-robot-start-border":"#00A579",
            "--watch-robot-start-text-color":"#fff",
            "--watch-robot-stop-text-color":"#4E5969",
            "--watch-robot-start-bg":"#00A579",
            "--watch-robot-more-color":"#86909C",

            "--watch-robot-header-bg": "linear-gradient(to right, rgba(0, 165, 121, 0.1), rgba(255, 255, 255, 0.1))",
            "--watch-robot-header-border-color": "linear-gradient(90deg, #00A579, #FFFFFF) 3 3",
            "--watch-robot-header-border-text": "#86909C",
            "--watch-robot-header-border-text-active": "#00A579",
            "--watch-robot-header-normal-bg": "#D2D2D2",
            "--watch-robot-header-solid": "#D2D2D2",
            "--watch-start-stop-bg":"#F3F3F4",

            "--airdrop-sbu-bg":"rgba(122,120,131,0.05)",
            "--airdrop-sbu-bg-border":"#D2D2D2",
            "--airdrop-sbu-bg-text":"rgba(78,89,105,0.4)",
            "--airdrop-card-bg":"#F3F3F4",
            "--airdrop-card-bg-border":"#F3F3F4",
            "--airdrop-card-number-bg":"#EAEAEA",
            "--airdrop-card-disabled":"#86909C",
            "--airdrop-card-receive":"#00A579",
            "--airdrop-card-dis-text":"#fff",

            "--intro-line-color":"#D2D2D2",
            "--intro-text-color":"#4E5969",
            "--intro-bg":"#F3F3F4",
            "--intro-bg-text-color":"#12151B",
            "--intro-number-bg":"rgba(0,165,121,0.05)",
            "--intro-number-color":"#00A579",

            "--scrollbar-color-track":"transparent",
            "--scrollbar-color-thumb":"#D2D2D2",
            "--time-picker-title-color":"#000",
            "--time-picker-clock-item-active-color":"#000",


            "--layout-switch-color-close":"rgba(0,165,121,0.2)",
            "--layout-switch-color-open":"#F3F3F4",

            "--layout-them-bg":"#F3F3F4",
            "--layout-them-color":"#12151B",
            "--layout-them-color-active":"#FFFFFF",
            "--layout-them-bg-active":"#00A579",
            "--airdrop-border-color":"#D2D2D2",



            "--member-button-bg":"#F3F3F4",
            "--member-button-bg-active":"#00A579",
            "--member-button-color":"#12151B",
            "--member-button-color-active":"#FFFFFF",
            "--member-header-text-color":"#72DBB5",
            "--member-header-text-bg":"#86909C",
            "--member-bottom-border":"#D2D2D2",
            "--member-bottom-bg":"#fff",
            "--member-card-bg":"#F3F3F4",
            "--member-cut-line":"#aaaaaa",
            "--member-make-bg-active":"#3481D7",
            "--member-make-bg":"#CFD3D7",
            "--member-make-bg-active_d":"#AECDEF",
            "--member-make-line-bg-active":"#AECDEF",
            "--member-make-line-bg":"#CFD3D7",
            "--member-step-text":"#86909C",
            "--member-step-text-active":"#3481D7",
            "--member-confirm-bg":"#00A579",
            "--member-pop-text":"#86909C",

            "--node-card-bg":"#F3F3F4",
        },
        "darkTheme": {
            "--color-primary": "#0F0D1E",
            '--color-text': '#fff',
            '--app-bar-text-color': '#fff',
            '--app-bar-title-font-size': '16px',
            '--popup-content-background': '#110D1E',
            '--collapse-background': '#0F0D1E',
            '--collapse-text-color': '#88878B',
            '--tabs-background': '#0F0D1E',
            '--tab-inactive-color': '#fff',
            "--color-body": '#0F0D1E',
            '--menu-background-color': '#0F0D1E',
            "--time-picker-body-background": "transparent",
            "--tab-color-text-selected": "#FFFFFF",
            "--tab-color-text": "rgba(255,255,255,0.4)",
            "--pop-text-bg": "#141934",
            "--pop-input-border-color": "#1D1A2A",
            "--counter-button-text-color": "#fff",
            "--input-border-color": "#1D1A2A",
            "--hot-token-search-bg": 'rgba(122,120,131,0.15)',
            "--hot-token-card-bg": "rgba(122,120,131,0.05)",
            "--hot-token-card-color": "#fff",
            "--hot-token-card-button-bg": "rgba(28,232,159,0.1)",
            "--hot-token-card-button-color": "#1CE89F",

            "--search-text":"rgba(255,255,255,0.7)",
            "--search-title":"rgba(255,255,255,0.7)",

            "--watch-robot--tab-bg":"rgba(52,129,215,0.05)",
            "--watch-robot-tab-selected":"#3481D7",
            "--watch-robot-tab":"#12151B",
            "--watch-robot-title":"rgba(255,255,255,0.4)",
            "--watch-robot-stop-border":"#1D1A2A",
            "--watch-robot-start-border":"transparent",
            "--watch-robot-start-text-color":"#3481D7",
            "--watch-robot-stop-text-color":"rgba(255,255,255,0.4)",
            "--watch-robot-start-bg":"rgba(52,129,215,0.1)",
            "--watch-robot-more-color":"#605D75",
            "--watch-robot-header-bg": "linear-gradient(to right, rgba(16, 59, 56, 0.1), rgba(16, 59, 56, 0.1))",
            "--watch-robot-header-border-color": "linear-gradient(90deg, #103B38, #103B38) 2 2",
            "--watch-robot-header-border-text": "#605D75",
            "--watch-robot-header-border-text-active": "#3481D7",
            "--watch-robot-header-normal-bg": "#22222F",
            "--watch-robot-header-solid": "#22222F",
            "--watch-start-stop-bg":"#919094",
            "--time-picker-title-color":"#fff",

            "--airdrop-sbu-bg":"rgba(122,120,131,0.05)",
            "--airdrop-sbu-bg-border":"#1D1A2A",
            "--airdrop-sbu-bg-text":"rgba(255,255,255,0.4)",
            "--airdrop-card-bg":"rgba(122,120,131,0.05)",
            "--airdrop-card-bg-border":"#1D1A2A",
            "--airdrop-card-number-bg":"rgba(122,120,131,0.05)",
            "--airdrop-card-disabled":"#86909C",
            "--airdrop-card-dis-text":"#000",
            "--airdrop-card-receive":"#00A579",

            "--intro-line-color":"rgba(255,255,255,0.2)",
            "--intro-text-color":"#4E5969",
            "--intro-bg":"rgba(102,102,102,0.2)",
            "--intro-bg-text-color":"#fff",
            "--intro-number-bg":"rgba(0,165,121,0.05)",
            "--intro-number-color":"#00A579",


            "--scrollbar-color-track":"transparent",
            "--scrollbar-color-thumb":"rgba(255, 255, 255, 0.1)",
            "--time-picker-clock-item-active-color":"#fff",

            "--layout-switch-color-close":"#16513c",
            "--layout-switch-color-open":"#3A3643",

            "--layout-them-bg":"rgba(148,147,151,0.3)",
            "--layout-them-color":"#999999",
            "--layout-them-color-active":"#1CE89F",
            "--layout-them-bg-active":"rgba(28,232,159,0.3)",
            "--airdrop-border-color":"#000",


            "--member-button-bg":"rgba(122,120,131,0.05)",
            "--member-button-bg-active":"rgba(52,129,215,0.2)",
            "--member-button-color":"#FFFFFF",
            "--member-button-color-active":"#3481D7",
            "--member-header-text-color":"#605D75",
            "--member-header-text-bg":"#fff",
            "--member-bottom-border":"transparent",
            "--member-bottom-bg":"transparent",
            "--member-card-bg":"rgba(122,120,131,0.05)",
            "--member-cut-line":"#fff",

            "--member-make-bg-active":"#3481D7",
            "--member-make-bg":"#22222F",
            "--member-make-bg-active_d":"#1F416C",
            "--member-make-line-bg-active":"#1F416C",
            "--member-make-line-bg":"#22222F",
            "--member-step-text":"#605D75",
            "--member-confirm-bg":"#1CE89F",
            "--member-pop-text":"#605D75",


            "--node-card-bg":"#140E20",
        }
    })
    const toggleTheme = (type: 'lightTheme' | 'darkTheme') => {
        StyleProvider({
            ...baseTheme,
            ...themeType[type]
        })
        localStorage.setItem('theme', type);
        theme.value = type;
    }


    const menuBg = computed(() => {
        if (theme.value === 'darkTheme') {
            return getResource('menu/dark', "header-bg.png")
        }
        if (theme.value === 'lightTheme') {
            return getResource('menu/light', "header-bg.png")
        }
    })

    const hotMenuBg = computed(() => {
        if (theme.value === 'darkTheme') {
            return getResource('hot-token/dark', "header-bg.png")
        }
        if (theme.value === 'lightTheme') {
            return getResource('hot-token/light', "header-bg.png")
        }
    })
    const memberHeaderBg = computed(() => {
        if (theme.value === 'darkTheme') {
            return getResource('hot-token/dark', "header-bg.png")
        }
        if (theme.value === 'lightTheme') {
            return getResource('hot-token/light', "header-bg.png")
        }
    })

    return {
        theme,
        toggleTheme,
        menuBg,
        hotMenuBg,
        memberHeaderBg
    }
})