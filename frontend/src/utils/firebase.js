import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyDNKSxy3OUqnMDPcLBxiVvBv7AEIliRlo8",
  authDomain: "totalfitness-9fa69.firebaseapp.com",
  projectId: "totalfitness-9fa69",
  storageBucket: "totalfitness-9fa69.firebasestorage.app",
  messagingSenderId: "738033172027",
  appId: "1:738033172027:web:900e81f9e3742bccb9261e",
  measurementId: "G-BC2DMTLB7K"
};
const app = initializeApp(firebaseConfig);


export const Authentication = getAuth(app)
