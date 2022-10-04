let inpSuffle = document.getElementById("inpShuffle");
let inpDeal = document.getElementById("inpDeal");
let imgPlayer1 = document.getElementById("imgPlayer1Card");
let imgPlayer2 = document.getElementById("imgPlayer2Card");
let divWar = document.querySelector(".warZoneContainer");

let state = {};

function initialize() {
  state = {
    suits: ["C", "D", "H", "S"],
    playerTurn: "1",
    tableCards: [],
    unSuffledCards: [],
    suffleCards: [],
    player1Cards: [],
    player2Cards: [],
    player1WinningCards: [],
    player2WinningCards: [],
    winner: "0",
  };
  inpSuffle.addEventListener("click", suffle);
  inpDeal.addEventListener("click", draw);
}

/*
This function suffle the cards
@input: ????
@output: ????
*/
function suffle() {
  // Create unshuffle deck
  for (i = 0; i < state.suits.length; i++) {
    for (j = 2; j < 15; j++) {
      state.unSuffledCards.push(state.suits[i] + j);
    }
  }

  // Suffle the deck
  while (state.suffleCards.length < 52) {
    ranNumber = Math.floor(Math.random() * 52);
    if (!state.suffleCards.includes(state.unSuffledCards[ranNumber])) {
      state.suffleCards.push(state.unSuffledCards[ranNumber]);
    }
  }
  // Divide deck to two players
  state.player1Cards = state.suffleCards.slice(0, 26);
  state.player2Cards = state.suffleCards.slice(26, 52);
  inpDeal.style.display = "inline";
}

/*
 */
function draw() {
  let NumofPlayer1Cards = state.player1Cards.length;
  let NumofPlayer2Cards = state.player2Cards.length;

  if (NumofPlayer1Cards > 0 && NumofPlayer2Cards > 0) {
    imgPlayer1.src = createImageName(state.player1Cards[NumofPlayer1Cards - 1]);

    imgPlayer2.src = createImageName(state.player2Cards[NumofPlayer2Cards - 1]);

    compareCards(
      state.player1Cards[NumofPlayer1Cards - 1],
      state.player2Cards[NumofPlayer2Cards - 1]
    );
    state.player1Cards.pop();
    state.player2Cards.pop();
  } else if (state.player1Cards.length) {
    winnerMessage = "Congratulation! winner is player 2";
  } else {
    winnerMessage = "Congratulation! winner is player 2";
  }
}

/*
 This function compare 2 cards and find
 who is the winner, its either player1, player2 or going to war
 @card1: Player1's card
 @card2: Player2's card
 @return: 
*/
function compareCards(card1, card2) {
  let num1 = parseInt(card1.slice(1, card1.length));
  let num2 = parseInt(card2.slice(1, card2.length));
  console.log(card1 + " ---" + card2);
  if (num1 > num2) {
    state.player1WinningCards.push(card1, card2);
    document.getElementById("p1").textContent =
      "Player1 wins: " + state.player1WinningCards.length;
  } else if (num2 > num1) {
    state.player2WinningCards.push(card1, card2);
    document.getElementById("p2").textContent =
      "Player2 wins: " + state.player2WinningCards.length;
  } else {
    // War
    let NewImage1 = document.createElement("img");
    NewImage1.src = "./images/backs/blue.svg";
    divWar.appendChild(NewImage1);
    let NewImage2 = document.createElement("img");
    NewImage2.src = "./images/backs/red.svg";
    divWar.appendChild(NewImage2);
  }
  console.log("player1 win cards" + state.player1WinningCards);
  console.log("player2 win cards" + state.player2WinningCards);
}

/*
This function create the name of image 
@cardShortName: Card short name
*/
function createImageName(cardShortName) {
  let imagePath = "";
  let pipName = "";
  let suitName = cardShortName.slice(0, 1);
  let pipNumber = Number(cardShortName.substring(1, cardShortName.length));

  switch (suitName) {
    case "C":
      suitName = "clubs";
      break;
    case "D":
      suitName = "diamonds";
      break;
    case "H":
      suitName = "hearts";
      break;
    case "S":
      suitName = "spades";
      break;
  }

  if (pipNumber < 10 && pipNumber > 1) {
    pipName = "r0" + pipNumber.toString();
  } else if (pipNumber == 10) {
    pipName = "r10";
  } else if (pipNumber == 11) {
    pipName = "J";
  } else if (pipNumber == 12) {
    pipName = "Q";
  } else if (pipNumber == 13) {
    pipName = "K";
  } else if (pipNumber == 14) {
    pipName = "A";
  }
  imagePath = `./images/${suitName}/${suitName}-${pipName}.svg`;
  return imagePath;
}
initialize();
suffle();
