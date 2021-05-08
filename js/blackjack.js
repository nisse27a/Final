"use strict";

//#region setup

let player = {
    Cards: [],
    CardSum: 0,
    Bet: 0,
    Money: GetMoney(),
    PlayField: "player"
}
function GetMoney() {
    let money = localStorage.getItem("bank");
    if(money=="null"||money==null) {
        localStorage.setItem("bank","10000")
    }
    return localStorage.getItem("bank");
}
//Carddeck är organiserad som en nestad array där de nestade arrays är de olika färger
//[[Diamnods],[Spades],[Hearts],[Clubs]]
let cardDeck = [[],[],[],[]];
for(let suit = 0; suit <4;suit++) {
    let suitName;
        switch(suit) {
            case 0:
                suitName = "Diamonds";
                break;
            case 1:
                suitName = "Spades";
                break;
            case 2:
                suitName = "Hearts";
                break;
            case 3:
                suitName = "Clubs";
                break;
        }
    for(let value = 0; value < 13; value++) {
        let rank;
        if(value>9||value==0) {
            switch(value) {
                case 0:
                    rank = "Ace";
                    break;
                case 10:
                    rank = "Knight";
                    break;
                case 11:
                    rank = "Queen";
                    break;
                case 12:
                    rank = "King";
                    break;
            }
        } else {
            rank = "Basic";
        }

        cardDeck[suit][value] = {
            Value: value+1,
            Suit: suitName,
            Rank: rank
        }
    }
}

function UpdateBank(money) {
    localStorage.setItem("bank", JSON.stringify(money))
}   
//#endregion

//#region CardFunctions
function PickCard(user) {
    let suit = Math.floor(Math.random()*4);
    let value = Math.floor(Math.random()*13);
    user.Cards.push(cardDeck[suit][value]);
    PrintCard(user, cardDeck[suit][value]);
}

function PrintCard(user, card) {
    if(card.Value>10||card.Value==1) {
        document.querySelector("." + user.PlayField).innerHTML += "<div>" + card.Rank + "\nof\n" + card.Suit+ "</div>";
    } else {
        document.querySelector("." + user.PlayField).innerHTML += "<div>" + card.Value + "\nof\n" + card.Suit+ "</div>";
    }
}
//#endregion

//#region Betting
document.getElementById("bank").innerText += " " + player.Money;

function ChangeBet(buttonFunction) {
    let currentBet = document.querySelector("input[type='text']").value;
    switch(buttonFunction) {
        case "timesTwo":
            if(currentBet*2>parseInt(player.Money)) {
                currentBet = parseInt(player.Money);
            } else {
                currentBet *= 2;
            }
            break;
        case "divideTwo":
            if((currentBet/2)%1==0.5) {
                currentBet++;
            }
            currentBet /= 2;
            break;
        case "clear":
            currentBet = "";
            break;
        case "max":
            currentBet = parseInt(player.Money);
            break;
    }
    document.querySelector("input[type='text']").value = currentBet;
}
function Bet() {
    //lagra bettet i localstorage på nåt sätt
    player.Bet = document.querySelector("input[type='text']").value;
    document.getElementById("bet").innerText += " " + player.Bet;

    player.Money = parseInt(player.Money) - parseInt(player.Bet);
    document.querySelector(".offGame").classList.toggle("invisible");
    let inGameFields = document.querySelectorAll(".inGame");
    inGameFields.forEach((field) => {
        field.classList.toggle("invisible");
    });

}

//#endregion


