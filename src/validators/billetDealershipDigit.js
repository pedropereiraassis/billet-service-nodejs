const validateGeneralDigit = (barCode) => {

  if (barCode[2] == 8 || barCode[2] == 9) {
    validateMod11(barCode);
    return;
  } else {
    validateMod10(barCode);
    return;
  }
}

const validateMod11 = (barCode) => {
  const data = barCode.substring(0, 3) + barCode.substring(4, 44);
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

  if (digit == 10) {
    digit = 1;
  } else if (digit == 0 || digit == 1) {
    digit = 0;
  }
  
  if (digit != barCode[3]) {
    throw new Error('Boleto inválido: dígito verificador geral inválido.')
  } 

  return
}

const validateMod10 = (barCode) => {
  const data = barCode.substring(0, 3) + barCode.substring(4, 44);
  let numbers = [];
  let factor = 2;

  for (let i = data.length - 1; i >= 0; i--) {
    numbers.push((data[i] * factor).toString());

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
  
  if (digit != barCode[3]) {
    throw new Error('Boleto inválido: dígito verificador geral inválido.')
  } 

  return
}

const validateDigits = (billetCode) => {
  const firstField = billetCode.substring(0, 11);
  const secondField = billetCode.substring(12, 23);
  const thirdField = billetCode.substring(24, 35);
  const fourthField = billetCode.substring(36, 47);

  const firstDigit = getDigit(firstField);
  const secondDigit = getDigit(secondField);
  const thirdDigit = getDigit(thirdField);
  const fourthDigit = getDigit(fourthField);
  
  if (firstDigit != billetCode[11] || secondDigit != billetCode[23] || thirdDigit != billetCode[35] || fourthDigit != billetCode[47]) {
    throw new Error('Boleto inválido: dígitos verificadores inválidos.')
  }

  return
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
}