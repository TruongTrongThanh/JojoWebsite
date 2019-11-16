import firebase from 'firebase/app'
import 'firebase/firestore'

type Firestore = firebase.firestore.Firestore

export default class FirebaseAPI {
  static config() {
    const firebaseConfig = {
      apiKey: process.env.VUE_APP_API_KEY,
      databaseURL: process.env.VUE_APP_DATABASE_URL,
      projectId: process.env.VUE_APP_PROJECT_ID
    }
    firebase.initializeApp(firebaseConfig)
  }

  static getDBInstance(): Firestore {
    return firebase.firestore()
  }
}

