import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";

// Production
// const firebaseConfig = {
//   apiKey: "AIzaSyDK14cv_UxdDs6jy_MnN0aZS1oxDp3ezDc",
//   authDomain: "restaurant-communication.firebaseapp.com",
//   databaseURL:
//     "https://restaurant-communication-default-rtdb.asia-southeast1.firebasedatabase.app",

//   projectId: "restaurant-communication",
//   storageBucket: "restaurant-communication.appspot.com",
//   messagingSenderId: "841547074076",
//   appId: "1:841547074076:web:63b3f99965b552ec226dd9",
//   measurementId: "G-GB7EPP36H1",
// };

// Development
const firebaseConfig = {
  apiKey: "AIzaSyBQGBf5ZsN3Y4JtYBLRIGUFyA27D1-i5lw",
  authDomain: "ys-hotel-dev-server.firebaseapp.com",
  databaseURL:
    "https://ys-hotel-dev-server-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ys-hotel-dev-server",
  storageBucket: "ys-hotel-dev-server.appspot.com",
  messagingSenderId: "210397785079",
  appId: "1:210397785079:web:3239ea181e41132cd5dcf2",
  measurementId: "G-E2ZNEK8CKR",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getDatabase(app);

export const scoreListRef = ref(db, "users/ysHotel/staffsScoreList");
export const liveListRef = ref(db, "users/ysHotel/dataList/liveList");
export const simulationListRef = ref(db, "users/ysHotel/simulationlist/live");

export default app;
