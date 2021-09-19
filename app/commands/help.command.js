const models = require('../models');
const stringFormat = require('../functions/stringFormat.js');
const response = require('../functions/serviceUtil.js');

const moment = require('moment');

module.exports = {
    name: 'help',

    show: async (req, res) => {

        // bring last two weathers
        const last_weathers = await models.weather_day.findAll({
            limit: 2,
            order: [ [ 'date', 'DESC' ]],
        });

        let message = "Hello "+req.body.ProfileName+"! \n"+
        "The last two weathers registered are: \n"+
        "- "+last_weathers[0].weather+" - "+last_weathers[0].season+" ("+moment(last_weathers[0].date).tz('UTC').format('DD-MM-YYYY')+")\n"+
        "- "+last_weathers[1].weather+" - "+last_weathers[1].season+" ("+moment(last_weathers[1].date).tz('UTC').format('DD-MM-YYYY')+")\n\n"+
        "Commands availabe:\n"+
        "List all commands: /help\n"+
        "Register new weather (requires admin permission): /weather NEWWEATHER\n"+
        "List all plants registered: /listplants\n"+
        "Register a new plant: /registerplant PLANT_ID PLANT_TYPE LAND_CUSTOM_NAME\n"+
        "Delete a plant: /deleteplant PLANT_ID\n"+
        "Display which plants require a greenhouse for next day: /prediction\n"
        

        // send sucess message
        response.sendTwilioMessage(message, res)

    }
}