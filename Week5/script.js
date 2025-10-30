// script.js
let display = document.getElementById('display');
let currentInput = '0';
let previousInput = null;
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
    display.value = currentInput;
}

function operate(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '×':
            return a * b;
        case '÷':
            if (b === 0) {
                return 'Error';
            }
            return a / b;
        default:
            return b;
    }
}

function clearAll() {
    currentInput = '0';
    previousInput = null;
    operator = null;
    shouldResetDisplay = false;
}

function clearCurrent() {
    if (currentInput === '0' || currentInput === 'Error') {
        return;
    }
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    shouldResetDisplay = false;
}

function toggleSign() {
    if (currentInput !== '0' && currentInput !== 'Error') {
        currentInput = (-parseFloat(currentInput)).toString();
    }
}

function percentage() {
    if (currentInput !== '0' && currentInput !== 'Error') {
        currentInput = (parseFloat(currentInput) / 100).toString();
    }
}

function setOperator(nextOperator) {
    const inputNum = parseFloat(currentInput);
    if (isNaN(inputNum)) return;

    if (previousInput !== null && operator !== null) {
        const result = operate(previousInput, currentInput, operator);
        if (result === 'Error') {
            currentInput = 'Error';
        } else {
            previousInput = result;
            currentInput = result.toString();
        }
    } else {
        previousInput = inputNum;
    }

    operator = nextOperator;
    shouldResetDisplay = true;
}

function calculate() {
    if (previousInput !== null && operator !== null) {
        const inputNum = parseFloat(currentInput);
        if (isNaN(inputNum)) return;

        const result = operate(previousInput, currentInput, operator);
        if (result === 'Error') {
            currentInput = 'Error';
        } else {
            currentInput = result.toString();
        }
        previousInput = null;
        operator = null;
        shouldResetDisplay = true;
    }
}

function appendNumber(num) {
    if (currentInput === 'Error' || shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
    } else {
        if (currentInput === '0') {
            currentInput = num;
        } else {
            currentInput += num;
        }
    }
}

function appendDecimal() {
    if (currentInput === 'Error' || shouldResetDisplay) {
        currentInput = '0.';
        shouldResetDisplay = false;
    } else if (!currentInput.includes('.')) {
        currentInput += '.';
    }
}

function handleInput(value) {
    switch (value) {
        case 'AC':
            clearAll();
            break;
        case 'C':
            clearCurrent();
            break;
        case '±':
            toggleSign();
            break;
        case '%':
            percentage();
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            setOperator(value);
            break;
        case '=':
            calculate();
            break;
        case '.':
            appendDecimal();
            break;
        default:
            if (value >= '0' && value <= '9') {
                appendNumber(value);
            }
            break;
    }
    updateDisplay();
}

// Add event listeners
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.buttons button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent.trim();
            handleInput(value);
        });
    });
    updateDisplay();
});