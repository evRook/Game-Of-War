var deck = [2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,11,11,11,11,12,12,12,12,13,13,13,13,14,14,14,14];

var playerDeck = [];

var compDeck = [];

var playerWon = [];

var compWon = [];

var playerPlayed;

var compPlayed;

var warRoom = [];

function startGame(){
    function shuffle() {
        for(i=deck.length - 1; i>0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            const temp = deck[i];
            deck[i] = deck[j];
            deck[j] = temp;
        }
    }

    shuffle();

    function dealCards(){
        for(k=deck.length-1; k>=0; k--){
            if(k % 2 === 0){
                playerDeck.unshift(deck.splice(k,1)[0]);
            }else if(k % 2 === 1){
                compDeck.unshift(deck.splice(k,1)[0]);
            }
        }
    }
    dealCards();
}

startGame();

console.log(playerDeck);

console.log(compDeck);

function playGame(){

  function playCard(){
      playerPlayed = playerDeck[0];
      compPlayed = compDeck[0];
      // playerPlayed = 10
      // compPlayed = 10
    }

    playCard();

    console.log(playerPlayed);
    console.log(compPlayed);

    // console.log(playerDeck);
    // console.log(compDeck);

    function cardLogic(){
      if(playerPlayed == compPlayed){
          for(m=0; m<4 ; m++){
            warRoom.unshift(playerDeck.splice(0,1)[0]);
            warRoom.unshift(compDeck.splice(0,1)[0]); 
          }
        return playGame();
      }else if(playerPlayed > compPlayed){
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
      }else if(playerPlayed < compPlayed){
          compWon.unshift(playerDeck.splice(0,1)[0]);
          compWon.unshift(compDeck.splice(0,1)[0]);
        if(warRoom.length > 0){
            function compWar(){
              while(warRoom.length > 0){
                playerWon.unshift(warRoom.splice(0,1)[0]);
              }
            }
          compWar();
        }
      }
    }
    cardLogic();
}
       
playGame();
 
console.log(playerWon);
console.log(compWon);
console.log(warRoom);