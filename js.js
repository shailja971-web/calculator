const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
let currentInput = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (button.id === 'clear') {
      currentInput = '';
      display.value = '';
      return;
    }

    if (button.id === 'backspace') {
      currentInput = currentInput.slice(0, -1);
      display.value = currentInput;
      return;
    }

    if (button.id === 'equals') {
      try {
        const expression = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
        let result = eval(expression);

        if (result === undefined) {
          display.value = '';
          currentInput = '';
        } else {
          display.value = result;
          currentInput = result.toString();
        }
      } catch (error) {
        display.value = 'Error';
        currentInput = '';
      }
      return;
    }

    // For operators and numbers
    if ('0123456789.+-*/'.includes(value) || button.classList.contains('operator')) {
      if (button.classList.contains('operator')) {
        currentInput += button.getAttribute('data-op');
        display.value = currentInput;
      } else {
        currentInput += value;
        display.value = currentInput;
      }
    }
  });
});
