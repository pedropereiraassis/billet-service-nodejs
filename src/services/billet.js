const billetBankDigitValidator = require('../validators/billetBankDigit');

const getBilletBank = async (billetCode) => {
  const barCode = (
    billetCode.substring(0, 4) +
    billetCode.substring(32, 47) +
    billetCode.substring(4, 9) +
    billetCode.substring(10, 20) +
    billetCode.substring(21, 31)
  );

  billetBankDigitValidator.validateGeneralDigit(barCode);
  billetBankDigitValidator.validateDigits(billetCode);

  return { barCode: barCode };
};

const getBilletDealership = async (billetCode) => {
  const barCode = (
    billetCode.substring(0, 4) +
    billetCode.substring(32, 47) +
    billetCode.substring(4, 9) +
    billetCode.substring(10, 20) +
    billetCode.substring(21, 31)
  );

  return { 'barCode': barCode };
};


module.exports = {
  getBilletBank,
  getBilletDealership,
};