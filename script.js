const boxes = document.querySelectorAll(".box");
const btn = document.querySelector(".reset");
const turn = document.querySelector(".turn");
const modal = document.getElementById("modal");
const won = document.querySelector(".won");
const close = document.querySelector(".close");
const restart = document.querySelector(".restart");
const img = document.querySelector(".img");
const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
const arrcombinations = [
  [
    [1, 2],
    [4, 8],
    [3, 6],
  ],
  [
    [0, 2],
    [4, 7],
  ],
  [
    [1, 0],
    [4, 6],
    [5, 8],
  ],
  [
    [0, 6],
    [4, 5],
  ],
  [
    [0, 8],
    [2, 6],
    [3, 5],
    [1, 7],
  ],
  [
    [2, 8],
    [4, 3],
  ],
  [
    [3, 0],
    [7, 8],
    [4, 2],
  ],
  [
    [6, 8],
    [4, 1],
  ],
  [
    [5, 2],
    [7, 6],
    [4, 0],
  ],
];

var count = 0;
var symbol = "x";
var result = false;

for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("click", update);
}
//reset the whole game
btn.addEventListener("click", reset);

//modal reset
restart.addEventListener("click", function () {
  reset();
  modal.close();
});

close.addEventListener("click", function () {
  modal.close();
});

function reset() {
  remove();
  for (let i = 0; i < 9; i++) {
    arr[i] = 0;
    boxes[i].addEventListener("click", update);
    boxes[i].innerHTML = "";
    boxes[i].style.backgroundColor = "hsla(180, 22%, 45%, 0.7)";
  }
  count = 0;
  result = false;
  symbol = "x";
  turn.innerHTML = "X's Turn";
}

//updating the content
function update(event) {
  const number = Array.from(boxes).indexOf(event.target);
  boxes[number].innerHTML = symbol;
  if (symbol == "x") {
    boxes[number].style.backgroundColor = "#F28F3B";
  }
  arr[number] = symbol;
  access(number, symbol);
  symbol = symbol === "x" ? "y" : "x";
  if (result == false && turn.innerHTML != "Match draw") {
    turn.innerHTML = `${symbol}'s turn`;
  } else if (result == false) {
    won.innerHTML = "Game Draw";
    img.setAttribute("src", "pencil.png");
    modal.showModal();
  } else {
    turn.innerHTML = "Game Over";
    won.innerHTML = `${arr[number]} won`;
    img.setAttribute("src", "trophy.png");
    modal.showModal();
  }

  boxes[number].removeEventListener("click", update);
}

//checking for the win
function access(index, symbol) {
  count = count + 1;

  for (let i = 0; i < arrcombinations[index].length; i++) {
    if (
      arr[arrcombinations[index][i][0]] == arr[index] &&
      arr[arrcombinations[index][i][1]] == arr[index]
    ) {
      boxes[arrcombinations[index][i][0]].style.backgroundColor = "green";
      boxes[arrcombinations[index][i][1]].style.backgroundColor = "green";
      boxes[index].style.backgroundColor = "green";
      result = true;
      remove();
    }
  }

  if (count == 9 && result == false) {
    turn.innerHTML = "Match draw";
  }
}

//removing the event listener after the match completed and before hitting reset
function remove() {
  for (let i = 0; i < 9; i++) {
    if (arr[i] == 0) {
      boxes[i].removeEventListener("click", update);
    }
  }
}
