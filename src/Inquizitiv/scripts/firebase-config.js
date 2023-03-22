import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDAEot7Sj1sP7fZh8NelsKSvGYakQ1jyrc",
    authDomain: "ishanpranav.github.io",
    projectId: "inquizitiv-2ca1f",
    storageBucket: "inquizitiv-2ca1f.appspot.com",
    messagingSenderId: "53634781396",
    appId: "1:53634781396:web:21d1fe449438c8245eab41"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
