// suits: ["clubs", "diamonds", "hearts", "spades"],

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
Suffle();
for (i = 0; i < state.player1Cards.length; i++) {
  compareCards(state.player1Cards[i], state.player2Cards[i]);
}

function Suffle() {
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

  console.log(state.player1Cards);
  console.log(state.player2Cards);
}

function compareCards(card1, card2) {
  let num1 = card1.slice(1, card1.length);
  let num2 = card2.slice(1, card2.length);

  if (num1 > num2) state.player1WinningCards.push(card1, card2);
  else if (num2 > num1) state.player2WinnigCards.push(card1, card2);
}

console.log(state.player1WinningCards.length);
console.log(state.player2WinnigCards.length);
