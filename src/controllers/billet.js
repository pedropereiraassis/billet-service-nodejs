const billetDealershipService = require('../services/billetDealership');
const billetBankService = require('../services/billetBank');

const getBilletData = async (ctx) => {
  const billetCode = ctx.params.billetCode;

  if (billetCode.length == 47) {
    const barCode = await billetBankService.getBarCodeBank(billetCode);
    const expirationDate = await billetBankService.getExpirationDateBank(barCode);
    const amount = await billetBankService.getAmountBank(barCode);
    ctx.body = { barCode: barCode, amount: amount, expirationDate: expirationDate }
  } else if (billetCode.length == 48) {
    const barCode = await billetDealershipService.getBarCodeDealership(billetCode);
    const amount = await billetDealershipService.getAmountDealership(barCode);
    const expirationDate = await billetDealershipService.getExpirationDateDealership(barCode);
    ctx.body = { barCode: barCode, amount: amount, expirationDate: expirationDate }
  } else {
    ctx.body = { message: 'Boleto inválido.'}
  }
};

module.exports = {
  getBilletData
};