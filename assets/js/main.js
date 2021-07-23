const cartCounterLabel = document.querySelector('#cart-counter-label');
const contentContainer = document.querySelector('#content-container');

var carCounter = 0;
var cartPrice = 0;

const incremrntCounter = () => {
  cartCounterLabel.innerHTML = `${++carCounter}`;
    if (carCounter === 1) cartCounterLabel.style.display = 'block';
}

const getMockData = (t) => +t.parentElement
.previousElementSibling
.innerHTML.replace(/^\$(\d+)\s\D+(\d+).*$/, '$1.$2');

const getPrice = (t, price) => Math.round((cartPrice + getMockData(t)) * 100) / 100;

const disableControls = (t, fn) => {
  contentContainer.removeEventListener('click', fn);
  t.disabled = true;
}

const enableControls = (t, fn) => {
  t.disabled = false;
  contentContainer.addEventListener('click', fn);
}

const btnClickHandler = (e) => {
  const target = e.target;
  const interval = 2000;

  var restoreHtml = null;

  if (target && target.matches('.item-actions__cart')) {
    incremrntCounter();
  
    cartPrice = getPrice(target, cartPrice);

    restoreHtml = target.innerHTML;
    target.innerHTML = `Added ${cartPrice.toFixed(2)} $`;

    disableControls(target, btnClickHandler);

    setTimeout(() => {
      target.innerHTML = restoreHtml;
      enableControls(target, btnClickHandler);
    }, interval)
  }
};

contentContainer.addEventListener('click', btnClickHandler)