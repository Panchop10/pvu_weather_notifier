const models = require('../models');
const response = require('../functions/serviceUtil.js');
//const auth = require('../middlewares/auth.js');

module.exports = {
  name: 'plantType',

  index: async (req, res, next) => {
    models.plant_type.findAll({
      include: 'events',
    })
      .then((data) => {
        res.status(200).send(response.getResponseCustom(200, data));
        res.end();
      })
      .catch((err) => {
        next(err);
      });
  },
};
