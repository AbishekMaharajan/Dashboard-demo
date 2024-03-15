import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAtt3LhqPJbhJT0cKhx98aGQGhhQrl6GSs",
  authDomain: "vrarri-dashboard-demo-2d19d.firebaseapp.com",
  projectId: "vrarri-dashboard-demo-2d19d",
  storageBucket: "vrarri-dashboard-demo-2d19d.appspot.com",
  messagingSenderId: "1058234796001",
  appId: "1:1058234796001:web:ba3542537e64c60ec874a0",
  measurementId: "G-3VN7GVH52X"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getDatabase(app);

export const scoreListRef = ref(db, "users/ysHotel/staffsScoreList");
export const liveListRef = ref(db, "users/ysHotel/dataList/liveList");
export const simulationListRef = ref(db, "users/ysHotel/simulationlist/live");

export default app;
