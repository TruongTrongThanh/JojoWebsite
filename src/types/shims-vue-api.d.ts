import { IMangaAPI } from '@/apis/interface'
import { Helper } from '@/plugins/helper'
import { Framework } from 'vuetify'
type Firestore = firebase.firestore.Firestore

declare module 'vue/types/vue' {
  interface Vue {
    $mangaAPI: IMangaAPI
    $helper: Helper
    $vuetify: Framework
  }
}
