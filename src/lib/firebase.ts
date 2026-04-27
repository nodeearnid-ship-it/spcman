import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Analytics cuma jalan di browser, babi!
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBnCWC7eu0j6x39w8iyVXuOml0-i2XB98E",
  authDomain: "coinvest-7688d.firebaseapp.com",
  databaseURL: "https://coinvest-7688d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "coinvest-7688d",
  storageBucket: "coinvest-7688d.firebasestorage.app",
  messagingSenderId: "1076726466236",
  appId: "1:1076726466236:web:16a54393b41135325ab2b9",
  measurementId: "G-H0K7C5ZW1P"
};

// Inisialisasi Firebase (Cek biar gak double init)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Inisialisasi Firestore
const db = getFirestore(app);

// Inisialisasi Analytics (Hanya di Client/Browser)
const analytics = typeof window !== "undefined" ? isSupported().then(yes => yes ? getAnalytics(app) : null) : null;

export { app, db, analytics };
