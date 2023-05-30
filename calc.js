let currentTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value) {
  console.log("Button clicked: ", value);

  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  screen.innerText = buffer;
}

function handleSymbol(symbol) {
  console.log("Symbol clicked: ", symbol);

  switch (symbol) {
    case 'Clear':
      buffer = "0";
      currentTotal = 0;
      break;
    case '=':
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer, 10));
      previousOperator = null;
      buffer = currentTotal.toString();
      currentTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = '0';
      } else {
        buffer = buffer.toString().slice(0, -1);
      }
      break;
    case "+":
    case "−":
    case "×":
    case "÷":
      handleMath(symbol);
      break;
  }
}

function handleNumber(numberString) {
  if (buffer === '0') {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
  // Convert buffer to a number
  buffer = parseInt(buffer, 10);
}

function handleMath(symbol) {
  if (buffer === "0") {
    return;
  }

  const intBuffer = parseInt(buffer, 10);

  if (currentTotal === 0) {
    currentTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  previousOperator = symbol;
  buffer = "0";
}

function flushOperation(intBuffer) {
  if (previousOperator === '+') {
    currentTotal += intBuffer;
  } else if (previousOperator === '−') {
    currentTotal -= intBuffer;
  } else if (previousOperator === '×') {
    currentTotal *= intBuffer;
  } else if (previousOperator === '÷') {
    currentTotal /= intBuffer;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  init();
});

function init() {
  const buttons = document.querySelectorAll('.calc-button');
  buttons.forEach((button) => {
    button.addEventListener('click', function(event) {
      buttonClick(event.target.innerText);
    });
  });
}
