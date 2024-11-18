import { createI18n } from 'vue-i18n'

const messages = {
    en: {
        message: {
            hello: 'hello world'
        }
    },
    zn: {
        message: {
            hello: 'こんにちは、世界'
        }
    }
}
const i18n = createI18n({
    locale: 'zn',
    messages
})

export default i18n