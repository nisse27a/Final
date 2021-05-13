"using strict";
let player = {
    Bet: GetBet(),
    Money: GetMoney()
}

function GetMoney() {
    let money = localStorage.getItem("bank");
    if(money=="null"||money==null) {
        localStorage.setItem("bank","10000")
    }
    return parseInt(localStorage.getItem("bank"));
}

function SetBank(money) {
    localStorage.setItem("bank", JSON.stringify(money))
}   

function GetBet() {
    let bet = localStorage.getItem("bet");
    if(bet=="null"||bet==null) {
        localStorage.setItem("bet","100")
    }
    return parseInt(localStorage.getItem("bet"));
}

function SetBet(bet) {
    localStorage.setItem("bet", JSON.stringify(bet))
}

document.getElementById("bank").innerText += " " + player.Money;
document.querySelector("input[type='text']").value = player.Bet;

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
    player.Bet = parseInt(document.querySelector("input[type='text']").value);
    if(player.Bet>player.Money) {
        player.Bet = player.Money;
    }

    document.querySelector(".preGame").classList.toggle("invisible");
    let inGameFields = document.querySelectorAll(".inGame");
    inGameFields.forEach((field) => {
        field.classList.toggle("invisible");
    });
    SetBet(player.Bet);
    Setup();
}