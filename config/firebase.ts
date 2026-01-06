import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC_h6juz6hec4qfqs7O3ekG44AyH6ga8Jc",
    authDomain: "fitwear-d5bae.firebaseapp.com",
    projectId: "fitwear-d5bae",
    storageBucket: "fitwear-d5bae.firebasestorage.app",
    messagingSenderId: "1096148286322",
    appId: "1:1096148286322:web:c7210ff922963f8eecbbeb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);