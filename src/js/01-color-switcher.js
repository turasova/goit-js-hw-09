function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const selectors = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
};
console.log(selectors.start);
 
selectors.start.addEventListener('click', handlerClickStart);
selectors.stop.addEventListener('click', handlerClickStop);
let timerId = null;

function handlerClickStart(evt) {

   selectors.start.disabled = true;
    selectors.stop.disabled = false;

   
 timerId = setInterval(() => {
     const color = getRandomHexColor();
     document.body.style.background = color;
 }, 1000);    
    
};

function handlerClickStop(evt) {
    selectors.start.disabled = false;
    selectors.stop.disabled = true;

    clearInterval(timerId);
}