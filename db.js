import { executerFunction } from "./script.js";
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
     apiKey: "AIzaSyABxgXrl0ZawYX4U_Bqpt9HRVgSaW1CA7k",
     authDomain: "bingo-ace.firebaseapp.com",
     databaseURL: "https://bingo-ace-default-rtdb.asia-southeast1.firebasedatabase.app",
     projectId: "bingo-ace",
     storageBucket: "bingo-ace.firebasestorage.app",
     messagingSenderId: "932968616436",
     appId: "1:932968616436:web:dbe017a0a451dcfde329a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(db, 'bingom/num');

onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    executerFunction(data);
});

let updaterFunction = (num) => {
    set(dbRef, num);

}

export { updaterFunction };
