const models = require('../models');
const response = require('../functions/serviceUtil.js');
//const auth = require('../middlewares/auth.js');

module.exports = {
  name: 'twilio',

  receiveMessage: async (req, res, next) => {
    console.log(req)

    // Content Type
    res.setHeader("Content-Type", "text/plain");
    res.status(200).send("sucess");
  },
};
