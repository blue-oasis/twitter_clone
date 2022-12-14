// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";
// firebase 9 버전 되면서 import 방법 바뀜 !!! 
// import firebase from "firebase/app" 대신 위에꺼

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// 보안적용 .env
const firebaseConfig = {
  apiKey: process.env.REACT_APP_Api_Key,
  authDomain: process.env.REACT_APP_Auth_Domain,
  projectId: process.env.REACT_APP_Project_Id,
  storageBucket: process.env.REACT_APP_Storage_Bucket,
  messagingSenderId: process.env.REACT_APP_Messaging_Sender_Id,
  appId: process.env.REACT_APP_App_Id
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseInstance = getAuth();
export const authService = getAuth();
export const dbService = getFirestore();
export const storageService = getStorage();