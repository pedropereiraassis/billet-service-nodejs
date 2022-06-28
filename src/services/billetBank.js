const bankDigitValidator = require('../validators/billetBankDigit');

const getBarCodeBank = async (billetCode) => {
  const barCode = (
    billetCode.substring(0, 4) +
    billetCode.substring(32, 47) +
    billetCode.substring(4, 9) +
    billetCode.substring(10, 20) +
    billetCode.substring(21, 31)
  );

  const generalDigitIsValid = bankDigitValidator.validateGeneralDigit(barCode);
  const digitsAreValids = bankDigitValidator.validateDigits(billetCode);

  if (!generalDigitIsValid) {
    throw new Error('Boleto inválido: dígito verificador geral inválido.');
  } else if (!digitsAreValids) {
    throw new Error('Boleto inválido: dígitos verificadores inválidos.');
  }
  return barCode
}

const getExpirationDateBank = async (barCode) => {
  const baseDate = new Date('10/07/1997');
  const oneDay = 86400000;
  const factorDate = barCode.substring(5, 9);
  const expirationDate = new Date(baseDate.getTime() + oneDay * factorDate).toISOString().slice(0, 10);
  return expirationDate;
}

const getAmountBank = async (barCode) => {
  let factorAmount = Number(barCode.substring(9, 19)).toString();
  if (factorAmount.length < 3 && factorAmount != 0) {
    factorAmount = factorAmount.padStart(3, '0');
  }
  if (barCode[3] != 9 || factorAmount == 0) {
    return 'boleto sem valor determinado';
  }
  const decimal = factorAmount.slice(-2);
  const value = factorAmount.slice(0, factorAmount.length - 2);
  return `${value}.${decimal}`;
}

module.exports = {
  getBarCodeBank,
  getExpirationDateBank,
  getAmountBank,
}