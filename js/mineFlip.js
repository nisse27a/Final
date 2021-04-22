"use strict";

let gameTiles = [[],[],[],[],[]];//gameTiles[row][column]
let gameValues = [[],[],[],[],[]];

for(let row = 0; row<5; row++) {
    for(let column = 0; column<5; column++) {
        let newButton = document.createElement("button");
        newButton.setAttribute("id","button" + row + "-" + column);
        newButton.setAttribute("onclick", "tileFlip(\"button" + row + "-" + column + "\")");

        document.getElementById("gameboard").appendChild(newButton);
        gameTiles[row][column] = newButton;
        gameTiles[row][column].innerText = "Tile";
    }
}

function assignValues() {
    for(let row = 0; row<5;row++) {
        for(let column = 0; column<5;column++) {
            gameValues[row][column] = Math.floor(Math.random()*4);
        }
    }
}
assignValues();

function tileFlip(buttonId) {
    console.log(document.getElementById(buttonId));
    document.getElementById(buttonId)
    for(let row = 0; row<5;row++) {
        for(let column = 0; column<5;column++) {
            if(("button" + row + "-" + column)==buttonId) {
                gameTiles[row][column].innerText = gameValues[row][column];
            }
        }
    }
}