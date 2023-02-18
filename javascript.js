const equation = ["", "", ""];
const bottomText = document.getElementById("bottomText");
const topText = document.getElementById("topText");
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.className === "number") {
      createNumber(button.textContent);
    } else {
      handleOperator(button.textContent);
    }
  });
});

function createNumber(number) {
  if (topText.textContent.includes("=")) {
    equation[0] = "";
  }

  if (equation[1] === "") {
    if (number === "." && equation[0].includes(".")) return;
    if (number === "CE") {
      equation[0] = "";
      bottomText.textContent = "0";
    } else if (number === "+/-") {
      equation[0] = (Number(equation[0]) * -1).toString();
      bottomText.textContent = equation[0];
    } else {
      equation[0] += number;
      bottomText.textContent = equation[0];
    }
  } else {
    if (number === "." && equation[2].includes(".")) return;
    if (number === "CE") {
      equation[2] = "";
      bottomText.textContent = "0";
    } else if (number === "+/-") {
      equation[2] = (Number(equation[2]) * -1).toString();
      bottomText.textContent = equation[2];
    } else {
      equation[2] += number;
      bottomText.textContent = equation[2];
    }
  }
}

function handleOperator(operator) {
  switch (operator) {
    case "CE":
    case ".":
    case "+/-":
      createNumber(operator);
      break;
    case "C":
      clearAll();
      break;
    case "%":
    case "/":
    case "*":
    case "-":
    case "+":
      addOperator(operator);
      break;
    case "=":
      evaluate();
      break;
  }
}

function clearAll() {
  for (let i = 0; i < equation.length; ++i) {
    equation[i] = "";
  }

  bottomText.textContent = "0";
  topText.textContent = "";
}

function addOperator(operator) {
  if (equation[2] !== "") {
    evaluate();
    equation[1] = operator;
    topText.textContent = equation.join(" ");
  } else {
    equation[1] = operator;
    topText.textContent = equation.join(" ");
  }
}

function evaluate() {
  let result = 0;

  if (equation[2] === "") {
    equation[2] = equation[0];
  }

  switch (equation[1]) {
    case "%":
      if (equation[2] === "0") {
        alert("Error: divisor can not be zero");
        clearAll();
      } else {
        result = Number(equation[0]) % Number(equation[2]);
      }
      break;
    case "/":
      if (equation[2] === "0") {
        alert("Error: divisor can not be zero");
        clearAll();
      } else {
        result = Number(equation[0]) / Number(equation[2]);
      }
      break;
    case "*":
      result = Number(equation[0]) * Number(equation[2]);
      break;
    case "-":
      result = Number(equation[0]) - Number(equation[2]);
      break;
    case "+":
      result = Number(equation[0]) + Number(equation[2]);
      break;
    default:
      result = Number(equation[0]);
      equation[2] = "";
  }

  topText.textContent = equation.join(" ") + " =";
  bottomText.textContent = +result.toFixed(3);
  equation[0] = result.toString();
  equation[1] = "";
  equation[2] = "";
}
