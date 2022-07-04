import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      showPassword: 'Show password',
      hidePassword: 'Hide password',
      signIn: 'Sign in to',
      invalidMsg: 'Invalid credentials. Please try again'
    }
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false
  }
})

export default i18n
