import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'
import { getAuth } from "firebase/auth";
const firebaseConfig = {//add your own credentials here
    apiKey: ----------------------------------
    authDomain: -------------------------------
    projectId: ----------------------------
    storageBucket: ------------------------
    messagingSenderId: -----------------------
    appId: --------------------------
    measurementId: --------------------
  };
 
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
  export const auth = getAuth(app);
