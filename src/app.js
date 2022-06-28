const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const cors = require('koa2-cors');
const router = require('./router');
const logger = require('./utils/logger');

const startServer = () => {
  const app = new Koa();

  const corsOptions = {
    origin: '*',
    allowedMethods: ['GET'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }

  app.use(cors(corsOptions));
  app.use(koaLogger());
  app.use(bodyParser());
  app.use(router.routes());

  return app.listen(8080, () => {
    logger.info('Server running on port 8080')
  });
}

module.exports = { 
  startServer,
}