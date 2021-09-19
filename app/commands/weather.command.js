const models = require('../models');
const stringFormat = require('../functions/stringFormat.js');
const response = require('../functions/serviceUtil.js');

const moment = require('moment');

module.exports = {
    name: 'weather',

    register: async (req, res) => {
        // check if user is admin
        if(!req.body.admin) throw Error("You do not have permissions to use this command.")

        const new_weather = stringFormat.titleCase(req.body.Body.replace('/weather', '').trim())

        const last_weather = await models.weather_day.findOne({
            order: [ [ 'date', 'DESC' ]],
        });

        // if last weather if today, throw error
        const weather_today = await models.weather_day.findOne({
            order: [ [ 'date', 'DESC' ]],
        });

        if (moment(weather_today.date).tz('UTC').isSame(moment().tz('UTC'), "day")){
            throw Error("There is already a weather registered for today: "+weather_today.weather)
        }

        let new_season = last_weather.season;

        // if sunday change season
        if (moment().tz('UTC').weekday() === 0){
            const old_season = await models.season.findOne({
            where: {
                name: last_weather.season
            },
            });

            const new_season_id = old_season.season_id === 4 ? 1 : old_season.season_id + 1
            
            new_season = (await models.season.findByPk(new_season_id)).name;
        }

        // check if weather exists for that season
        const validate_weather = await models.weather_event.findOne({
            where: {
            name: new_weather,
            season: new_season
            }
        })

        if (!validate_weather) throw Error("Invalid weather for the current season ("+new_season+"): "+new_weather)

        await models.weather_day.create({
            weather: new_weather,
            season: new_season,
            date: moment().tz("UTC")
        })

        // send sucess message
        response.sendTwilioMessage("Weather registered successfully", res)
    }
}