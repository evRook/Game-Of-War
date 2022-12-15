//Method to create the deck
const suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
const ranks = [2,3,4,5,6,7,8,9,10,"J","Q","K","A"];
const scores = [1,2,3,4,5,6,7,8,9,10,11,12,13];

class Card {
    constructor(suit, rank, score){
        this.suit = suit
        this.rank = rank
        this.score = score
    }
}

class Deck {
    constructor(){
      this.cards = [];
    }
  
    draw(suit, rank){
      for(let i=0; i<suits.length; i++){
        for(let j=0; j<ranks.length; j++){
            const newCard = new Card(suits[i], ranks[j], scores[j]);
            this.cards.push(newCard);
          }
        }
        return this.cards
    } 
  }


let deck = new Deck();
deck.draw(suits, ranks, scores);


var playerDeck = [];

var compDeck = [];

var playerWon = [];

var compWon = [];

var playerPlayed = [];

var compPlayed = [];

var warRoom = [];

const win = 52  

// // Function to start game
function startGame(){      
    
    // Function to shuffle deck by looping through the deck array
    function shuffle() {
        for(i = deck.cards.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            const temp = deck.cards[i];
            deck.cards[i] = deck.cards[j];
            deck.cards[j] = temp;
        }
    }
    shuffle();

    // Function to deal every other card into player/cpu decks
    function dealCards(){
        for(k = deck.cards.length - 1; k >= 0; k--){
            if(k % 2 === 0){
                playerDeck.unshift(deck.cards.splice(k,1)[0]);
            }else if(k % 2 === 1){
                compDeck.unshift(deck.cards.splice(k,1)[0]);
            }
        }
    }
    dealCards();
}
startGame();


// // game container
function playGame(){
    
    // Chooses Player Card
    function playCard(){
        playerPlayed[0] = playerDeck[0];
        compPlayed[0] = compDeck[0];
    }
    playCard();

    // War game logic
    // compaires values and sorts elements based on outcome
    function cardLogic(){
        if(playerPlayed[0].score === compPlayed[0].score){
            if(playerDeck.length < 4 && compDeck.length > 4){
                for(q=0; q<4; q++){
                  warRoom.unshift(compDeck.splice(0,1)[0]); 
                }
                for(r=0; playerDeck.length > 1; r++){
                  warRoom.unshift(playerDeck.splice(0,1)[0]);
                }
            }else if(compDeck.length < 4 && playerDeck > 4){
                for(q=0; q<4; q++){
                   warRoom.unshift(playerDeck.splice(0,1)[0]);
                }
                for(r=0; compDeck.length > 1; r++){
                  warRoom.unshift(compDeck.splice(0,1)[0]);
                }  
            }else if(playerDeck.length < 4 && compDeck.length < 4){
                for(m=0; m<4; m++){
                  warRoom.unshift(playerDeck.splice(0,1)[0]);
                  warRoom.unshift(compDeck.splice(0,1)[0]); 
                 }
            }
            return playGame();
        }else if(playerPlayed[0].score > compPlayed[0].score){
            playerWon.unshift(compDeck.splice(0,1)[0]);
            playerWon.unshift(playerDeck.splice(0,1)[0]);
            if(warRoom.length > 0){
                function playerWar(){
                while(warRoom.length > 0){
                    playerWon.unshift(warRoom.splice(0,1)[0]);
                    }
                }
                playerWar();
            } 
        }else if(playerPlayed[0].score < compPlayed[0].score){
            compWon.unshift(playerDeck.splice(0,1)[0]);
            compWon.unshift(compDeck.splice(0,1)[0]);
            if(warRoom.length > 0){
                function compWar(){
                while(warRoom.length > 0){
                    compWon.unshift(warRoom.splice(0,1)[0]);
                    }
                }
                compWar();
            }   
        }
    }
    cardLogic();   
  
    // function to calculate winner, if no winner shuffle cards pack to players
    function winCondition(){
        if((playerWon.length + playerDeck.length) === 52){
            console.log("You Win!");    
        }else if((compWon.length + compDeck.length) === 52){
            console.log("CPU Wins!");
        }else if(compWon.length === 26 && playerWon.length === 26){
            function bothReshuffle(){
                while(compWon.length > 0){
                    compDeck.unshift(compWon.splice(0,1)[0]);
                    playerDeck.unshift(playerWon.splice(0,1)[0]);
                }  
            }
            bothReshuffle();
            playGame();
        }else if((playerWon.length < 52 && playerDeck.length === 0)&&(compWon.length < 52 && compDeck.length === 0)){
            function bothReshuffleTwo(){
                for(p=0; playerWon.length > 0; p++){
                  playerDeck.unshift(playerWon.splice(0,1)[0]);
                }
                for(c=0; compWon.length > 0; c++){
                  compDeck.unshift(compWon.splice(0,1)[0]);
                }
            }
            bothReshuffleTwo();
            return playGame();
        }else if(playerWon.length < 52 && playerDeck.length == 0){
            function playerReshuffle(){
                while(playerWon.length > 0){
                      playerDeck.unshift(playerWon.splice(0,1)[0]);
                }
            }
            playerReshuffle();
            playGame();
        }else if(compWon.length < 52 && compDeck.length === 0){
           function compReshuffle(){
              while(compWon.length > 0){
                    compDeck.unshift(compWon.splice(0,1)[0]);
              }
           }
           compReshuffle();
           playGame();
        }
    }
    winCondition();
}  
playGame();  
        

// funciton to play game untill win condion is meet
function warLoop(){
    while((playerWon.length + playerDeck.length) < 52 && (compWon.length + compDeck.length) < 52){
      playGame();
    }
}
warLoop(); 