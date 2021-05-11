"use strict";

let gameTiles = [[],[],[],[],[]];//gameTiles[row][column]
let gameValues = [[],[],[],[],[]];
setup();

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

function tileFlip(buttonId) {
    for(let row = 0; row<5;row++) {
        for(let column = 0; column<5;column++) {
            if(("button" + row + "-" + column)==buttonId) {
                gameTiles[row][column].innerText = gameValues[row][column];
                if(gameValues[row][column]==0) {
                    alert("You flipped a mine, you lost");
                    //reset();
                }
            }
        }
    }
}

function reset() {
    assignValues();
    infoBars();
}

function setup() {
    assignValues();
    for(let row = 0; row<5; row++) {
        for(let column = 0; column<5; column++) {
            let newButton = document.createElement("button");
            newButton.setAttribute("id","button" + row + "-" + column);
            newButton.setAttribute("onclick", "tileFlip(\"button" + row + "-" + column + "\")");

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
    }
}