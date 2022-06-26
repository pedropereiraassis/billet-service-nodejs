const bankDigitValidator = require('../validators/billetBankDigit');
const dealershipDigitValidator = require('../validators/billetDealershipDigit');

const getBilletBank = async (billetCode) => {
  const barCode = (
    billetCode.substring(0, 4) +
    billetCode.substring(32, 47) +
    billetCode.substring(4, 9) +
    billetCode.substring(10, 20) +
    billetCode.substring(21, 31)
  );

  bankDigitValidator.validateGeneralDigit(barCode);
  bankDigitValidator.validateDigits(billetCode);

  return { barCode: barCode };
};

const getBilletDealership = async (billetCode) => {
  const barCode = (
    billetCode.substring(0, 11) +
    billetCode.substring(12, 23) + 
    billetCode.substring(24, 35) +
    billetCode.substring(36, 47)
  );

  dealershipDigitValidator.validateGeneralDigit(barCode);
  dealershipDigitValidator.validateDigits(billetCode);

  return { 'barCode': barCode };
};


module.exports = {
  getBilletBank,
  getBilletDealership,
};