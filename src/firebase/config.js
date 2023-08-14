import firebase from "firebase/app";

// importing services
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyClegYmFGuh3eP0ca9Ogb7HrPin-I1Ykvg",
    authDomain: "mymoney-41118.firebaseapp.com",
    projectId: "mymoney-41118",
    storageBucket: "mymoney-41118.appspot.com",
    messagingSenderId: "546954691093",
    appId: "1:546954691093:web:2b65a9ce822c311c60041c"
};

// initilize firebase
firebase.initializeApp(firebaseConfig);

// initlize services
const projectFirestore = firebase.firestore();

export { projectFirestore };