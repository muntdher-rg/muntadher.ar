const aab = document.querySelector('#annoying-button');

// Global state icky
let isMoving = false;
let phraseCount = 0;

document.addEventListener("DOMContentLoaded", (event) => {
  talkTrash();
  setInterval(() => talkTrash(), 3000);
});

document.addEventListener("mousemove", (event) => {
  rotatePupils(event);
  calculateDistance(event, aab);
});

aab.addEventListener('click', () => playHehheh(phraseCount));

function talkTrash() {
  const phrases = [
    "Click me if you can!",
    "You are just the best at this.",
    "Close... on opposite day!",
    "No no no, not today!",
    "You are making me yawn.",
    "What did you do to yourself to deserve this?",
    "Hopefully CodePen picks this ;)",
    "DOINK!",
    "I am like the 'Cats' of CodePens you know.",
    "Please tell me I am annoying, PLEASE!",
    "FIGARO, FIGARO!",
    "I promise to fix all your bugs if you can click me!",
    "2020 is my favorite year!!!",
    "The fact that this exists is just scary..",
    "Did you know that pineapples on pizza is the best?",
    "SOMEBODY ONCE TOLD ME.",
    "derp.",
    "Jarrod needs better project ideas",
    "someone help.",
    "Hopefully, I don't repeat everything I just said"
  ];
  
  const trashTalk = document.querySelector('#trash-talk');
  const selection = phrases[phraseCount];
  
  trashTalk.textContent = selection;
  
  phraseCount++;
  
  if (phraseCount >= phrases.length) {
    phraseCount = 0;
  }
}

function playHehheh() {
  const audio = new Audio("https://assets.codepen.io/394353/hehheh.m4a");
  audio.play();
}

function rotatePupils() {
  const leftPupil = document.querySelector('#left-pupil');
  const rightPupil = document.querySelector('#right-pupil');
  const { x, y } = event;
  const { left, top } = rightPupil.getBoundingClientRect();

  const goRight = x >= left;
  const goDown = y >= top;

  const leftPos = goRight ? 50 : -50;
  const upPos = goDown ? 50 : -50;

  leftPupil.style.transform = `translate(${leftPos}%, ${upPos}%)`;
  rightPupil.style.transform = `translate(${leftPos}%, ${upPos}%)`;
}

function calculateDistance(event, el) {
  const { x, y } = event;
  const { top, right, bottom, left } = el.getBoundingClientRect();
  const distTilMove = 100;

  const horizontalDist = left - x;
  const verticalDist = top - y;

  // negative coming from the right, positive coming from the left
  const isHorizontalInReach = horizontalDist <= distTilMove && horizontalDist >= -distTilMove;
  
  // negative coming from bottom, positive coming from the top
  const isVerticalInReach = verticalDist <= distTilMove && verticalDist >= -distTilMove;

  if (isHorizontalInReach && isVerticalInReach) {
    const moveRight = horizontalDist <= distTilMove && horizontalDist >= 0;
    const moveDown = verticalDist <= distTilMove && verticalDist >= 0;

    if (!isMoving) {
      isMoving = true;
      moveObject(el, x, y, moveDown, moveRight);
    }
  }
}

function moveObject(el, x, y, moveDown, moveRight) {
  const isOutOfBounds = checkBoundaries(el);
  const { newX, newY } = calculateNewPosition(
    isOutOfBounds,
    moveDown,
    moveRight
  );

  for (let i = 0; i <= 1; i += 0.25) {
    requestAnimationFrame((time) =>
      animateButton({ el, percent: i, x, y, newX, newY })
    );
  }

  isMoving = false;
}

function checkBoundaries(el) {
  return (
    el.offsetLeft <= 0 ||
    el.offsetLeft >= window.innerWidth ||
    el.offsetTop <= 0 ||
    el.offsetTop >= window.innerHeight
  );
}

function calculateNewPosition(isOutOfBounds, moveDown, moveRight) {
  const distToMove = 75;

  return isOutOfBounds
    ? {
        newX: Math.random() * window.innerWidth,
        newY: Math.random() * window.innerHeight
      }
    : {
        newX: moveRight
          ? Math.random() * distToMove + distToMove
          : Math.random() * -distToMove - distToMove,
        newY: moveDown
          ? Math.random() * distToMove + distToMove
          : Math.random() * -distToMove - distToMove
      };
}

function animateButton({ el, percent, x, y, newX, newY }) {
  const distXToTravel = newX * percent;
  const distYToTravel = newY * percent;

  el.style.transform = `translate(${distXToTravel}px, ${distYToTravel}px)`;
}