let displayValue = "";

function appendToDisplay(value) {
    displayValue += value;
    document.getElementById("display").value = displayValue;
}

function clearDisplay() {
    displayValue = "";
    document.getElementById("display").value = "";
}

function evaluate(dummyDisplay = null){
    if(dummyDisplay)
        return eval(dummyDisplay)
    return eval(displayValue);
}
function calculate() {
    try {
        displayValue = evaluate();
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

module.exports = {
    evaluate
}