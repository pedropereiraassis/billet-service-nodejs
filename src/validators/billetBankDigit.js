const validateGeneralDigit = (barCode) => {
  const data = barCode.substring(0, 4) + barCode.substring(5, 44);
  let sum = 0;
  let factor = 2;

  for(let i = data.length - 1; i >= 0; i--) {
    sum = sum + data[i] * factor;

    factor++;
    if(factor > 9) {
      factor = 2;
    } 
  }

  let digit = 11 - (sum % 11);

  if (digit == 0 || digit == 10 || digit == 11) {
    digit = 1;
  }
  
  if (digit != barCode[4]) {
    return false
  } 
  return true
}

const validateDigits = (billetCode) => {
  const firstField = billetCode.substring(0, 9);
  const secondField = billetCode.substring(10, 20);
  const thirdField = billetCode.substring(21, 31);

  const firstDigit = getDigit(firstField);
  const secondDigit = getDigit(secondField);
  const thirdDigit = getDigit(thirdField);

  if (firstDigit != billetCode[9] || secondDigit != billetCode[20] || thirdDigit != billetCode[31]) {
    return false
  }

  return true
}

const getDigit = (field) => {
  let numbers = [];
  let factor = 2;

  for (let i = field.length - 1; i >= 0; i--) {
    numbers.push((field[i] * factor).toString());

    if (factor == 2) {
      factor = 1;
    } else {
      factor = 2;
    }
  }

  let sum = numbers.join('')
    .split('')
    .map(Number)
    .reduce((beforeValue, currentValue) => beforeValue + currentValue);

  let digit = 10 - (sum % 10)

  if (digit == 10) {
    digit = 0
  }
  
  return digit;
}

module.exports = {
  validateGeneralDigit,
  validateDigits,
  getDigit,
}