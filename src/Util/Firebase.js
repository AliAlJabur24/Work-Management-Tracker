import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDiPSQZtQ9ayB20MlheV1rfzZAfYQWb2J8",
  authDomain: "work-management-tracker.firebaseapp.com",
  projectId: "work-management-tracker",
  storageBucket: "work-management-tracker.appspot.com",
  messagingSenderId: "990145957591",
  appId: "1:990145957591:web:85fa929f6831d1de61ea92"
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);