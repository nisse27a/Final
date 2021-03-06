"use strict";

//#region setup

player = {
    Cards: [],
    CardSum: 0,
    Bet: GetBet(),
    Money: GetMoney(),
    PlayField: "player"
}
let dealer = {
    Cards: [],
    CardSum: 0,
    PlayField: "dealer"
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
        document.querySelector("." + user.PlayField).innerHTML += "<div class=\"cards\">" + card.Rank + "\nof\n" + card.Suit+ "</div>";
    } else {
        document.querySelector("." + user.PlayField).innerHTML += "<div class=\"cards\">" + card.Value + "\nof\n" + card.Suit+ "</div>";
    }
}

//#endregion

//#region Game

//#region preGame
function Setup() {
    document.getElementById("bet").innerText += " " + player.Bet;
    for(let i = 0; i < 2; i++) {
        PickCard(dealer);
        PickCard(player);
    }
    WinCheck(true);
    PrintCard(dealer, dealer.Cards[0]);
}

function Reset() {
    player.Cards = [];
    dealer.Cards = [];
    document.querySelector(".afterGame").classList.toggle("invisible");
    document.querySelector(".preGame").classList.toggle("invisible");
    let cards = document.querySelectorAll(".cards");
    cards.forEach(card => {
        card.parentNode.removeChild(card);
    });
    document.querySelector(".player").classList.toggle("invisible");
    document.querySelector(".dealer").classList.toggle("invisible");
    document.querySelector("#bet").innerText = "Bet:";
    document.getElementById("bank").innerText = "Bank: " + player.Money;
    let double = document.getElementById("double").classList;
    if(double.contains("unavailable")) {
        double.toggle("unavailable");
    }
}
//#endregion

//#region inGame
function Hit() {
    //Ta ett kort, kolla om summan är 21 eller mer, isåfall calla stand
    PickCard(player);
    if(player.CardSum>=21) {
        Stand();
    }
    if(player.Cards.length==3) {
        document.getElementById("double").classList.toggle("unavailable");
    }
}

function Stand() {
    PrintCard(dealer,dealer.Cards[1])
    while(dealer.CardSum<17) {
        PickCard(dealer);
        PrintCard(dealer, dealer.Cards[dealer.Cards.length-1])
    }
    player.Money = player.Money - player.Bet;
    WinCheck(false);
}

function Double() {
    if(player.Cards.length<3) {
        player.Bet *= 2;
        PickCard(player);
        Stand();
    }
}

function Split() {
    alert("This function is currently in development");
}
//#endregion

//#region postGame
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
    if(!blackjack) {
        document.querySelector(".afterGame").classList.toggle("invisible");
    }
}

function Win(blackjack) {
    let prizeMoney;
    if(blackjack){
        player.Money += 1.5*player.Bet;
        prizeMoney = 1.5*player.Bet;
        document.querySelector(".afterGame").classList.toggle("invisible");
    } else {
        player.Money += 2*player.Bet;
        prizeMoney = player.Bet;
    }
    SetBank(player.Money);
    document.querySelector(".gameInput").classList.toggle("invisible");
    document.getElementById("result").innerText = "Win";
    document.getElementById("resultText").innerText = "You beat the dealer and won " + prizeMoney + " tokens";
}

function Push() {
    SetBank(player.Money + player.Bet);
    document.querySelector(".gameInput").classList.toggle("invisible");
    document.getElementById("result").innerText = "Push";
    document.getElementById("resultText").innerText = "You and the dealer achieved the same number of points, thereby reaching a tie";
}

function Loss() {
    SetBank(player.Money);
    document.querySelector(".gameInput").classList.toggle("invisible");
    document.getElementById("result").innerText = "Loss";
    document.getElementById("resultText").innerText = "The dealer beat you and you lost " + player.Bet + " tokens";
}
//#endregion
//#endregion