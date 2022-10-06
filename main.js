const inpSuffle = document.getElementById("btnShuffle");
const inpDeal = document.getElementById("btnDeal");
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
  };
  inpSuffle.addEventListener("click", shuffle);
  inpDeal.addEventListener("click", draw);
  parPlayer1Status.innerHTML = "";
  parPlayer2Status.innerHTML = "";
  parWinner.innerHTML = "";
  inpSuffle.style.display = "inline";
  inpDeal.style.display = "none";
}

/*
This function shuffle the deck and
*/
function shuffle() {
  // Create unshuffle deck
  for (i = 0; i < state.suits.length; i++) {
    for (j = 2; j < 15; j++) {
      state.deck.push(state.suits[i] + j);
    }
  }

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
  inpDeal.style.display = "inline";
}

/*
 */
function draw() {
  let NumofPlayer1Cards = state.player1Deck.length;
  let NumofPlayer2Cards = state.player2Deck.length;

  if (NumofPlayer1Cards > 0 && NumofPlayer2Cards > 0) {
    imgPlayer1.src = createImageName(state.player1Deck[NumofPlayer1Cards - 1]);

    imgPlayer2.src = createImageName(state.player2Deck[NumofPlayer2Cards - 1]);

    compareCards(
      state.player1Deck[NumofPlayer1Cards - 1],
      state.player2Deck[NumofPlayer2Cards - 1]
    );
    state.player1Deck.pop();
    state.player2Deck.pop();
  }
  isGameOver(state.player1Deck, state.player2Deck);
  inpSuffle.style.display = "none";
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

  if (num1 > num2) {
    state.player1Counter++;
    addWarCardstoWinner(state.player1Deck, 1);
  } else if (num2 > num1) {
    state.player2Counter++;
    addWarCardstoWinner(state.player1Deck, 2);
  } else {
    addCardtoWarZone(state.player1Deck, 0);
    addCardtoWarZone(state.player2Deck, 0);
    let i = 0;
    while (i < 3) {
      //if (isGameOver) break;

      // Add card to play 1 and play 2 slot
      addCardtoWarZone(state.player1Deck, 1);
      addCardtoWarZone(state.player2Deck, 1);
      i++;
    }
    let imgWarCards = document.querySelectorAll(".cardWar");

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
Function add image to war zone 
and then delete image from deck
*/
function addCardtoWarZone(Deck, showBackFlag) {
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

function addWarCardstoWinner(flgPlayer) {
  let imgWarCards = document.querySelectorAll(".cardWar");
  // Add Cards of war zone to winner counter
  flgPlayer == 1
    ? (state.player1Counter = state.player1Counter + state.tableCards.length)
    : (state.player2Counter = state.player2Counter + state.tableCards.length);

  state.tableCards.length = 0;
  imgWarCards.forEach((item) => {
    item.remove();
  });
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

/*
function check if game over by comapring the 
number of cards in two player's deck
*/
function isGameOver(player1D, player2D) {
  let isGameOverFlag = false;
  let winnerMessage = "";

  if (player1D.length == 0) {
    winnerMessage = "Congratulation! winner is player 2";
    isGameOverFlag = true;
  } else if (player2D.length == 0) {
    winnerMessage = "Congratulation! winner is player 1";
    isGameOverFlag = true;
  }

  parWinner.textContent = winnerMessage;
  if (isGameOverFlag == true) {
    inpSuffle.style.display = "inline";
    inpDeal.style.display = "none";
    divWar.style.background = "url('./images/player2.jpg')";
    divWar.style.backgroundRepeat = "no-repeat";
  }
  return isGameOverFlag;
}

initialize();
