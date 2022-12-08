

var deck = [2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,11,11,11,11,12,12,12,12,13,13,13,13,14,14,14,14];

// var playerCards = []

// var playerWon = []

// var compCards = []

// var compWon = []

// var playerPlayed = []

// var compPlayed = []

function shuffle() {
    for(i=deck.length - 1; i>0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        const temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

shuffle();
console.log(deck);