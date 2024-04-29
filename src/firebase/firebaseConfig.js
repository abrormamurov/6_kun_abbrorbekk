import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcqAT7f-hjSuZtwC8vmbpEJgm0xljUQFQ",
  authDomain: "mymarket-3f465.firebaseapp.com",
  projectId: "mymarket-3f465",
  storageBucket: "mymarket-3f465.appspot.com",
  messagingSenderId: "546313030491",
  appId: "1:546313030491:web:52e622409debea0470a87e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
