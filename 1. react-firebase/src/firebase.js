import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // 💡 [과제 1] Firebase 콘솔에서 복사한 설정값을 여기에 넣으세요!
  apiKey: "AIzaSyB-2sWBN0BRQ6xTehtIndGG4WPQOk3t4xE",
  authDomain: "react-firebase-63d3f.firebaseapp.com",
  databaseURL: "https://react-firebase-63d3f-default-rtdb.firebaseio.com",
  projectId: "react-firebase-63d3f",
  storageBucket: "react-firebase-63d3f.firebasestorage.app",
  messagingSenderId: "926856343605",
  appId: "1:926856343605:web:3657448297561021d8c17c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);