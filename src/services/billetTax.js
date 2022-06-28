const taxDigitValidator = require('../validators/billetTaxDigit');

const getBarCodeTax = async (billetCode) => {
  const barCode = (
    billetCode.substring(0, 11) +
    billetCode.substring(12, 23) + 
    billetCode.substring(24, 35) +
    billetCode.substring(36, 47)
  );

  const generalDigitIsValid = taxDigitValidator.validateGeneralDigit(barCode);
  const digitsAreValids = taxDigitValidator.validateDigits(billetCode);
  
  if (!generalDigitIsValid) {
    throw new Error('Boleto inválido: dígito verificador geral inválido.');
  } else if (!digitsAreValids) {
    throw new Error('Boleto inválido: dígitos verificadores inválidos.');
  }
  return barCode;
}

/* como entendi que não há um padrão para a data de vencimento dos boletos de arrecadação
por ser livre para a empresa que utiliza colocar ou não, e se colocar pode ser adicionado
em qualquer posição, fiz essa validação um tipo que encontrei que tinha vencimento */
const getExpirationTax = async (barCode) => {
  const dateToFormat = `${barCode.slice(23, 25)}/${barCode.slice(25, 27)}/${barCode.slice(19, 23)}`
  const expirationDate = new Date(dateToFormat);

  if (expirationDate.getTime() && expirationDate.getFullYear() > 1900 && expirationDate.getFullYear() < 2030) {
    return expirationDate.toISOString().slice(0, 10);
  } else {
    return 'boleto sem validade determinada';
  }
}

const getAmountTax = async (barCode) => {
  let factorAmount = Number(barCode.substring(4, 15)).toString();
  if (factorAmount.length < 3 && factorAmount != 0) {
    factorAmount = factorAmount.padStart(3, '0');
  }
  if ((barCode[2] == 6 || barCode[2] == 8) && factorAmount != 0) {
    const decimal = factorAmount.slice(-2);
    const value = factorAmount.slice(0, factorAmount.length - 2);
    return `${value}.${decimal}`;
  } else {
    return 'boleto sem valor determinado';
  }
}


module.exports = {
  getBarCodeTax,
  getExpirationTax,
  getAmountTax,
}