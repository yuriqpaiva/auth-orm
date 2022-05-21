const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes');
require('./auth/passports');
require('./auth/redis/blacklist/blacklist-config');
dotenv.config();

const app = express();
routes(app);

const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
