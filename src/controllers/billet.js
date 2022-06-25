const billetService = require('../services/billet');

const getBilletData = async (ctx) => {
  const billetCode = ctx.params.billetCode;
  if (billetCode.length == 47) {
    ctx.body = await billetService.getBilletBank(billetCode);
  } else if (billetCode.length == 48) {
    ctx.body = await billetService.getBilletDealership(billetCode);
  } else {
    ctx.body = { message: 'invalid billet code'}
  }
};

module.exports = {
  getBilletData
};