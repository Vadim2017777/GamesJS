import { cardArray } from "./data/data.js";

cardArray.sort(() => 0.5 - Math.random());

const grid = document.querySelector(".grid");
const resultDisplay = document.querySelector("#result");
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];

function showBoxGridStart(i) {
  const card = document.createElement("img");
  card.setAttribute("src", cardArray[i].img);
  card.setAttribute("class", "grid_box");
  grid.appendChild(card);
}

function showBoxGrid() {
  for (let i = 0; i < cardArray.length; i++) {
    setTimeout(showBoxGridStart.bind(undefined, i), 200 * i);
  }
}

function createBoard() {
  grid.innerHTML = "";
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "images/blank.png");
    card.setAttribute("data-id", i);
    card.setAttribute("class", "grid_box");
    card.addEventListener("click", flipCard);
    grid.appendChild(card);
  }
}

function checkForMatch() {
  const cards = document.querySelectorAll("img");
  const optionOneId = cardsChosenId[0];
  const optionTwoId = cardsChosenId[1];

  if (optionOneId == optionTwoId) {
    cards[optionOneId].setAttribute("src", "images/blank.png");
    cards[optionTwoId].setAttribute("src", "images/blank.png");
    alert("You have clicked the same image!");
  } else if (cardsChosen[0] === cardsChosen[1]) {
    alert("You found a match");
    cards[optionOneId].setAttribute("src", "images/white.png");
    cards[optionTwoId].setAttribute("src", "images/white.png");
    cards[optionOneId].removeEventListener("click", flipCard);
    cards[optionTwoId].removeEventListener("click", flipCard);
    console.log(cardsChosen);
    cardsWon.push(cardsChosen);
  } else {
    cards[optionOneId].setAttribute("src", "images/blank.png");
    cards[optionTwoId].setAttribute("src", "images/blank.png");
    alert("Sorry, try again");
  }
  cardsChosen = [];
  cardsChosenId = [];
  console.log(cardsWon);
  resultDisplay.textContent = cardsWon.length;
  if (cardsWon.length === cardArray.length / 2) {
    resultDisplay.textContent = "Congratulations! You found them all!";
  }
}

function flipCard() {
  let cardId = this.getAttribute("data-id");
  cardsChosen.push(cardArray[cardId].name);
  cardsChosenId.push(cardId);
  this.setAttribute("src", cardArray[cardId].img);
  if (cardsChosen.length === 2) {
    setTimeout(checkForMatch, 500);
  }
}

setTimeout(showBoxGrid, 500);
setTimeout(createBoard, 4500);
