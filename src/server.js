const app = require('./app');
const logger = require('./utils/logger');

app.listen(8080, () => {
  logger.info('Server running on port 8080')
});