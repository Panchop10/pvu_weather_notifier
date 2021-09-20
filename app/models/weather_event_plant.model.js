const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class WeatherEventPlant extends Model {
    static associate(models) {
      models.weather_event_plant.belongsTo(models.weather_event, {
        foreignKey: 'weather_event_id',
        targetKey: 'weather_event_id',
      });
      models.weather_event_plant.belongsTo(models.plant_type, {
        foreignKey: 'plant_type_id',
        targetKey: 'plant_type_id',
      });
      models.weather_event_plant.belongsTo(models.season, {
        foreignKey: 'season_id',
        targetKey: 'season_id',
      });
    }
  }
  WeatherEventPlant.init(
    {
      weather_event_plant_id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      effect: {
        type: DataTypes.INTEGER,
      },
      weather_event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'weather_event',
          key: 'weather_event_id',
        },
      },
      plant_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'plant_type',
          key: 'plant_type_id',
        },
      },
      season_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'season',
          key: 'season_id',
        },
      },
    },
    {
      sequelize,
      modelName: 'weather_event_plant',
    },
  );
  return WeatherEventPlant;
};
