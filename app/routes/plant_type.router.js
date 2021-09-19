const express = require('express');

const router = express.Router();
const controllers = require('../controllers/index');
//const { authMiddleware } = require('../middlewares/auth.js');

router.get('/', [], controllers.plantType.index);
//router.put('/profile', [ authMiddleware ], controllers.usersController.updateProfile);

module.exports = {
  basePath: '/v1/plant_type',
  router,
};
