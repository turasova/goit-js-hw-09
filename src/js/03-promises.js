import Notiflix from 'notiflix';


function createPromise(position, delay) {

  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);

  })

}

const refs = {
  form: document.querySelector('.form'), 
}

refs.form.addEventListener('submit', handlerSubmitCreate);

function handlerSubmitCreate(evt) {

  evt.preventDefault();

  const { delay, step, amount } = evt.currentTarget.elements;
  let inputDelay = Number(delay.value);
  let inputStep = Number(step.value);
  let inputAmount = Number(amount.value);

  for (let i = 1; i <= inputAmount; i += 1) {
    

  createPromise(i, inputDelay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
inputDelay += inputStep;
  }
  evt.currentTarget.reset();
}


