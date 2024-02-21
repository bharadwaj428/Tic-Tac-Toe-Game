let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset');
let newBtn = document.querySelector('.new');
let msg = document.querySelector('#msg');
let msgContainer = document.querySelector('.msg-container');
let turnO = true;
let count = 0;
const winnerPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const resetGame = () => {
  let turnO = true;
  enableBoxes();
  msgContainer.classList.add('hide');
  count = 0;
};
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = '';
  }
};
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
boxes.forEach((box) => {
  box.addEventListener('click', () => {
    if (turnO) {
      box.innerText = 'O';
      turnO = false;
    } else {
      box.innerText = 'X';
      turnO = true;
    }
    box.disabled = true;
    count++;
    let isWinner = checkWinner();
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});
const gameDraw = () => {
  msg.innerText = 'Game was Draw';
  msgContainer.classList.remove('hide');
  disableBoxes();
};
const showWinner = (winner) => {
  msg.innerText = `Congratulations the winner is ${winner}`;
  msgContainer.classList.remove('hide');
  disableBoxes();
};

const checkWinner = () => {
  for (let winner of winnerPatterns) {
    let pos1 = boxes[winner[0]].innerText;
    let pos2 = boxes[winner[1]].innerText;
    let pos3 = boxes[winner[2]].innerText;

    if (pos1 != '' && pos2 != '' && pos3 != '') {
      if (pos1 === pos2 && pos2 === pos3) {
        showWinner(pos1);
        return true;
      }
    }
  }
};
resetBtn.addEventListener('click', resetGame);
newBtn.addEventListener('click', resetGame);
