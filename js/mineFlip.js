"use strict";

let gameTiles = [[],[],[],[],[]];//gameTiles[row][column]

for(let i = 0; i<5; i++) {
    for(let k = 0; k<5; k++) {
        let newButton = document.createElement("button");
        newButton.setAttribute("id","button" + i + "-" + k);
        newButton.setAttribute("onclick", "tileFlip(\"button" + i + "-" + k + "\")");
        
        document.getElementById("gameboard").appendChild(newButton);
        gameTiles[i][k] = newButton;
        gameTiles[i][k].innerText = "Tile";
    }
}

function tileFlip(buttonId) {
    console.log(document.getElementById(buttonId));
}