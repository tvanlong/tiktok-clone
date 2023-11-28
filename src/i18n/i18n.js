import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
// en
import HEADER_EN from '~/locales/en/header.json'
import HOME_EN from '~/locales/en/home.json'
import EDITPROFILE_EN from '~/locales/en/editProfile.json'
import PROFILE_EN from '~/locales/en/profile.json'
import FOLLOWING_EN from '~/locales/en/following.json'
import SIDEBAR_EN from '~/locales/en/sidebar.json'
import UPLOAD_EN from '~/locales/en/upload.json'
import VIDEO_EN from '~/locales/en/video.json'

// vi
import HEADER_VI from '~/locales/vi/header.json'
import HOME_VI from '~/locales/vi/home.json'
import EDITPROFILE_VI from '~/locales/vi/editProfile.json'
import PROFILE_VI from '~/locales/vi/profile.json'
import FOLLOWING_VI from '~/locales/vi/following.json'
import SIDEBAR_VI from '~/locales/vi/sidebar.json'
import UPLOAD_VI from '~/locales/vi/upload.json'
import VIDEO_VI from '~/locales/vi/video.json'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
}

const defaultNS = 'home'

const resources = {
  en: {
    header: HEADER_EN,
    home: HOME_EN,
    editProfile: EDITPROFILE_EN,
    profile: PROFILE_EN,
    following: FOLLOWING_EN,
    sidebar: SIDEBAR_EN,
    upload: UPLOAD_EN,
    video: VIDEO_EN
  },
  vi: {
    header: HEADER_VI,
    home: HOME_VI,
    editProfile: EDITPROFILE_VI,
    profile: PROFILE_VI,
    following: FOLLOWING_VI,
    sidebar: SIDEBAR_VI,
    upload: UPLOAD_VI,
    video: VIDEO_VI
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  ns: ['home', 'editProfile', 'profile', 'following', 'sidebar', 'upload', 'video'],
  defaultNS,
  fallbackLng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false
  }
})
