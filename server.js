require('dotenv').config(); // Required for environment variables

const https = require('https');
const fs = require('fs');
const helmet = require('helmet');

const express = require('express');
const compression = require('compression');
const moment = require('moment-timezone');

const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());
app.use(helmet()); // Add Helmet as a middleware

// Add headers
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Content Type
  res.setHeader("Content-Type", "text/plain");

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With,content-type,authorization',
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// Add Routes and tasks
const routes = require('./app/routes/index');

routes.map((x) => app.use(x.basePath, x.router));

app.use(express.static('public'));

// Create Server PROD
if (process.env.NODE_ENV === 'production') {
  const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/nedtc.pro/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/nedtc.pro/fullchain.pem'),

    dhparam: fs.readFileSync('/etc/letsencrypt/live/nedtc.pro/dhparams.pem'),
  };

  const server = https.createServer(options, app).listen(process.env.PORT || 3333, () => {
    const host = server.address().address;
    const { port } = server.address();

    // eslint-disable-next-line no-console
    console.log(`App listening at ${host}:${port}`);
  });
} else {
  // Create a Server DEV
  const server = app.listen(process.env.PORT || 3333, () => {
    const host = server.address().address;
    const { port } = server.address();

    // eslint-disable-next-line no-console
    console.log(`App listening at ${host}:${port}`);
  });
}