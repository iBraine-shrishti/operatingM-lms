import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBTKzVMMuOZKuCWMuczkgto4sv4z442J5M",
  authDomain: "operatingmedia-crm-c6b90.firebaseapp.com",
  databaseURL:
    "https://operatingmedia-crm-c6b90-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "operatingmedia-crm-c6b90",
  storageBucket: "operatingmedia-crm-c6b90.firebasestorage.app",
  messagingSenderId: "125142310970",
  appId: "1:125142310970:web:6fc9a41ec7864bbe349503",
  measurementId: "G-Y6MP2KNT9T",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
