const models = require('../models');
const express = require('express');

const router = express.Router();
const controllers = require('../controllers/index');
const { authMiddleware } = require('../middlewares/auth.js');

router.post('/', [ authMiddleware ], controllers.twilio.receiveMessage);

module.exports = {
  basePath: '/v1/twilio',
  router,
};
