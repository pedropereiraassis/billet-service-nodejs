const Router = require('koa-router');
const compose = require('koa-compose');
const errorHandler = require('./middlewares/errorHandler');
const billetController = require('./controllers/billet');
const billetValidator = require('./validators/billetGeneral');

module.exports = ((opts = {}) => {
  const router = new Router();

  router
    .get('/boleto/:billetCode', compose([errorHandler, billetValidator.validateBilletIsNumber, billetValidator.validateBilletLength]), billetController.getBilletData);

  return router;
})();