
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDTH7l_4FBpz1DZp7lvsOTtSggO8lN7ScE",
    authDomain: "ilya222.firebaseapp.com",
    projectId: "ilya222",
    storageBucket: "ilya222.firebasestorage.app",
    messagingSenderId: "520717626364",
    appId: "1:520717626364:web:6a466a6b8312daffc02079",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);