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

/* como entendi que não há um padrão definitivo para a data de vencimento dos boletos
de arrecadação fiz essa validação por ter encontrado vencimento em dois campos */
const getExpirationTax = async (barCode) => {
  const dateToFormatOpt1 = `${barCode.slice(23, 25)}/${barCode.slice(25, 27)}/${barCode.slice(19, 23)}`
  const expirationDateOpt1 = new Date(dateToFormatOpt1);

  const dateToFormatOpt2 = `${barCode.slice(31, 33)}/${barCode.slice(33, 35)}/${barCode.slice(27, 31)}`
  const expirationDateOpt2 = new Date(dateToFormatOpt2);

  if (expirationDateOpt1.getTime() && expirationDateOpt1.getFullYear() > 1900 && expirationDateOpt1.getFullYear() < 2030) {
    return expirationDateOpt1.toISOString().slice(0, 10);
  } else if (expirationDateOpt2.getTime() && expirationDateOpt2.getFullYear() > 1900 && expirationDateOpt2.getFullYear() < 2030) {
    return expirationDateOpt2.toISOString().slice(0, 10);
  } else {
    return 'boleto sem vencimento determinado na linha digitável';
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