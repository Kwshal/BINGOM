import { syncNums, msgUpdaterFunction, toogleChat, showWinner } from "./script.js";
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
const dbRef2 = ref(db, 'bingom/msgs');
const dbRef3 = ref(db, 'bingom/chatState');
const dbRef4 = ref(db, 'bingom/winner');


let updateNums = (num) => {
    // console.log(num);
    set(dbRef, num);

}
let msgFunction = (msg) => {
    set(dbRef2, msg);
}
let chatStateUpdater = (val) => {
    set(dbRef3, val);
}
let setWinner = (val) => {
    set(dbRef4, val);
}

onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    // console.log(data);
    syncNums(data);
});
onValue(dbRef2, (snapshot) => {
    const data = snapshot.val();
    data && msgUpdaterFunction(data);
});
onValue(dbRef3, (snapshot) => {
    const data = snapshot.val();
    toogleChat(data);
    data == "open" && document.getElementById("chat-inp").focus();
    // console.log(data);
});
onValue(dbRef4, (snapshot) => {
    const data = snapshot.val();
    showWinner(data);
});

export { updateNums, msgFunction, chatStateUpdater, setWinner };
