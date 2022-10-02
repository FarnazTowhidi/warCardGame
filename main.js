// suits: ["clubs", "diamonds", "hearts", "spades"],

let inpSuffle = document.getElementById("inpShuffle");
let inpDeal = document.getElementById("inpDeal");
let imgPlayer1 = document.getElementById("imgPlayer1Card");
let imgPlayer2 = document.getElementById("imgPlayer2Card");

inpSuffle.addEventListener("click", suffle);
inpDeal.addEventListener("click", deal);
inpDeal.style.display = "none";

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
    player2WinnigCards: [],
    winner: "0",
  };
}

initialize();

function suffle() {
  for (i = 0; i < state.suits.length; i++) {
    for (j = 1; j < 14; j++) {
      state.unSuffledCards.push(state.suits[i] + j);
    }
  }

  // Suffle the cards
  while (state.suffleCards.length < 52) {
    ranNumber = Math.floor(Math.random() * 52);
    if (!state.suffleCards.includes(state.unSuffledCards[ranNumber])) {
      state.suffleCards.push(state.unSuffledCards[ranNumber]);
    }
  }

  state.player1Cards = state.suffleCards.slice(0, 26);
  state.player2Cards = state.suffleCards.slice(26, 52);
  inpDeal.style.display = "block";
}

function deal() {
  imgPlayer1.src = "./images/clubs/clubs-A.svg";
  imgPlayer2.src = "./images/clubs/clubs-k.svg";
  // if ((state.player1Cards.length) && (state.player2Cards.length)
  createImage(state.player1Cards[0]);
  createImage(state.player2Cards[0]);
}

suffle();
deal();

function compareCards(card1, card2) {
  let num1 = card1.slice(1, card1.length);
  let num2 = card2.slice(1, card2.length);

  if (num1 > num2) state.player1WinningCards.push(card1, card2);
  else if (num2 > num1) state.player2WinnigCards.push(card1, card2);
}

function createImage(cardName) {
  let pipName;
  let suitName = cardName.slice(0, 1);
  let pipNumber = Number(cardName.substring(1, cardName.length));

  switch (suitName) {
    case "C":
      suitName = "clubs-";
    case "D":
      suitName = "diamonds-";
    case "H":
      suitName = "hearts-";
    case "S":
      suitName = "spades-";
  }

  if (pipNumber < 10) {
    pipName = "r0" + pipNumber.toString();
  } else if (pipNumber == 10) pipName = "r s10";
  else if ((pipNumber = 11)) pipName = "J";
  else if ((pipNumber = 12)) pipName = "Q";
  else if ((pipNumber = 13)) pipName = "K";
  else if ((pipNumber = 14)) pipName = "A";

  imgPlayer1.src = "./images/spades/" + suitName + pipName + ".svg";
}

// for (i = 0; i < state.player1Cards.length; i++) {
//   compareCards(state.player1Cards[i], state.player2Cards[i]);
// }
