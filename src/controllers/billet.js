const billetTaxService = require('../services/billetTax');
const billetBankService = require('../services/billetBank');

const getBilletData = async (ctx) => {
  const billetCode = ctx.params.billetCode;

  if (billetCode.length == 47) {
    const barCode = await billetBankService.getBarCodeBank(billetCode);
    const expirationDate = await billetBankService.getExpirationDateBank(barCode);
    const amount = await billetBankService.getAmountBank(barCode);

    ctx.body = { barCode: barCode, amount: amount, expirationDate: expirationDate }
  } else if (billetCode.length == 48) {
    const barCode = await billetTaxService.getBarCodeTax(billetCode);
    const amount = await billetTaxService.getAmountTax(barCode);
    const expirationDate = await billetTaxService.getExpirationTax(barCode);

    ctx.body = { barCode: barCode, amount: amount, expirationDate: expirationDate }
  } else {
    ctx.status = 400;
    ctx.body = { message: 'Boleto inválido.'}
  }
};

module.exports = {
  getBilletData,
};