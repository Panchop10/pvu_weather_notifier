const models = require('../models');

const twilio = require('twilio');
const moment = require('moment');

// check that the user requests just once per day to the API if is not an admin
// eslint-disable-next-line consistent-return
const authMiddleware = async (req, res, next) => {
  try {
    if (!req.body.WaId) throw Error('Bad request');

    // check phone number in the database
    const user = await models.phone_number.findOne({
      where: {
        phone: req.body.WaId
      },
    });

    // throw error if user doesn't exist
    if (!user) throw Error('User not registered');

    // thrown error if user already requested the api once and its not an admin
    if (user.last_request !== null){
      if (!moment(user.last_request).tz('UTC').isBefore(moment().tz('UTC'), 'day') && !user.admin){
        throw Error('You already requested the information for today, try again tomorrow');
      }
    }

    // continue if no error was found and save last request time for the user
    user.last_request = moment().tz('UTC')
    user.save()

    //save admin variable in req
    req.body.admin = user.admin
    req.body.phone_number_id = user.phone_number_id

    next();

  } catch (err) {
    // Send error message to Twilio
    const response = new twilio.twiml.MessagingResponse();

    response.message(err.message);
    res.set('Content-Type', 'text/xml');
    res.send(response.toString());
  }
};

module.exports = {
  authMiddleware,
};
