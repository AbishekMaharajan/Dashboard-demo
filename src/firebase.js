import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCTsPsHStV5cRO3NVW_NRWvABFAdbVJI08",
  authDomain: "vaarri-communicationtraining.firebaseapp.com",
  databaseURL: "https://vaarri-communicationtraining-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vaarri-communicationtraining",
  storageBucket: "vaarri-communicationtraining.appspot.com",
  messagingSenderId: "692526520052",
  appId: "1:692526520052:web:78e327400b2e3dc252f0a1",
  measurementId: "G-N35LCCXNEF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

export const BASE_URL = app?.options?.databaseURL || '';
export const scoreListRef = ref(db, "users/ysHotel/staffsScoreList");
export const liveListRef = ref(db, "users/ysHotel/dataList/liveList");
export const simulationListRef = ref(db, "users/ysHotel/simulationlist/live");


export default app;
