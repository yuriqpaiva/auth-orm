const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes');
require('./auth/passports');
require('./auth/redis/blocklistAccessToken');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../swagger.json');
dotenv.config();

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
routes(app);

const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
