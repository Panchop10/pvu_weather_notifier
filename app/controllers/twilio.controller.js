const models = require('../models');
const response = require('../functions/serviceUtil.js');
//const auth = require('../middlewares/auth.js');

module.exports = {
  name: 'twilio',

  receiveMessage: async (req, res, next) => {
    console.log(req)
    res.status(200).send(response.getResponseCustom(200, {}));
  },
};
