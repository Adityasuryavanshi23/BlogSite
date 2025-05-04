
import { initializeApp } from "firebase/app";
import { getAuth  , GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCupz0sdjUKk6ZUHdZgIeoz4xtSc_h_TeM",
  authDomain: "aditya-7847c.firebaseapp.com",
  projectId: "aditya-7847c",
  storageBucket: "aditya-7847c.firebasestorage.app",
  messagingSenderId: "630057436202",
  appId: "1:630057436202:web:0bd263f03a42bd8863af53"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
 export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();