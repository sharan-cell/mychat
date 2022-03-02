// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOFIYrrRXPpmnwzGCtiIYOgOsPYuj3k90",
  authDomain: "mychat-f0dfa.firebaseapp.com",
  projectId: "mychat-f0dfa",
  storageBucket: "mychat-f0dfa.appspot.com",
  messagingSenderId: "865325842143",
  appId: "1:865325842143:web:77ca71c6d6cb9a8c68336a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app)