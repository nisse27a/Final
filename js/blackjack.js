"use strict";

//#region setup

let player = {
    Cards: [],
    CardSum: 0,
    Bet: 0,
    Money: GetMoney(),
    PlayField: "player"
}
let dealer = {
    Cards: [],
    CardSum: 0,
    PlayField: "dealer"
}

function GetMoney() {
    let money = localStorage.getItem("bank");
    if(money=="null"||money==null) {
        localStorage.setItem("bank","10000")
    }
    return parseInt(localStorage.getItem("bank"));
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
    if(user==player) {
        PrintCard(player, cardDeck[suit][value]);    
    }
    CalculateSum(user);
    //console.log(user.CardSum);
}

function CalculateSum(user) {
    user.CardSum = 0;
    let aceCount = 0;
    
    user.Cards.forEach(card => {
        let cardValue = 0;
        if(card.Value==1) {
            aceCount++;
        } else if(card.Value>10) {
            cardValue = 10;
        } else {
            cardValue = card.Value;
        }
        user.CardSum += cardValue;
    });
    for(let i = 0; i < aceCount; i++) {
        if(user.CardSum+11<21&&i!=(aceCount-1)) {
            user.CardSum += 11;
        } else if(user.CardSum+11<=21&&i==(aceCount-1)) {
            user.CardSum += 11;
        } else {
            user.CardSum += 1;
        }
    }
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
            if(currentBet*2>player.Money) {
                currentBet = player.Money;
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
            currentBet = player.Money;
            break;
    }
    document.querySelector("input[type='text']").value = currentBet;
}
function Bet() {
    //lagra bettet i localstorage på nåt sätt
    player.Bet = document.querySelector("input[type='text']").value;
    if(parseInt(player.Bet)>player.Money) {
        player.Bet = player.Money;
    }
    document.getElementById("bet").innerText += " " + player.Bet;

    player.Money = player.Money - parseInt(player.Bet);
    document.querySelector(".offGame").classList.toggle("invisible");
    let inGameFields = document.querySelectorAll(".inGame");
    inGameFields.forEach((field) => {
        field.classList.toggle("invisible");
    });

    GameStart();
}

//#endregion

//#region Game
function GameStart() {
    for(let i = 0; i < 2; i++) {
        PickCard(dealer);
        PickCard(player);
    }
    WinCheck(true);
    PrintCard(dealer, dealer.Cards[0]);
}

function Hit() {
    //Ta ett kort, kolla om summan är 21 eller mer, isåfall calla stand
    PickCard(player);
    if(player.CardSum>=21) {
        Stand();
    }
}

function Stand() {
    PrintCard(dealer,dealer.Cards[1])
    while(dealer.CardSum<17) {
        PickCard(dealer);
        PrintCard(dealer, dealer.Cards[dealer.Cards.length-1])
    }
    WinCheck(false);
}

function Double() {

}

function Split() {

}

function WinCheck(blackjack) {
    let playerScore = player.CardSum;
    let dealerScore = dealer.CardSum;
    if(playerScore==21&blackjack) {
        Win(blackjack);
    } else if(playerScore<=21&((playerScore>dealerScore)||dealerScore>21)&!blackjack) {
        Win(blackjack);
    } else if((playerScore==dealerScore)&!blackjack)
    {
        Push();
    } else if(!blackjack) {
        Loss();
    }
}

function Win(blackjack) {
    if(blackjack){
        player.Money = player.Money + 2.5*parseInt(player.Bet);
    } else {
        player.Money = player.Money + 2*parseInt(player.Bet);
    }
    UpdateBank(player.Money);
    console.log(player.Money);
    document.querySelector(".gameInput").classList.toggle("invisible");
}

function Push() {
    document.querySelector(".gameInput").classList.toggle("invisible");
}

function Loss() {
    UpdateBank(player.Money);
    document.querySelector(".gameInput").classList.toggle("invisible");
}
//#endregion