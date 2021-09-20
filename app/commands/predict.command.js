const models = require('../models');
const response = require('../functions/serviceUtil.js');
const { Op } = require("sequelize");

const moment = require('moment');

const predictGreenHouse = async (plant, weather_events, current_season) => {
     // create condition to exclude past weather events
    const past_events = []
    weather_events.forEach(weather_event => {
        past_events.push(weather_event.weather_event_id)
    });

    const positive_effects = await models.weather_event_plant.findAndCountAll({
        where: {
            weather_event_id: {
              [Op.notIn]: past_events,
            },
            effect: {
                [Op.gt]: 0
            },
            plant_type_id: plant.plant_type.plant_type_id,
            season_id: current_season.season_id
        },
    })

    const negative_effects = await models.weather_event_plant.findAndCountAll({
        where: {
            weather_event_id: {
              [Op.notIn]: past_events,
            },
            effect: {
                [Op.lt]: 0
            },
            plant_type_id: plant.plant_type.plant_type_id,
            season_id: current_season.season_id
        },
    })

    const neutral_effects = await models.weather_event_plant.findAndCountAll({
        where: {
            weather_event_id: {
              [Op.notIn]: past_events,
            },
            effect: 0,
            plant_type_id: plant.plant_type.plant_type_id,
            season_id: current_season.season_id
        },
    })

    // calculate if the greenhouse is necessary
    let use_greenhouse = false

    if(negative_effects.count >= positive_effects.count && negative_effects.count > 0){
        use_greenhouse = true
    }

    if(negative_effects.count*100/(positive_effects.count+negative_effects.count+neutral_effects.count)>20){
        use_greenhouse = true
    }
    
    return use_greenhouse
};

module.exports = {
    name: 'predict',

    index: async (req, res) => {
        // bring the last two weathers
        const last_weathers = await models.weather_day.findAll({
            limit: 2,
            order: [ [ 'date', 'DESC' ]],
        });

        const current_season = await models.season.findOne({
            where: {
                name: last_weathers[0].season
            }
        })

        // find weather events
        const weather_events = await models.weather_event.findAll({
            where: {
                name: {
                  [Op.in]: [last_weathers[0].weather, last_weathers[1].weather],
                },
                season: last_weathers[0].season
            },
        })

        // bring plants of the user
        const total_plants = await models.plant.findAll({
            include: [
                'plant_type',
            ],
            where: {
                phone_number_id: req.body.phone_number_id
            },
            order: [ [ 'land', 'ASC' ]],
        })

        // calculate probabilities and show results
        let msg_prediction = "Based on probabilities, it is recommended to put the following plants in a grenhouse:\n"
        let counter_greenhouse = 0

        await Promise.all(total_plants.map(async plant => {
            let prediction = await predictGreenHouse(plant, weather_events, current_season)
            if(prediction){
                counter_greenhouse += 1
                msg_prediction += "- "+plant.land+"\t"+plant.plant_id+"\t"+plant.plant_type.name+"\n"
            }
        }));

        if (counter_greenhouse === 0){
            msg_prediction = "Based on probabilities, there is no need to put any greenhouse on your plants"
        }

        // send sucess message
        response.sendTwilioMessage(msg_prediction, res)
    },
}