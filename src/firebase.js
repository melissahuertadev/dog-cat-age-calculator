import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbHwS7wK6aW2ru_CWdWWF0QUk9iR_GyQY",
  authDomain: "guiaparamascotafeliz.firebaseapp.com",
  projectId: "guiaparamascotafeliz",
  storageBucket: "guiaparamascotafeliz.firebasestorage.app",
  messagingSenderId: "939665572461",
  appId: "1:939665572461:web:c824d8d3c4d489d352f564",
  measurementId: "G-XWR7GNXDV5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Save data
const savePetData = async(data) => {
    try {
        const docRef = await addDoc(collection(db, "pets"), data);
        console.log("Documento guardado con ID: ", docRef.id);
    } catch (e) {
        console.error("Error al guardar:", e)
    }
}

export { savePetData };