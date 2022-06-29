const billetTaxService = require('../services/billetTax');
const billetBankService = require('../services/billetBank');

const getBilletData = async (ctx) => {
  const { billetCode } = ctx.params;

  if (billetCode.length == 47) {
    const barCode = await billetBankService.getBarCodeBank(billetCode);
    const expirationDate = await billetBankService.getExpirationDateBank(barCode);
    const amount = await billetBankService.getAmountBank(barCode);

    ctx.status = 200;
    ctx.body = { barCode: barCode, amount: amount, expirationDate: expirationDate }
    return ctx;
  } else if (billetCode.length == 48) {
    const barCode = await billetTaxService.getBarCodeTax(billetCode);
    const amount = await billetTaxService.getAmountTax(barCode);
    const expirationDate = await billetTaxService.getExpirationTax(barCode);

    ctx.status = 200;
    ctx.body = { barCode: barCode, amount: amount, expirationDate: expirationDate }
    return ctx;
  }
};

module.exports = {
  getBilletData,
};