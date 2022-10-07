//Author: Farnaz Towhidi
const inpSuffle = document.getElementById("btnShuffle");
const inpDraw = document.getElementById("btnDraw");
const imgPlayer1 = document.getElementById("imgPlayer1Card");
const imgPlayer2 = document.getElementById("imgPlayer2Card");
const divWar = document.querySelector("#warZone");

let parWinner = document.getElementById("parWin");
let parPlayer1Status = document.getElementById("parPlayer1");
let parPlayer2Status = document.getElementById("parPlayer2");
let state = {};

function initialize() {
  state = {
    suits: ["C", "D", "H", "S"],
    tableCards: [],
    deck: [],
    player1Deck: [],
    player2Deck: [],
    player1Counter: 0,
    player2Counter: 0,
    winner: 0,
  };
  imgPlayer1.src = "";
  imgPlayer2.src = "";
  parPlayer1Status.innerHTML = "";
  parPlayer2Status.innerHTML = "";
  parWinner.innerHTML = "";
  inpSuffle.style.display = "inline";
  inpDraw.style.display = "none";
  renderEmptyWarZone();
}

inpSuffle.addEventListener("click", shuffle);
inpDraw.addEventListener("click", draw);

/*
  The function shuffle the deck and
  divide it to two players
*/
function shuffle() {
  divWar.style.background =
    "url('https://static.vecteezy.com/system/resources/previews/002/375/040/original/modern-white-background-free-vector.jpg')";
  // Create unshuffle deck
  initialize();
  for (i = 0; i < state.suits.length; i++) {
    for (j = 2; j < 15; j++) {
      state.deck.push(state.suits[i] + j);
    }
  }
  state.deck.push("J15");
  state.deck.push("J15");

  for (i = 0; i < state.deck.length; i++) {
    ranNumber = Math.floor(Math.random() * 52);
    [state.deck[i], state.deck[ranNumber]] = [
      state.deck[ranNumber],
      state.deck[i],
    ];
  }
  // Divide deck to two players
  state.player1Deck = state.deck.slice(0, 26);
  state.player2Deck = state.deck.slice(26, 52);
  inpSuffle.style.display = "none";
  inpDraw.style.display = "inline";
}

/*
  The function that shows the top card of each player
  and comapre them
 */
function draw() {
  if (state.player1Deck.length > 0 && state.player2Deck.length > 0) {
    imgPlayer1.src = createImageName(
      state.player1Deck[state.player1Deck.length - 1]
    );

    imgPlayer2.src = createImageName(
      state.player2Deck[state.player2Deck.length - 1]
    );

    compareCards(
      state.player1Deck[state.player1Deck.length - 1],
      state.player2Deck[state.player2Deck.length - 1]
    );
    state.player1Deck.pop();
    state.player2Deck.pop();
  }
  if (isGameOver(state.player1Deck, state.player2Deck)) winnerAnnouncment();
}

/*
 The function compare 2 cards and find
 who is the winner, its either player1, player2 or going to war
 @card1: Player1's card
 @card2: Player2's card
 @return: 
*/
function compareCards(card1, card2) {
  let num1 = parseInt(card1.slice(1, card1.length));
  let num2 = parseInt(card2.slice(1, card2.length));

  if (num1 > num2) {
    state.player1Counter++;
    renderWinnerCounter(state.player1Deck, 1);
  } else if (num2 > num1) {
    state.player2Counter++;
    renderWinnerCounter(state.player2Deck, 2);
  } else {
    renderFillWarZone(state.player1Deck, 0);
    renderFillWarZone(state.player2Deck, 0);
    let i = 0;
    while (i < 3) {
      // Add card to play 1 and play 2 slot
      renderFillWarZone(state.player1Deck, 1);
      renderFillWarZone(state.player2Deck, 1);
      i++;
    }
    let imgWarCards = document.querySelectorAll(".cardWar");
    // Set the left and top position of the cards in the
    // war zone
    let IncValue = 10;
    imgWarCards.forEach(function (item) {
      item.style.top = IncValue + "px";
      item.style.left = IncValue + "px";
      IncValue = IncValue + 30;
    });
    divWar.style.height = 200 + imgWarCards.length * 30 + "px";
  }

  parPlayer1Status.textContent = `Player 1 wins ${state.player1Counter}`;
  parPlayer2Status.textContent = `Player 2 wins ${state.player2Counter}`;
}

/*
  The function add image to war zone 
  and then delete image from deck
*/
function renderFillWarZone(Deck, showBackFlag) {
  let divImagContainer = document.createElement("div");
  let ImgPCard = document.createElement("img");

  showBackFlag
    ? (ImgPCard.src = "./images/backs/blue.svg")
    : (ImgPCard.src = createImageName(Deck[Deck.length - 1]));
  ImgPCard.classList.add("cardWar");
  divImagContainer.appendChild(ImgPCard);

  divWar.appendChild(divImagContainer);
  Deck.pop();
  state.tableCards.push(Deck[Deck.length - 1]);
}

/*
  The function add all cards in the war zone
  to the winner
*/
function renderWinnerCounter(flgPlayer) {
  flgPlayer == 1
    ? (state.player1Counter = state.player1Counter + state.tableCards.length)
    : (state.player2Counter = state.player2Counter + state.tableCards.length);

  state.tableCards.length = 0;
  renderEmptyWarZone();
}

/*
  The function create the name of image 
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
    case "J":
      suitName = "jokers";
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
  } else if (pipNumber == 15) {
    pipName = "black";
  }
  imagePath = `./images/${suitName}/${suitName}-${pipName}.svg`;
  return imagePath;
}

/*
  The function check if game over by comapring the 
  number of cards in two player's deck
*/
function isGameOver(player1D, player2D) {
  let isGameOverFlag = false;

  if (player1D.length == 0 && player2D.length == 0) {
    state.player1Counter > state.player2Counter
      ? (state.winner = 1)
      : (state.winner = 2);
    isGameOverFlag = true;
  }
  return isGameOverFlag;
}

/*
  The function to set the background picture of winner
*/
function winnerAnnouncment() {
  state.winner == 1
    ? (divWar.style.background = "url('./images/player1.jpg')")
    : (divWar.style.background = "url('./images/player2.jpg')");
  divWar.style.backgroundRepeat = "no-repeat";
  initialize();
  //renderEmptyWarZone();
  parWinner.textContent = `Congratulation, The winner is player ${state.winner}`;
}

/*
  The function empty war zone
*/
function renderEmptyWarZone() {
  let imgWarCards = document.querySelectorAll(".cardWar");
  imgWarCards.forEach((item) => {
    item.remove();
  });
}

initialize();
