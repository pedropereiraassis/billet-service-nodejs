const validateBilletIsNumber = async(ctx, next) => {
  const regex = /^\d+$/;
  const paramIsValid = regex.test(ctx.params.billetCode);

  if(!paramIsValid) {
    ctx.throw(400, { 'message': 'Boleto inválido: linha digitada do boleto deve conter apenas números' });
  }

  return await next();
}

const validateBilletLength = async (ctx, next) => {
  
  if(ctx.params.billetCode.length < 47 || ctx.params.billetCode.length > 48) {
    ctx.throw(400, { 'message': 'Boleto inválido: linha digitada não possui a quantidade correta de caracteres.' });
  }

  return await next();
}

module.exports = {
  validateBilletIsNumber,
  validateBilletLength
}