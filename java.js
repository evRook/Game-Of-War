

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

// card holders
var playerDeck = [];

var compDeck = [];

var playerWon = [];
         
var compWon = [];

var playerPlayed = [];

var compPlayed = [];

var warRoom = [];


// // Function to start game
function startGame(){      
    
    // Function to shuffle deck, looping through the cards array by shuffling the cards one at a time untill "i" reaches the value of cards length
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


// Game Container
function playGame(){

    // Function to calculate winner, if no winner shuffle cards pack to players
    function reshuffle(){
        // if both players have 0 cards in deck reshuffle
        if(((playerWon.length + playerDeck.length) < 52 && playerDeck.length === 0)&&((compWon.length + compDeck.length) < 52 && compDeck.length === 0)){
              function bothReshuffle(){
                    while(playerWon.length > 0){
                      playerDeck.unshift(playerWon.splice(0,1)[0]);
                    }
                    while(compWon.length > 0){
                      compDeck.unshift(compWon.splice(0,1)[0]);
                    }
                }
                bothReshuffle();
        // if player has 0 cards in deck reshuffle
        }else if((playerWon.length + playerDeck.length) < 52 && playerDeck.length === 0){
            function playerReshuffle(){
                while(playerWon.length > 0){
                      playerDeck.unshift(playerWon.splice(0,1)[0]);
                }
            }
            playerReshuffle();
        // if Comp has 0 cards in deck reshuffle
        }else if((compWon.length + compDeck.length) < 52 && compDeck.length === 0){
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
        // if both players cards match and its the last card in both players deck
        if((playerPlayed[0].score == compPlayed[0].score)&&(playerDeck.length == 1 && compDeck.length == 1)){
            // if its the last card in both players deck but not the last total card for either player
            if(((playerDeck.length + playerWon.length) > 4)&&((compDeck.length + compWon.length) > 4)){
                      console.log(`WAR when both are on the last card! Reshuffle and continue the war!`)
                      warRoom.unshift(playerDeck.splice(0,1)[0]);
                      warRoom.unshift(compDeck.splice(0,1)[0]);
                      function endOfDeckWar(){
                          reshuffle();
                          for(m=0; m<3; m++){
                              warRoom.unshift(playerDeck.splice(0,1)[0]);
                              warRoom.unshift(compDeck.splice(0,1)[0]); 
                          }
                      }
                      endOfDeckWar(); 
            }else if(((playerDeck.length + playerWon.length) < 5)&&((playerDeck.length + playerWon.length) > 1)){ //HEREHEREHERE
                if(((compDeck.length + compWon.length) < 5)&&((compDeck.length + compWon.length) > 1)){
                    console.log(`WAR when both are on the last card! Reshuffle and continue the war!`)
                    warRoom.unshift(playerDeck.splice(0,1)[0]);
                    warRoom.unshift(compDeck.splice(0,1)[0]);
                    function endOfDeckWar2(){
                        reshuffle();
                        while(playerDeck.length > 1){
                            warRoom.unshift(playerDeck.splice(0,1)[0]);
                        }
                        while(compDeck.length > 1){
                            warRoom.unshift(compDeck.splice(0,1)[0]); 
                        }
                    }
                    endOfDeckWar2(); 
                }else if((compDeck.length + compWon.length) > 5){
                    console.log(`WAR when both are on the last card! Reshuffle and continue the war!`)
                    warRoom.unshift(playerDeck.splice(0,1)[0]);
                    warRoom.unshift(compDeck.splice(0,1)[0]);
                    function endOfDeckWar3(){
                        reshuffle();
                        while(playerDeck.length > 1){
                            warRoom.unshift(playerDeck.splice(0,1)[0]);
                        }
                        for(m=0; m<3; m++){
                            warRoom.unshift(compDeck.splice(0,1)[0]); 
                        }
                    }
                    endOfDeckWar3(); 
                }
            }else if(((compDeck.length + compWon.length) < 5)&&((compDeck.length + compWon.length) > 1)){
              if(((playerDeck.length + playerWon.length) < 5)&&((playerDeck.length + playerWon.length) > 1)){
                    console.log(`WAR when both are on the last card! Reshuffle and continue the war!`)
                    warRoom.unshift(playerDeck.splice(0,1)[0]);
                    warRoom.unshift(compDeck.splice(0,1)[0]);
                    function endOfDeckWar2(){
                        reshuffle();
                        while(playerDeck.length > 1){
                            warRoom.unshift(playerDeck.splice(0,1)[0]);
                        }
                        while(compDeck.length > 1){
                            warRoom.unshift(compDeck.splice(0,1)[0]); 
                        }
                    }
                    endOfDeckWar2(); 
                }else if((playerDeck.length + playerWon.length) > 5){
                    console.log(`WAR when both are on the last card! Reshuffle and continue the war!`)
                    warRoom.unshift(playerDeck.splice(0,1)[0]);
                    warRoom.unshift(compDeck.splice(0,1)[0]);
                    function endOfDeckWar3(){
                        reshuffle();
                        while(compDeck.length > 1){
                            warRoom.unshift(compDeck.splice(0,1)[0]);
                        }
                        for(m=0; m<3; m++){
                            warRoom.unshift(playerDeck.splice(0,1)[0]); 
                        }
                    }
                    endOfDeckWar3(); 
                }
            // if its the absolute last card in the players deck and matches players card
            }else if(((compDeck.length + compWon.length) > 1)&&((playerDeck.length + playerWon.length) == 1)){
                console.log(`oH nO! A last card stalemate! The Computers larger army Wins!`);
                compWon.unshift(compDeck.splice(0,1)[0]);
                compWon.unshift(playerDeck.splice(0,1)[0]);
                function compFinalWar(){
                    while(warRoom.length > 0){
                        compWon.unshift(warRoom.splice(0,1)[0]);
                    }
                }
                compFinalWar();
            }else if(((playerDeck.length + playerWon.length) > 1)&&((compDeck.length + compWon.length) == 1)){
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
        // non "conditional" war logic
        }else if((playerPlayed[0].score == compPlayed[0].score)){
            // condiitons if amount of deck is less than war tax
            if(playerDeck.length > 4 && compDeck.length > 4){             
                for(m=0; m<4; m++){
                  warRoom.unshift(playerDeck.splice(0,1)[0]);
                  warRoom.unshift(compDeck.splice(0,1)[0]); 
                }
            }else if(playerDeck.length < 5 && compDeck.length < 5){   
                while(playerDeck.length > 1){
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
        // if player card is higher than computers put both played cards in players win pile
        }else if(playerPlayed[0].score > compPlayed[0].score){    
            playerWon.unshift(compDeck.splice(0,1)[0]);
            playerWon.unshift(playerDeck.splice(0,1)[0]);             
            if(warRoom.length > 0){
                console.log(`Player Won the war! Winning ${warRoom.length} extra cards from the prize pool!`)
                // function to give war winings to player on war win
                function playerWar(){
                while(warRoom.length > 0){
                    playerWon.unshift(warRoom.splice(0,1)[0]);     
                    }
                }  
                playerWar();
            } 
            console.log(`Player Won This Round! They played a ${playerPlayed[0].rank} of ${playerPlayed[0].suit} and the Computer played a ${compPlayed[0].rank} of ${compPlayed[0].suit}`);
        // if computers card is higher than players put both played cards in players win pile
        }else if(playerPlayed[0].score < compPlayed[0].score){
            compWon.unshift(playerDeck.splice(0,1)[0]);
            compWon.unshift(compDeck.splice(0,1)[0]);
            if(warRoom.length > 0){
                console.log(`The Computer Won the war! Winning ${warRoom.length} extra cards from the prize pool!`)
                // function to give war winings to computer on war win
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
    
    // Printing player/comp deck size, and prize pool if applicable 
    console.log(`Player now has ${playerWon.length + playerDeck.length} cards total and Computer now has ${compWon.length + compDeck.length} cards total`);
    function prize(){
        if(warRoom.length > 0){
          console.log(`The prize pool now has ${warRoom.length} cards!`);
        }
    }
    prize();
    console.log("------------/-------------");  
}


// Checking game state to declare winner
function winCondition(){
        if((playerWon.length + playerDeck.length) === 52){
            console.log("The Player Wins!");    
        }else if((compWon.length + compDeck.length) === 52){
            console.log("The Computer Wins!");
        }
    }
winCondition();

// funciton to play game untill win condion is meet         
function warLoop(){
    while((playerWon.length + playerDeck.length) < 52 && (compWon.length + compDeck.length) < 52){
      playGame();
      winCondition();
    }  
}
warLoop();                            
   