
import { updaterFunction } from "./db.js";

const cells = document.querySelectorAll(".cell");
const winStatus = document.getElementById("win-status");

const instruction = document.getElementById("instruction");
const resetBtn = document.getElementById("reset-btn");

let gameRunning = false;
let won = false;

let randomChars = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]
let currentFunc = "start";

// let specialNumsList = [1, 25, 11, 9];


resetBtn.onclick = () => {
    currentFunc == "start" ? init() : reset();
};

function init() {
    gameRunning = true;
    shuffle();
    cells.forEach((cell) => {
        cell.addEventListener("click", clicked);
        cell.style.transition = `color ${cell.getAttribute("index") * 0.1}s`;
        cell.style.color = "#8e8492ff";
        // cell.textContent == 5 && (cell.style.color = "#4b4b4bff");
    });
    currentFunc = "reset";
    // resetBtn.innerHTML = "Reset";
    // winStatus.innerHTML = "reset";
    // instruction.style.color = "#666";
    updaterFunction("");
    won = false;
}
init();

// randomizing numbers and letters

function shuffle() {
    randomize(cells, randomChars);
};

// const 
function clicked() {
    let circle = document.createElement("span");
    circle.id = "circle";

    gameRunning = true;
    if (!this.classList.contains("clicked")) {


        this.classList.add("clicked");
        // let index = this.getAttribute("index");
        this.appendChild(circle);
        this.style.color = "#666";
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
        if (cell.textContent == num && !cell.classList.contains("clicked")) {
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
    if (count >= 5) {
        won = true;
        gameRunning = false;
        cells.forEach((cell) => {
            // if (specialNumsList.includes(Number(cell.textContent))) {
            //     cell.style.color = "#666699";
                
            // }
            cell.style.pointerEvents = "none";
            
        });
        // instruction.style.color = "#666";
        resetBtn.style.display = "inline";
        winStatus.innerHTML = "Bingo!";
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
        cell.style.pointerEvents = "all";
        cell.style.color = "transparent";
        cell.innerHTML = "";
    });
    // resetBtn.innerText = "Start";
    // currentFunc = "start";
    // winStatus.innerHTML = "start";
    instruction.style.color = "transparent";
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

export { executerFunction };



