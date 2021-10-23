import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDrwjD0JPMpBBK_rVCX__CHqJc4ZUIvyEg",
  authDomain: "selfcare-fiap.firebaseapp.com",
  databaseURL: "https://selfcare-fiap-default-rtdb.firebaseio.com",
  projectId: "selfcare-fiap",
  storageBucket: "selfcare-fiap.appspot.com",
  messagingSenderId: "696320560524",
  appId: "1:696320560524:web:2fd548849e97069e289aa9"
};

const firebase = initializeApp(firebaseConfig);
const firestore = getFirestore(firebase);
const database = getDatabase(firebase);
export { firebase, firestore, database };
