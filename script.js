let displayValue = "";

function appendToDisplay(value) {
    displayValue += value;
    document.getElementById("display").value = displayValue;
}

function clearDisplay() {
    displayValue = "";
    document.getElementById("display").value = "";
}

function calculate() {
    try {
        displayValue = eval(displayValue);
        document.getElementById("display").value = displayValue;
    } catch (error) {
        displayValue = "Error";
        document.getElementById("display").value = displayValue;
    }
}

function backspace() {
    displayValue = displayValue.slice(0, -1);
    document.getElementById("display").value = displayValue;
}
