const selectBox = document.querySelector(".select-box"),
    selectBtnX = selectBox.querySelector(".options .playerX"),
    selectBtnO = selectBox.querySelector(".options .playerO"),
    playBoard = document.querySelector(".play-board"),
    players = document.querySelector(".players"),
    allBox = document.querySelectorAll("section span"),
    resultBox = document.querySelector(".result-box"),
    wonText = resultBox.querySelector(".won-text"),
    replayBtn = resultBox.querySelector("button");

let playerXIcon = "fas fa-times"; 
let playerOIcon = "far fa-circle";
let playerSign = "X";
let runBot = true;

window.onload = () => {

    allBox.forEach(box => {
        box.addEventListener("click", () => clickedBox(box));
    });
};


selectBtnX.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
};


selectBtnO.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    players.classList.add("active", "player");
};


function clickedBox(element) {
    if (players.classList.contains("player")) {
        playerSign = "O"; 
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.remove("active"); 
    } else {
        element.innerHTML = `<i class="${playerXIcon}"></i>`; 
        players.classList.add("active");
    }
    element.setAttribute("id", playerSign); 
    element.style.pointerEvents = "none"; 
    playBoard.style.pointerEvents = "none";
    selectWinner(); 

   
    const randomTimeDelay = Math.floor(Math.random() * 1000) + 200;
    setTimeout(() => {
        bot();
    }, randomTimeDelay);
}


function bot() {
    if (runBot) {
        const availableBoxes = [...allBox].filter(box => !box.childElementCount); 
        const randomBox = availableBoxes[Math.floor(Math.random() * availableBoxes.length)]; 

        if (randomBox) {
            if (players.classList.contains("player")) {
                playerSign = "X"; 
                randomBox.innerHTML = `<i class="${playerXIcon}"></i>`;
                players.classList.add("active");
            } else {
                playerSign = "O"; 
                randomBox.innerHTML = `<i class="${playerOIcon}"></i>`;
                players.classList.remove("active");
            }
            randomBox.setAttribute("id", playerSign);
            randomBox.style.pointerEvents = "none";
            selectWinner(); 
            playBoard.style.pointerEvents = "auto";
            playerSign = "X"; 
        }
    }
}


function getIdVal(classname) {
    return document.querySelector(".box" + classname).id;
}

function checkIdSign(val1, val2, val3, sign) {
    return getIdVal(val1) === sign && getIdVal(val2) === sign && getIdVal(val3) === sign;
}

function selectWinner() {
    const winningCombinations = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ];

    const isWinner = winningCombinations.some(combination => checkIdSign(...combination, playerSign));

    if (isWinner) {
        runBot = false; 
        setTimeout(() => {
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
            wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
        }, 700);
    } else if ([...allBox].every(box => box.id)) { 
        runBot = false;
        setTimeout(() => {
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
            wonText.textContent = "Match has been drawn!";
        }, 700);
    }
}


replayBtn.onclick = () => {
    window.location.reload();
};
