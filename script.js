import { updaterFunction, msgFunction, chatStateUpdater } from "./db.js";

const cells = document.querySelectorAll(".cell");
const winStatus = document.getElementById("win-status");

const instruction = document.getElementById("instruction");
const resetBtn = document.getElementById("reset-btn");
const gameBoard = document.getElementById("game-board");

let gameRunning = false;
// let won = false;

let randomChars = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]

// let specialNumsList = [1, 25, 11, 9];


resetBtn.addEventListener("click", reset);

function init() {
    gameRunning = true;
    shuffle();
    cells.forEach((cell) => {
        cell.addEventListener("click", handleClick);
        cell.style.transition = `color ${cell.getAttribute("index") * 0.1}s`;
        cell.style.color = "transparent";
        // cell.textContent == 5 && (cell.style.color = "#4b4b4bff");
    });
    // resetBtn.innerHTML = "Reset";
    // winStatus.innerHTML = "reset";
    // instruction.style.color = "#4e6d81";
    updaterFunction("");
    msgFunction("");
    chatStateUpdater("close");
    // won = false;
}
init();

// randomizing numbers and letters

function shuffle() {
    randomize(cells, randomChars);
};

// const 
function handleClick() {
    let cross = `<svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke=""><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#4e6d81"></path> </g></svg>`;

    gameRunning = true;
    if (!this.classList.contains("clicked")) {


        this.classList.add("clicked");
        // let index = this.getAttribute("index");
        this.innerHTML = cross;
        this.style.color = "#4e6d81";
        updaterFunction(this.textContent);
        // iA[index] = "w";
        checkBingo();
    }
    // this.style.pointerEvents = "none";
    // instruction.style.color = "transparent";
    // console.log(this.textContent);
    // console.log(iA);

}

function executerFunction(num) {
    cells.forEach((cell) => {
        if (cell.textContent == num && !cell.classList.contains("handleClick")) {
            cell.click();
        }
    });
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
        if (won) {
            count++;
        }
    }
    let circle = document.createElement("span");
    circle.id = "circle";

    if (count >= 5) {
        // won = true;
        // gameRunning = false;

        cells.forEach((cell) => {
            // if (specialNumsList.includes(Number(cell.textContent))) {
            //     cell.style.color = "#4e6d81699";

            // }
            (!cell.classList.contains("clicked")) && (cell.appendChild(circle.cloneNode()));
            cell.style.pointerEvents = "none";

        });
        // instruction.style.color = "#4e6d81";
        resetBtn.style.display = "inline";
        winStatus.innerHTML = "B I N G O !";
        winStatus.style.display = "inline";
        console.log("Congratulations! You won!");
    }



    // let iA = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];

    // let strokeCount = 0;

    // winPatterns.forEach(pattern => {
    //     if (pattern.every(index => iA[index])) {
    //         strokeCount++;
    //     }
    // });

    // // return strokeCount > (isUser ? userPatterns : computerPatterns);
    // // strokeCount == 5 ? won = true : won = false;

    // // if (won == true) {
    // if (strokeCount == 5) {
    //     gameRunning = false;
    //     winStatus.style.display = "block";
    //     winStatus.innerHTML = "Bingo!";
    // }
    // // console.log("w:" + w);
    // // console.log("$[0]:" + $[0].every((el) => el == "w"));

}

function reset() {

    cells.forEach((cell) => {
        let circle = cell.querySelector("#circle");
        circle && (cell.removeChild(circle));

        cell.style.transition = "none";
        cell.style.pointerEvents = "all";
        cell.style.color = "#ffdcdc";
        cell.classList.remove("clicked");
    });
    init();
    // this.style.display = "none";
    winStatus.style.display = "none";
    // resetBtn.innerText = "Start";
    // currentFunc = "start";
    // winStatus.innerHTML = "start";
    // instruction.style.color = "transparent";
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

chatInp.addEventListener("blur", () => chatStateUpdater("close"));
chatInp.addEventListener("focus", () => chatStateUpdater("open"));
chatInp.addEventListener("keypress", sendText);

function toogleChat(chatState) {
    let chat = document.getElementById("chat-box");
    if (chatState == "open") chat.style.bottom = "0%";
    else if (chatState == "close") chat.style.bottom = "-500%";

    // chatInp.focus();
    // gameBoard.style.filter = gameBoard.style.filter == "blur(2px) opacity(0.5)" ? "blur(0px) opacity(1)" : "blur(2px) opacity(0.5)";
}

function sendText(e) {
    if (e.key == "Enter") {
        let text = chatInp.value;
        text.trim() && msgFunction(text);
        chatInp.value = "";
    }
}

function msgUpdaterFunction(msg) {
    let li = document.createElement("li");
    li.id = "message";
    li.innerHTML = msg;
    document.getElementById("chat-messages").appendChild(li);
}




export { executerFunction, msgUpdaterFunction, toogleChat };



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

