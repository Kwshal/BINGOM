import { syncNums, updateMessages, toogleChat, showWinner, reset, showTurn } from "./script.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

// Firebase configuration
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

const numRef = ref(db, 'bingom/num');
const msgsRef = ref(db, 'bingom/msgs');
const chatStateRef = ref(db, 'bingom/chatState');
const winnerRef = ref(db, 'bingom/winner');
const resetRef = ref(db, 'bingom/reset');
const playerRef = ref(db, 'bingom/player');


let setNums = (num) => {
    // console.log(num);
    set(numRef, num);

}
let setMessage = (msg) => {
    set(msgsRef, msg);
}
let setChatState = (state) => {
    set(chatStateRef, state);
}
let setWinner = (player) => {
    set(winnerRef, player);
}
let resetGame = (val) => {
    set(resetRef, val);
}
let setPlayer = (player) => {
    set(playerRef, player);
}

onValue(numRef, (snapshot) => {
    const data = snapshot.val();
    syncNums(data);
});
onValue(msgsRef, (snapshot) => {
    const data = snapshot.val();
    data && updateMessages(data);
});
onValue(chatStateRef, (snapshot) => {
    const data = snapshot.val();
    toogleChat(data);
    data == "open" && document.getElementById("chat-inp").focus();
    // console.log(data);
});
onValue(winnerRef, (snapshot) => {
    const data = snapshot.val();
    showWinner(data);
});
onValue(resetRef, (snapshot) => {
    const data = snapshot.val();
    data && reset();
});
onValue(playerRef, (snapshot) => {
    const data = snapshot.val();
    showTurn(data);
    // console.log("playerRef data:", data);
});

export { setNums, setMessage, setChatState, setWinner, resetGame, setPlayer };
