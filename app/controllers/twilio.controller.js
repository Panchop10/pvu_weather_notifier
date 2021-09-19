const models = require('../models');
const response = require('../functions/serviceUtil.js');
const twilio = require('twilio');
//const auth = require('../middlewares/auth.js');

module.exports = {
  name: 'twilio',

  receiveMessage: async (req, res, next) => {
    console.log(req)

    // Twilio Messaging URL - receives incoming messages from Twilio
    const response = new twilio.twiml.MessagingResponse();

    response.message(`Your text to me was ${req.body.Body}.
                    Webhooks are neat :)`);

    res.set('Content-Type', 'text/xml');
    res.send(response.toString());
  },
};
