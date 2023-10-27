// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBlygPa3NM2OxIHCLrQfXpVoFDIpRfqdbY",
  authDomain: "mygram-1f741.firebaseapp.com",
  projectId: "mygram-1f741",
  storageBucket: "mygram-1f741.appspot.com",
  messagingSenderId: "429520991160",
  appId: "1:429520991160:web:29581576a3a442db8bd54d"
};


export const firebaseApp = initializeApp(firebaseConfig);
// Banco de Dados
export const db = getFirestore(firebaseApp)

// Caminho para o Firebase
export const auth = getAuth(firebaseApp)

// Uploads de imagens
export const storage = getStorage(firebaseApp)