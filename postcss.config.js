export default {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        'postcss-px-to-viewport-8-plugin': {
            viewportWidth: 540,
            unitPrecision: 6,
            unitToConvert: 'px',
            viewportUnit: 'vmin',
            fontViewportUnit: 'vmin',
            propList: ['*'],
        }
    },
}
