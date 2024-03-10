let playerInfo = document.querySelector(".player-info");
let btn = document.querySelector(".btn");
let boxes = document.querySelectorAll(".box");

let gameGrid; 
const winPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let currPlayer;

function startGame() {

    console.log("Game started ! ")
    currPlayer = "X";
    playerInfo.innerText = `Current Player - ${currPlayer}`;
    gameGrid = ["","","","","","","","","",]; // intially all the boxes or gird will be empty

    boxes.forEach((box) => {
        box.innerText = "";
        box.style.pointerEvents = "all";
        box.classList.remove("win");
    })
    btn.classList.remove("active");
    document.querySelector(".winner").innerHTML = "";


}

startGame();

boxes.forEach((box,index) => {
    box.addEventListener("click", () => {
        // updating the box and making it unclikabe
        document.querySelector(`#box${index+1}`).innerText = currPlayer;
        document.querySelector(`#box${index+1}`).style.pointerEvents = 'none';

        // updating in our game grid
        gameGrid[index] = currPlayer;

        //checking whether game is over i.e {win, tie ,or to continue}
        gameOver();

        // swapping the player
        swapPlayer();

    })
})

function swapPlayer() {
    if(currPlayer === "X") {
        currPlayer = "O";
    } else {
        currPlayer = "X";
    }

    playerInfo.innerText = `Current Player - ${currPlayer}`;
}

function changeColor(index1,index2,index3) {
    document.querySelector(`#box${index1 + 1}`).classList.add("win")
    document.querySelector(`#box${index2 + 1}`).classList.add("win");
    document.querySelector(`#box${index3 + 1}`).classList.add("win");
}


function gameOver() {
    // win or not
    console.log(gameGrid);
    winPositions.forEach((condition) => {

        //  checking are there are non - empty boxes as per our winning conditons or positions
        if((gameGrid[condition[0]] !== "" && gameGrid[condition[1]] !== "" && gameGrid[condition[2]] !== "") ) {

            // check those non empty boxes  as per the conditions
            if((gameGrid[condition[0]] === gameGrid[condition[1]] && gameGrid[condition[1]] === gameGrid[condition[2]])) {
                if(gameGrid[condition[0]] === "X") {
                    // Player x wins
                    // update the UI
                    changeColor(condition[0],condition[1],condition[2]);
                    document.querySelector(".winner").innerText = "X Won the game !!";

                    // And stop the game
                    boxes.forEach(box => {
                        box.style.pointerEvents = "none";
                    })

                    
                } else {
                    // player o wins 
                    changeColor(condition[0],condition[1],condition[2]);
                    document.querySelector(".winner").innerText = "O Won the game !!";

                    boxes.forEach(box => {
                        box.style.pointerEvents = "none";
                    })

                }

                btn.classList.add("active");
            }

            return;
            
        }
    });


    // tie or not

    flag = true;
    for(let i=0; i<gameGrid.length; i++) {
        if(gameGrid[i] === "") {
            flag = false;
            break;
        }
    }

    if(flag) {
        playerInfo.innerText = "Game Tied !!";
        return;
    }


    // whther to continue
}

btn.addEventListener("click", () => {
    startGame();
})




