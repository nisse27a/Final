"use strict";
//#region Betting

//#region dealer

//#endregion

//#region Player
let player = {
    Cards: [],
    CardSum: 0,
    Bet: 0
}
//#endregion

//#region cards

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
        if(value>9||value==1) {
            switch(value) {
                case 1:
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
function PickCard() {
    
}
//#endregion