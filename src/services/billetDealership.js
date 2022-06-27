const dealershipDigitValidator = require('../validators/billetDealershipDigit');

const getBarCodeDealership = async (billetCode) => {
  const barCode = (
    billetCode.substring(0, 11) +
    billetCode.substring(12, 23) + 
    billetCode.substring(24, 35) +
    billetCode.substring(36, 47)
  );

  dealershipDigitValidator.validateGeneralDigit(barCode);
  dealershipDigitValidator.validateDigits(billetCode);

  return barCode;
};

const getExpirationDateDealership = async (barCode) => {
  const dateToFormat = `${barCode.slice(27, 29)}/${barCode.slice(29, 31)}/${barCode.slice(23, 27)}`
  const expirationDate = new Date(dateToFormat)
  if (expirationDate.getTime()) {
    return expirationDate
  } else {
    return 'boleto sem validade determinada'
  }
};

const getAmountDealership = async (barCode) => {
  const factorAmount = Number(barCode.substring(4, 15)).toString();
  if (barCode[2] == 6 || barCode[2] == 8) {
    const decimal = factorAmount.slice(-2);
    const value = factorAmount.slice(0, factorAmount.length - 2);
    return `${value}.${decimal}`
  } else {
    return 'boleto sem valor determinado'
  }
};


module.exports = {
  getBarCodeDealership,
  getAmountDealership,
  getExpirationDateDealership,
};