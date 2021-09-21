const models = require('../models');
const response = require('../functions/serviceUtil.js');

module.exports = {
    name: 'plants',

    register: async (req, res) => {
        // remove the command, create array with parameters and if they are valid
        let parameters = req.body.Body.replace('/registerplant', '').trim()
        parameters = parameters.split(' ')

        if (parameters.length !== 3){
            const err = "Invalid number of parameters, please check your command and try again."
            return response.sendTwilioMessage(err, res)
        }

        // check if id is a integer number
        if (!(parameters[0] >>> 0 === parseFloat(parameters[0]))){
            const err = "Invalid PLANT_ID, just numeric values are allowed"
            return response.sendTwilioMessage(err, res)
        }

        // check if plant id is already registered
        const valid_plant = await models.plant.findOne({
            where: {
                plant_id: parameters[0],
                phone_number_id: req.body.phone_number_id,
            }
        })

        if (valid_plant){
            const err = "PLANT_ID already registered. Please check your command and try again."
            return response.sendTwilioMessage(err, res)
        }

        // check if user has more than 6 plants when is not admin
        const total_plants = await models.plant.findAndCountAll({
            where: {
                phone_number_id: req.body.phone_number_id
            }
        })

        if (!req.body.admin && total_plants.count > 5){
            const err = "Maximum number of plants registered."
            return response.sendTwilioMessage(err, res)
        }


        // check if plant type is valid
        const valid_weather = await models.plant_type.findOne({
            where: {
                name: parameters[1]
            }
        })

        if (!valid_weather){
            const err = "Invalid PLANT_ELEMENT. Please check your command and try again."
            return response.sendTwilioMessage(err, res)
        }
        
        // register new plant
        await models.plant.create({
            plant_id: parameters[0],
            phone_number_id: req.body.phone_number_id,
            plant_type_id: valid_weather.plant_type_id,
            land: parameters[2]
        })

        // send sucess message
        response.sendTwilioMessage("Plant registered successfully", res)
    },

    index: async (req, res) => {
        const total_plants = await models.plant.findAndCountAll({
            include: [
                'plant_type',
            ],
            where: {
                phone_number_id: req.body.phone_number_id
            },
            order: [ [ 'land', 'ASC' ]],
        })
        
        let plant_list = "Total plants registered ("+total_plants.count+"):\n"

        total_plants.rows.forEach(plant => {
            plant_list += "- "+plant.land+"\t"+plant.plant_id+"\t"+plant.plant_type.name+"\n"
        });

        // send sucess message
        response.sendTwilioMessage(plant_list, res)
    },

    destroy: async (req, res) => {
        const plant_id = req.body.Body.replace('/deleteplant', '').trim()

        // check if id is a integer number
        if (!(plant_id >>> 0 === parseFloat(plant_id))){
            const err = "Invalid PLANT_ID, just numeric values are allowed"
            return response.sendTwilioMessage(err, res)
        }

        // check if plant id is already registered for that user
        const valid_plant = await models.plant.findOne({
            where: {
                plant_id: plant_id,
                phone_number_id: req.body.phone_number_id,
            }
        })

        if (!valid_plant){
            const err = "PLANT_ID not found. Please check the PLANT_ID and try again."
            return response.sendTwilioMessage(err, res)
        }

        await models.plant.destroy({
            where: {
                plant_id: plant_id,
                phone_number_id: req.body.phone_number_id,
            },
          });

        // send sucess message
        response.sendTwilioMessage("Plant "+ plant_id +" successfully removed", res)
    },
}