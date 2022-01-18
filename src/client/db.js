// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA611RIzoUlxDIU4V0bfGeWjqvB8QD9mLs',
  authDomain: 'prepify-9b974.firebaseapp.com',
  projectId: 'prepify-9b974',
  storageBucket: 'prepify-9b974.appspot.com',
  messagingSenderId: '654848986044',
  appId: '1:654848986044:web:c61dfb1915e1260977b9b9',
  measurementId: 'G-L7PE3JMWG3',
}

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig)
export const auth = app.auth()
export const storage = getStorage()
export const db = getFirestore()
// const analytics = firebase.getAnalytics(app)
