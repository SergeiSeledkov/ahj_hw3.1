import goblinImage from '../img/goblin.png';
import getRandomArbitrary from './random';

const imageElement = document.createElement('img');
const timeInterval = 1000;
let fieldCell = document.querySelectorAll('.field_cell');
let randomCell;
let intervalId;
let missHit = 0;
let correctHit = 0;
let previousRandomCell = -1;

function changeRandomImageCell(fieldCellArr, image, isInterval = false) {
  do {
    randomCell = Math.trunc(getRandomArbitrary(0, fieldCellArr.length));
  } while (randomCell === previousRandomCell);

  previousRandomCell = randomCell;
  fieldCellArr[randomCell].appendChild(image);

  if (isInterval) {
    missHit += 1;

    if (missHit === 5) {
      if (!alert('5 промахов, игра завершена')) {
        window.location.reload();
      }
    }
  }
}

function clickCell(i) {
  if (i.path[1] === fieldCell[randomCell]) {
    clearInterval(intervalId);
    changeRandomImageCell(fieldCell, imageElement);
    intervalId = setInterval(changeRandomImageCell, timeInterval, fieldCell, imageElement, true);
    correctHit += 1;
    console.log(correctHit);
  }
}

imageElement.src = goblinImage;
fieldCell = [...fieldCell];
changeRandomImageCell(fieldCell, imageElement);
intervalId = setInterval(changeRandomImageCell, timeInterval, fieldCell, imageElement, true);

for (const i of fieldCell) {
  i.addEventListener('click', clickCell, i);
}
