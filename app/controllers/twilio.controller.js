const models = require('../models');
const response = require('../functions/serviceUtil.js');
const commands = require('../commands/index');

const moment = require('moment');

module.exports = {
  name: 'twilio',

  receiveMessage: async (req, res, next) => {
    try{
      // check /help command
      if (req.body.Body.startsWith("/help")){
        return await commands.help.show(req, res)
      }

      // check /weather command
      if (req.body.Body.startsWith("/weather")){
        return await commands.weather.register(req, res)
      }

      // check /listplants command
      if (req.body.Body.startsWith("/listplants")){
        return await commands.plants.index(req, res)
      }

      // check /registerplant command
      if (req.body.Body.startsWith("/registerplant")){
        return await commands.plants.register(req, res)
      }

      // check /deleteplant command
      if (req.body.Body.startsWith("/deleteplant")){
        return await commands.plants.destroy(req, res)
      }

      // check if the weather for today has been registered
      const weather_today = await models.weather_day.findAll({
        limit: 2,
        order: [ [ 'date', 'DESC' ]],
      });

      if (moment(weather_today[0].date).tz('UTC').isBefore(moment().tz('UTC'), 'day')){
        // delete last request date
        const user = await models.phone_number.findByPk(req.body.phone_number_id);
        user.last_request = null
        user.save()

        throw Error(
          'The weather for today has not been registed yet, please come back later. \n'+
          'If you are an admin please register the weather with command "/weather NEWWEATHER"'
          );
      }

      // check /prediction command
      if (req.body.Body.startsWith("/predict")){
        return await commands.predict.index(req, res)
      }

      const welcome_message = "Welcome to PVU weather prediction notifier. \n"+
      "Use /help to see the commands available";

      return response.sendTwilioMessage(welcome_message, res)

    }
    catch(err){
      // Send error message to Twilio
      return response.sendTwilioMessage(err.message, res)
    }
    
  },
};
