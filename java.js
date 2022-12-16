

//Method to create the deck
const suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
const ranks = [2,3,4,5,6,7,8,9,10,"Jack","Queen","King","Ace"];
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

console.log("BREAK")
var playerDeck = [];

var compDeck = [];

var playerWon = [];
         
var compWon = [];

var playerPlayed = [];

var compPlayed = [];

var warRoom = [];


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


// // Game Container
function playGame(){

    // function to calculate winner, if no winner shuffle cards pack to players
    function reshuffle(){
        if(((playerWon.length + playerDeck.length) < 52 && playerDeck.length === 0)&&((compWon.length + compDeck.length) < 52 && compDeck.length === 0)){
            function bothReshuffle(){
                for(p=0; playerWon.length > 0; p++){
                  playerDeck.unshift(playerWon.splice(0,1)[0]);
                }
                for(c=0; compWon.length > 0; c++){
                  compDeck.unshift(compWon.splice(0,1)[0]);
                }
            }
            bothReshuffle();
        }else if(playerWon.length < 52 && playerDeck.length === 0){
            function playerReshuffle(){
                while(playerWon.length > 0){
                      playerDeck.unshift(playerWon.splice(0,1)[0]);
                }
            }
            playerReshuffle();
        }else if(compWon.length < 52 && compDeck.length === 0){
           function compReshuffle(){
              while(compWon.length > 0){
                    compDeck.unshift(compWon.splice(0,1)[0]);
              }
           }
           compReshuffle();
        }
    }
    reshuffle();
       
    // Chooses Player Card
    function playCard(){
        playerPlayed[0] = playerDeck[0];
        compPlayed[0] = compDeck[0];
    }
    playCard();  

    // War Game Logic
    // compaires values and sorts elements based on outcome
    function cardLogic(){
        if(((playerPlayed[0].score == compPlayed[0].score))&&(playerDeck.length == 1 && compDeck.length == 1)){
          if((playerDeck.length + playerWon.length) == 1){
            console.log(`OH NO! A last card stalemate! The Computers larger army Wins!`);
            compWon.unshift(playerDeck.splice(0,1)[0]);
            compWon.unshift(compDeck.splice(0,1)[0]);
            function compFinalWar(){
                while(warRoom.length > 0){
                    compWon.unshift(warRoom.splice(0,1)[0]);     
                    }
                }  
                compFinalWar();
          }else if((compDeck.length + compWon.length) == 1){
            console.log(`A last card stalemate! The Players larger army Wins!`);
            playerWon.unshift(compDeck.splice(0,1)[0]);
            playerWon.unshift(playerDeck.splice(0,1)[0]);
            function playerFinalWar(){
                while(warRoom.length > 0){
                    playerWon.unshift(warRoom.splice(0,1)[0]);
                    }
                }
                playerFinalWar();
          }
        }else if((playerPlayed[0].score == compPlayed[0].score)){
            if(playerDeck.length > 4 && compDeck.length > 4){             
                for(m=0; m<4; m++){
                  warRoom.unshift(playerDeck.splice(0,1)[0]);
                  warRoom.unshift(compDeck.splice(0,1)[0]); 
                }
            }else if(playerDeck.length < 5 && compDeck.length < 5){   
                for(u=0; playerDeck.length > 1; u++){
                  warRoom.unshift(playerDeck.splice(0,1)[0]);
                }
                while(compDeck.length > 1){
                  warRoom.unshift(compDeck.splice(0,1)[0]); 
                }
            }else if(playerDeck.length < 5 && compDeck.length > 4){
                for(q=0; q<4; q++){
                  warRoom.unshift(compDeck.splice(0,1)[0]); 
                }
                while(playerDeck.length > 1){
                  warRoom.unshift(playerDeck.splice(0,1)[0]);
                }
            }else if(compDeck.length < 5 && playerDeck.length > 4){
                for(s=0; s<4; s++){                           
                   warRoom.unshift(playerDeck.splice(0,1)[0]);
                }
                while(compDeck.length > 1){
                  warRoom.unshift(compDeck.splice(0,1)[0]);
                }  
            }
            console.log(`WAR! The Player played a ${playerPlayed[0].rank} of ${playerPlayed[0].suit} and the Computer played a ${compPlayed[0].rank} of ${compPlayed[0].suit}`);
        }else if(playerPlayed[0].score > compPlayed[0].score){    
            playerWon.unshift(compDeck.splice(0,1)[0]);
            playerWon.unshift(playerDeck.splice(0,1)[0]);             
            if(warRoom.length > 0){
                console.log(`Player Won the war! Winning ${warRoom.length} extra cards from the prize pool!`)
                function playerWar(){
                while(warRoom.length > 0){
                    playerWon.unshift(warRoom.splice(0,1)[0]);     
                    }
                }  
                playerWar();
            } 
            console.log(`Player Won This Round! They played a ${playerPlayed[0].rank} of ${playerPlayed[0].suit} and the Computer played a ${compPlayed[0].rank} of ${compPlayed[0].suit}`);
        }else if(playerPlayed[0].score < compPlayed[0].score){
            compWon.unshift(playerDeck.splice(0,1)[0]);
            compWon.unshift(compDeck.splice(0,1)[0]);
            if(warRoom.length > 0){
                console.log(`The Computer Won the war! Winning ${warRoom.length} extra cards from the prize pool!`)
                function compWar(){
                while(warRoom.length > 0){
                    compWon.unshift(warRoom.splice(0,1)[0]);
                    }
                }
                compWar();
            }   
            console.log(`The Computer Won This Round! They played a ${compPlayed[0].rank} of ${compPlayed[0].suit} and the Player played a ${playerPlayed[0].rank} of ${playerPlayed[0].suit}`);
        }
    }
    cardLogic();                  

    console.log(`Player now has ${playerWon.length + playerDeck.length} cards total and Computer now has ${compWon.length + compDeck.length} cards total`);
  
    function prize(){
        if(warRoom.length > 0){
          console.log(`The prize pool is now ${warRoom.length} cards!`);
        }
    }
    prize();
    
    console.log("------------/-------------");
}

function winCondition(){
        if((playerWon.length + playerDeck.length) === 52){
            console.log("The Player Wins!");    
        }else if((compWon.length + compDeck.length) === 52){
            console.log("The Computer Wins!");
        }
    }
    winCondition();

// funciton to play game untill win condion is meet         
// function warLoop(){
//     while((playerWon.length + playerDeck.length) < 52 && (compWon.length + compDeck.length) < 52){
//       playGame();
//       winCondition();
//     }  
// }
// warLoop();  