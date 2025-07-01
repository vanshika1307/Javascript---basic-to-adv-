let display = document.getElementById('result');
let currentInput = '';
let operator = '';
let previousInput = '';

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.textContent;
            const classList = this.classList;
            
            if (classList.contains('number')) {
                handleNumber(value);
            } else if (classList.contains('operator')) {
                handleOperator(value);
            } else if (classList.contains('equals')) {
                handleEquals();
            } else if (classList.contains('clear')) {
                handleClear(value);
            }
        });
    });
    
    // Add keyboard support
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        
        if (key >= '0' && key <= '9' || key === '.') {
            handleNumber(key);
        } else if (key === '+' || key === '-') {
            handleOperator(key);
        } else if (key === '*') {
            handleOperator('×');
        } else if (key === '/') {
            event.preventDefault(); // Prevent browser search
            handleOperator('/');
        } else if (key === 'Enter' || key === '=') {
            handleEquals();
        } else if (key === 'Escape' || key.toLowerCase() === 'c') {
            handleClear('C');
        } else if (key === 'Backspace') {
            handleClear('⌫');
        }
    });
});

function handleNumber(num) {
    if (num === '.' && currentInput.includes('.')) {
        return; // Prevent multiple decimal points
    }
    
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else {
        currentInput += num;
    }
    
    updateDisplay(currentInput);
}

function handleOperator(op) {
    if (currentInput === '' && previousInput === '') {
        return; // Don't allow operator as first input
    }
    
    if (currentInput === '' && operator !== '') {
        operator = op; // Change operator if no new number entered
        return;
    }
    
    if (previousInput !== '' && currentInput !== '' && operator !== '') {
        calculate();
    }
    
    operator = op;
    previousInput = currentInput || previousInput;
    currentInput = '';
}

function handleEquals() {
    if (previousInput !== '' && currentInput !== '' && operator !== '') {
        calculate();
    }
}

function handleClear(type) {
    if (type === 'C') {
        // Clear all
        currentInput = '';
        previousInput = '';
        operator = '';
        updateDisplay('0');
    } else if (type === '⌫') {
        // Backspace
        if (currentInput !== '') {
            currentInput = currentInput.slice(0, -1);
            updateDisplay(currentInput || '0');
        }
    }
}

function calculate() {
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;
    
    if (isNaN(prev) || isNaN(current)) {
        return;
    }
    
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                updateDisplay('Error');
                resetCalculator();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    // Round to avoid floating point precision issues
    result = Math.round(result * 100000000) / 100000000;
    
    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay(currentInput);
}

function updateDisplay(value) {
    display.value = value;
}

function resetCalculator() {
    currentInput = '';
    previousInput = '';
    operator = '';
    setTimeout(() => {
        updateDisplay('0');
    }, 1500);
}

// Initialize display
updateDisplay('0');