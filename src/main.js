let cards = [
  { name: "1D", img: "1D.jpg", value: 11 },
  { name: "2D", img: "2D.jpg", value: 2 },
  { name: "3D", img: "3D.jpg", value: 3 },
  { name: "4D", img: "4D.jpg", value: 4 },
  { name: "5D", img: "5D.jpg", value: 5 },
  { name: "6D", img: "6D.jpg", value: 6 },
  { name: "7D", img: "7D.jpg", value: 7 },
  { name: "8D", img: "8D.jpg", value: 8 },
  { name: "9D", img: "9D.jpg", value: 9 },
  { name: "10D", img: "10D.jpg", value: 10 },
  { name: "JD", img: "JD.jpg", value: 10 },
  { name: "QD", img: "QD.jpg", value: 10 },
  { name: "KD", img: "KD.jpg", value: 10 },
  { name: "1C", img: "1C.jpg", value: 11 },
  { name: "2C", img: "2C.jpg", value: 2 },
  { name: "3C", img: "3C.jpg", value: 3 },
  { name: "4C", img: "4C.jpg", value: 4 },
  { name: "5C", img: "5C.jpg", value: 5 },
  { name: "6C", img: "6C.jpg", value: 6 },
  { name: "7C", img: "7C.jpg", value: 7 },
  { name: "8C", img: "8C.jpg", value: 8 },
  { name: "9C", img: "9C.jpg", value: 9 },
  { name: "10C", img: "10C.jpg", value: 10 },
  { name: "JC", img: "JC.jpg", value: 10 },
  { name: "QC", img: "QC.jpg", value: 10 },
  { name: "KC", img: "KC.jpg", value: 10 },
  { name: "1S", img: "1S.jpg", value: 11 },
  { name: "2S", img: "2S.jpg", value: 2 },
  { name: "3S", img: "3S.jpg", value: 3 },
  { name: "4S", img: "4S.jpg", value: 4 },
  { name: "5S", img: "5S.jpg", value: 5 },
  { name: "6S", img: "6S.jpg", value: 6 },
  { name: "7S", img: "7S.jpg", value: 7 },
  { name: "8S", img: "8S.jpg", value: 8 },
  { name: "9S", img: "9S.jpg", value: 9 },
  { name: "10S", img: "10S.jpg", value: 10 },
  { name: "JS", img: "JS.jpg", value: 10 },
  { name: "QS", img: "QS.jpg", value: 10 },
  { name: "KS", img: "KS.jpg", value: 10 },
  { name: "1H", img: "1H.jpg", value: 11 },
  { name: "2H", img: "2H.jpg", value: 2 },
  { name: "3H", img: "3H.jpg", value: 3 },
  { name: "4H", img: "4H.jpg", value: 4 },
  { name: "5H", img: "5H.jpg", value: 5 },
  { name: "6H", img: "6H.jpg", value: 6 },
  { name: "7H", img: "7H.jpg", value: 7 },
  { name: "9H", img: "9H.jpg", value: 9 },
  { name: "10H", img: "10H.jpg", value: 10 },
  { name: "JH", img: "JH.jpg", value: 10 },
  { name: "QH", img: "QH.jpg", value: 10 },
  { name: "KH", img: "KH.jpg", value: 10 },
];

let game = null;

// let staticCards = [];
// let dealerCards = [];
// let playerCards = [];
// let playerScore = 0;
// let dealerScore = 0;
// let roundLost = false;
// let roundWon = false;
// let roundTied = false;

let userEl = document.querySelector("#user");
let aiEl = document.querySelector("#computer");
let betInput = document.querySelector("input");
let bet = document.querySelector(".container p span span");

//create player
let John = new Player("John");
userEl.querySelector(".balance").innerText = John.balance + " $";

let AI = new Computer();
aiEl.querySelector(".balance").innerText = AI.balance + " $";

betInput.oninput = function () {
  userEl.querySelector(".balance").innerText = John.balance - this.value + " $";
  bet.innerText = this.value + " $";
};

//start game - new game
function startGame() {
  betInput.style.display = "inline";
  bet.parentNode.style.display = "inline";
  //clear previous results
  John.hand = [];
  AI.hand = [];
  John.score = 0;
  AI.score = 0;
  betInput.value = 0;
  bet.innerText = "";
  clearDashboard([userEl, aiEl]);
  document.querySelector(".buttons").style.display = "flex";
  //start game
  game = new Blackjack(cards);

  //deal the hand
  game.shuffle(John);
  game.shuffle(AI);
  game.shuffle(John);
  game.shuffle(AI);

  console.log(John);
  console.log(AI);

  //render cards
  John.hand.forEach((card) => renderCard(card.img, userEl, John.score));
  userEl.querySelector(".balance").innerText =
    John.balance - betInput.value + " $";
  AI.hand.forEach((card) => renderCard(card.img, aiEl, AI.score, true));
  aiEl.querySelector(".balance").innerText = AI.balance + " $";
}

document.querySelector(".new_game").onclick = function () {
  startGame();
};

// show back cards
function renderCard(cardSrc, el, score, shouldShowBackCard = false) {
  let card = document.createElement("img");
  if (shouldShowBackCard) {
    card.src = `images/Gray_back.jpg`;
    el.querySelector("div.score").innerText = `Score: ??`;
  } else {
    card.src = `images/${cardSrc}`;
    el.querySelector("div.score").innerText = `Score: ${score}`;
  }
  el.appendChild(card);
}

// clear the dashboard
function clearDashboard(arr) {
  arr.forEach((player) => {
    let imgs = player.querySelectorAll("img");
    imgs.forEach((img) => {
      player.removeChild(img);
    });
    player.querySelector(".result").innerText = "";
  });
}

//hit me - skip - check btns

function hitMe(player, el, shouldShowBackCards) {
  let card = game.shuffle(player);
  renderCard(card.img, el, player.score, shouldShowBackCards);
  findWinner([
    {
      el: userEl,
      obj: John,
    },
    {
      el: aiEl,
      obj: AI,
    },
  ]);
}

document
  .querySelector("#user button.hit")
  .addEventListener("click", function () {
    hitMe(John, userEl);
    // let random = Math.round(Math.random())
    if (AI.score < 17) {
      hitMe(AI, aiEl, true);
    }
  });
document
  .querySelector("#user button.skip")
  .addEventListener("click", function () {
    // let random = Math.round(Math.random())
    while (AI.score < 17) {
      // random = Math.round(Math.random())
      hitMe(AI, aiEl, true);
    }
  });

document
  .querySelector("#user button.stand")
  .addEventListener("click", function () {
    findWinner(
      [
        {
          el: userEl,
          obj: John,
        },
        {
          el: aiEl,
          obj: AI,
        },
      ],
      true
    );
  });

//find the winner

function findWinner(arr, stand = false) {
  if (arr.some((player) => player.obj.score > 21)) {
    clearDashboard([userEl, aiEl]);
    John.hand.forEach((card) => renderCard(card.img, userEl, John.score));
    AI.hand.forEach((card) => renderCard(card.img, aiEl, AI.score));
    arr.forEach((player) => {
      let result = player.el.querySelector("div.result");
      if (player.obj.score > 21) {
        result.innerText = `[LOSER!]`;
        result.style.color = "red";
        result.style.opacity = 0.8;
        player.obj.balance -= +betInput.value;
      } else {
        result.innerText = `[WINNER!]`;
        result.style.color = "yellow";
        result.style.opacity = 0.8;
        player.obj.wins += 1;
        player.obj.balance += +betInput.value;
      }
      //player.el.style.visibility = "visible";
    });
  }
  if (stand) {
    clearDashboard([userEl, aiEl]);
    John.hand.forEach((card) => renderCard(card.img, userEl, John.score));
    AI.hand.forEach((card) => renderCard(card.img, aiEl, AI.score));
    let winner = null;
    let difference = 100;
    arr.forEach((player, index) => {
      if (21 - player.obj.score < difference) {
        difference = 21 - player.obj.score;
        winner = index;
      } else if (21 - player.obj.score == difference) {
        winner = 1;
      }
    });

    console.log(winner, difference);

    arr.forEach((player, index) => {
      let result = player.el.querySelector("div.result");
      if (index !== winner) {
        result.innerText = `[LOSER!]`;
        result.style.color = "red";
        result.style.opacity = 0.8;
        player.obj.balance -= +betInput.value;
      } else {
        result.innerText = `[WINNER!]`;
        result.style.color = "yellow";
        player.obj.wins += 1;
        result.style.opacity = 0.8;
        player.obj.balance += +betInput.value;
      }
      //player.el.style.visibility = "visible";
    });
  }
}
