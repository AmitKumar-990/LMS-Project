import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBG-jY1JH1NvUK4GptlVDpjcRgFa_vkUbA",
    authDomain: "lms-pjt.firebaseapp.com",
    projectId: "lms-pjt",
    storageBucket: "lms-pjt.firebasestorage.app",
    messagingSenderId: "972455827824",
    appId: "1:972455827824:web:60598a971332d5329ad7b5",
    measurementId: "G-4WZ8J28YN3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();