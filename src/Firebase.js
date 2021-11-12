import {initializeApp} from 'firebase/app'
import { getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import { firebaseConfig } from './FirebaseCred'


const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export default getFirestore()


/* 
  apiKey: process.env.REACT_FIREBASE_APP_API_KEY,
  authDomain:process.env.REACT_FIREBASE_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_FIREBASE_APP_PROJECT_ID,
  storageBucket: process.env.REACT_FIREBASE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_FIREBASE_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_FIREBASE_APP_APP_ID,
  measurementId: process.env.REACT_FIREBASE_APP_MEASUREMENT_ID
*/