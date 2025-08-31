import { setNums, setMessage, setChatState, setWinner, resetGame, setPlayer } from "./db.js";

const gameBoard = document.getElementById("game-board");
const cells = document.querySelectorAll(".cell");
const winStatus = document.getElementById("win-status");
const resetBtn = document.getElementById("reset-btn");
const turn = document.getElementById("turn");
const header = document.getElementById("header");

let randomChars = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]

let username = localStorage.getItem("username") || "Nameless";
document.addEventListener("DOMContentLoaded", () => {
    if (username != "Nameless") {
        let name = document.getElementById("name");
        name.textContent = username;
    }
    resetGame("init");
    
});

resetBtn.addEventListener("click", resetGame);

function init() {
    shuffle();

    cells.forEach((cell) => {
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick);
        cell.style.transition = `color ${cell.getAttribute("index") * 0.1}s`;
        cell.style.color = "transparent";
        cell.querySelector("#circle") && cell.removeChild(cell.querySelector("#circle"));
    });
    setNums("");
    setMessage("");
    document.getElementById("chat-messages").innerHTML = "";
    document.getElementById("name").innerHTML = username;
    setChatState("close");
    setWinner("");
    resetGame("");
    setPlayer("");
    winStatus.style.top = "-100%";
    turn.style.display = "none";
    header.style.display = "flex";
}
// init();

function shuffle() {
    randomize(cells, randomChars);
};

function handleClick() {
    if (!this.classList.contains("clicked")) {
        setNums(this.textContent);
        setPlayer(username);
        turn.style.display = "block";
        header.style.display = "none";
        // console.log(username);
    }
}

function syncNums(num) {
    cells.forEach((cell) => {
        if (cell.textContent == num && !cell.classList.contains("handleClick")) {
            let cross = `<svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke=""><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#4e6d81"></path> </g></svg>`;
            cell.innerHTML = cross;
            cell.classList.add("clicked");
        }
    });
    checkBingo();

}



let iA = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];

function checkBingo() {
    const winPatterns = [
        // Rows
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24],
        // Columns
        [0, 5, 10, 15, 20],
        [1, 6, 11, 16, 21],
        [2, 7, 12, 17, 22],
        [3, 8, 13, 18, 23],
        [4, 9, 14, 19, 24],
        // Diagonals
        [0, 6, 12, 18, 24],
        [4, 8, 12, 16, 20],
    ];
    let count = 0;
    for (let i = 0; i < winPatterns.length; i++) {
        let pattern = winPatterns[i];
        let won = true;
        for (let j = 0; j < pattern.length; j++) {
            if (!cells[pattern[j]].classList.contains("clicked")) {
                won = false;
                break;
            }
        }
        won && count++;
    }

    if (count >= 5) {
        setChatState("open");
        setMessage(`<span id="username">${username}:</span> BINGO! I win!!`);
        setWinner(username);
    }



}

function reset() {

    cells.forEach((cell) => {
        let circle = cell.querySelector("#circle");
        circle && (cell.removeChild(circle));

        cell.style.transition = "none";
        cell.style.pointerEvents = "all";
        cell.style.color = "#4e6d81";
        cell.classList.remove("clicked");
    });
    init();
    // winStatus.style.display = "none";
}

function randomize(list, randomNum) {
    let numberList = [];
    for (let i = 0; i < list.length; i++) {
        numberList.push(i);
    }
    for (let i = 0; i < list.length; i++) {
        let j = Math.floor(Math.random() * (i + 1));
        [randomNum[i], randomNum[j]] = [randomNum[j], randomNum[i]];
    }
    for (let i = 0; i < list.length; i++) {
        list[numberList[i]].innerHTML = randomNum[i];
    }

}

let chatInp = document.getElementById("chat-inp");
let chatBtn = document.getElementById("chat-btn");
chatBtn.addEventListener("click",
    () => {
        // chatInp.focus();
        // toogleChat();
        if (document.activeElement != chatInp) chatInp.focus();
        else if (document.activeElement == chatInp) chatInp.blur();
    }
);

chatInp.addEventListener("blur", () => setChatState("close"));
chatInp.addEventListener("focus", () => setChatState("open"));
chatInp.addEventListener("keypress", sendText);

function toogleChat(chatState) {
    let chat = document.getElementById("chat-box");
    if (chatState == "open") chat.style.bottom = "5%";
    else if (chatState == "close") chat.style.bottom = "-500%";
    // let chatInp = document.getElementById("chat-inp");
    // chatInp.focus();
    // gameBoard.style.filter = gameBoard.style.filter == "blur(2px) opacity(0.5)" ? "blur(0px) opacity(1)" : "blur(2px) opacity(0.5)";
}

let editSvg = document.getElementById("edit-svg");
editSvg.addEventListener("click", () => {
    // let header = document.getElementById("header");
    let name = document.getElementById("name");
    // name.contentEditable = true;
    name.focus();
    name.addEventListener("blur", () => {
        // name.contentEditable = false;
        username = name.textContent.trim() || "Nameless";
        localStorage.setItem("username", username);
        name.textContent = username;
        // editSvg.style.display = "none";
        // header.style.backgroundColor = "transparent";
        // name.style.backgroundColor = "transparent";
        // name.style.color = "white";
    });
});

function sendText(e) {
    if (e.key == "Enter") {
        let text = chatInp.value;
        text.trim() && setMessage(`<span id="username">${username}</span>: ` + text);
        console.log(`<span id="username">${username}</span>: ` + text);
        chatInp.value = "";
    }
}

function updateMessages(msg) {
    let li = document.createElement("li");
    li.className = "message";
    li.innerHTML = msg;
    document.getElementById("chat-messages").appendChild(li);
    setMessage("");
}

function showWinner(winner) {
    let username = localStorage.getItem("username") || "Nameless";
    winStatus.style.top = "5%";
    if (winner == username) {
        winStatus.innerHTML = "You Win!";
    } else if (winner && winner != username) {
        winStatus.innerHTML = `${winner} Wins!`;
    }
    winner && document.querySelectorAll(".cell").forEach((cell) => {
        cell.style.pointerEvents = "none";
    });
}
function showTurn(player) {
    if (player == "") {
        cells.forEach((cell) => cell.style.pointerEvents = "all");
    } else if (player == username) {
        turn.innerHTML = `Opponent's Turn!`;
        cells.forEach((cell) => cell.style.pointerEvents = "none");
    } else {
        turn.innerHTML = `Your Turn!`;
        cells.forEach((cell) => cell.style.pointerEvents = "all");
    }
    // console.log("player:", player || "''", "username:", username);
    console.log("triggered showTurn by", player);
}

export { syncNums, updateMessages, toogleChat, showWinner, reset, showTurn };

// PWA install prompt
let deferredPrompt;
document.addEventListener("DOMContentLoaded", () => {
    let installBtn = document.getElementById("install-b");
    // console.log(installBtn);
    installBtn.style.display = "none";

    window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installBtn.style.display = "inline";
    });

    installBtn.addEventListener("click", () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(() => {
                deferredPrompt = null;
                installBtn.style.display = "none";
            });
        }
    });
});

// localStorage.removeItem("username");