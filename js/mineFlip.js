"use strict";

let gameTiles = [[],[],[],[],[]];//gameTiles[row][column]
let gameValues = [[],[],[],[],[]];
let tilesFlipped = 0;
let numberOfMines = 0;
let winMultiple = 0;

//#region Game

function TileFlip(buttonId) {
    for(let row = 0; row<5;row++) {
        for(let column = 0; column<5;column++) {
            if(("button" + row + "-" + column)==buttonId) {
                gameTiles[row][column].innerText = gameValues[row][column];
                winMultiple += 0.1*gameValues[row][column];
                tilesFlipped++;
                console.log(tilesFlipped);
                if(gameValues[row][column]==0) {
                    Loss();
                    document.querySelector(".afterGame").classList.toggle("invisible");
                } else if (25-tilesFlipped==numberOfMines) {
                    Win();
                    document.querySelector(".afterGame").classList.toggle("invisible");                
                }
            }
        }
    }
}

function Loss() {
    SetBank(player.Money);
    document.querySelector(".inGame").classList.toggle("invisible");
    document.getElementById("result").innerText = "Boooom";
    document.getElementById("resultText").innerText = "You flipped a mine \n You lost " + player.Bet + " tokens";
}

function Win() {
    winMultiple = Math.floor(winMultiple*10)/10;
    player.Money += player.Bet*winMultiple;
    SetBank(player.Money);
    document.querySelector(".inGame").classList.toggle("invisible");
    document.getElementById("result").innerText = "Minefield Defused";
    document.getElementById("resultText").innerText = "You won " + winMultiple*player.Bet + " tokens " + winMultiple;
}

function Reset() {
    document.querySelector(".preGame").classList.toggle("invisible");
    document.querySelector(".afterGame").classList.toggle("invisible");
    document.querySelector(".inGame").childNodes.forEach(div => {
        div.innerHTML = "";
    })
    document.getElementById("bank").innerText = "Bank: " + player.Money;
    document.querySelector("input[type='text']").value = player.Bet;
    tilesFlipped = 0;
    numberOfMines = 0;
    winMultiple = 0;
}
//#endregion

//#region Setup
function Setup() {
    gameTiles = [[],[],[],[],[]];
    gameValues = [[],[],[],[],[]];
    player.Money -= player.Bet;
    console.log(player.Money);
    assignValues();
    for(let row = 0; row<5; row++) {
        for(let column = 0; column<5; column++) {
            let newButton = document.createElement("button");
            newButton.setAttribute("id","button" + row + "-" + column);
            newButton.setAttribute("onclick", "TileFlip(\"button" + row + "-" + column + "\")");

            document.getElementById("tiles").appendChild(newButton);
            gameTiles[row][column] = newButton;
            gameTiles[row][column].innerText = "[]";
        }
    }
    for(let row = 0; row<5; row++) {
        let newButton = document.createElement("button");
        newButton.setAttribute("id","button" + "6-" + row);
        newButton.setAttribute("onclick", "tileFlip(\"button" + "6-" + row +"\")");

        document.getElementById("sidebar").appendChild(newButton);
        newButton.innerHTML = "<p>Sum:" + rowSum(row) + "</p>";
        newButton.innerHTML += "<p>Mines:" + rowMines(row) + "</p>";
    }
    for(let column = 0; column<5; column++) {
        let newButton = document.createElement("button");
        newButton.setAttribute("id","button" + column + "-6");
        newButton.setAttribute("onclick", "tileFlip(\"button" + column +"-6\")");

        document.getElementById("bottombar").appendChild(newButton);
        newButton.innerHTML = "<p>Sum:" + columnSum(column) + "</p>"; 
        newButton.innerHTML += "<p>Mines:" + columnMines(column) + "</p>";
        numberOfMines += columnMines(column);
    }
}

function rowSum(row) {
    let sum = 0;
    for(let column = 0; column<5; column++) {
        sum += gameValues[row][column];
    }
    return sum;
}

function rowMines(row) {
    let sum = 0;
    for(let column = 0; column<5; column++) {
        if(gameValues[row][column]==0) {
            sum++;
        }
    }
    return sum;
}

function columnSum(column) {
    let sum = 0;
    for(let row = 0; row<5; row++) {
        sum += gameValues[row][column];
    }
    return sum;
}

function columnMines(column) {
    let sum = 0;
    for(let row = 0; row<5; row++) {
        if(gameValues[row][column]==0) {
            sum++;
        }
    }
    return sum;
}

function assignValues() {
    let availableValues = [0,1,2,3];
    //denna array innehåller hur många av varje siffra som förekommer på spelplanen, när det inte finns 
    //några kvar av en sort, så tas den motsvarande siffran bort från ^^
    let maxAvailableCount = [8,11,5,3];

    for(let row = 0; row<5;row++) {
        for(let column = 0; column<5;column++) {
            let tileValue = availableValues[Math.floor(Math.random()*availableValues.length)];
            gameValues[row][column] = tileValue;
            maxAvailableCount[tileValue]--;

            if(maxAvailableCount[tileValue]<=0) {
                availableValues.splice(availableValues.indexOf(tileValue),1);
            }
        }
    }
}
//#endregion