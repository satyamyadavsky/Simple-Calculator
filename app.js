
const display = document.getElementById("display");

let firstNumber = "";
let operator = "";
let memory = 0;
let isOff = false;
let startNewNumber = true;

// Append numbers and operators
function appendValue(value) {
    if (isOff) return;

    // Handle operators
    if (["+", "-", "*", "/"].includes(value)) {
        if (display.value === "" || display.value === "0" && startNewNumber) {
            return;
        }

        if (firstNumber !== "" && operator !== "" && !startNewNumber) {
            calculate();
        }

        firstNumber = display.value;
        operator = value;
        startNewNumber = true;
        return;
    }

    // Handle decimal
    if (value === "." && startNewNumber) {
        display.value = "0";
        startNewNumber = false;
    } else if (startNewNumber) {
        display.value = "";
        startNewNumber = false;
    }

    if (value === "." && display.value.includes(".")) return;

    display.value += value;
}

// Calculate result
function calculate() {
    if (isOff || firstNumber === "" || operator === "" || startNewNumber) {
        return;
    }

    const num1 = Number(firstNumber);
    const num2 = Number(display.value);
    let result;

    switch (operator) {
        case "+":
            result = num1 + num2;
            break;

        case "-":
            result = num1 - num2;
            break;

        case "*":
            result = num1 * num2;
            break;

        case "/":
            result = num2 === 0
                ? "Cannot divide by zero"
                : num1 / num2;
            break;
    }

    display.value = String(result);

    firstNumber = "";
    operator = "";
    startNewNumber = true;
}

// Clear display
function clearDisplay() {
    display.value = "0";
    firstNumber = "";
    operator = "";
    startNewNumber = true;
}

// Memory clear / recall
function memoryClear() {
    if (isOff) return;

    if (memory !== 0) {
        display.value = String(memory);
    } else {
        memory = 0;
        display.value = "0";
    }

    startNewNumber = true;
}

// Memory subtract
function memorySubtract() {
    if (isOff) return;

    if (display.value !== "" && !isNaN(Number(display.value))) {
        memory -= Number(display.value);
        startNewNumber = true;
    }
}

// Power ON / OFF
function togglePower() {
    if (!isOff) {
        display.value = "";
        firstNumber = "";
        operator = "";
        isOff = true;
        startNewNumber = true;
    } else {
        isOff = false;
        display.value = "0";
        startNewNumber = true;
    }
}
