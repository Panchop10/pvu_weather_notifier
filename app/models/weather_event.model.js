const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class WeatherEvent extends Model {
    static associate(models) {
      models.weather_event.belongsToMany(models.plant_type, {
        as: 'plants',
        through: models.weather_event_plant,
        foreignKey: 'weather_event_id',
      });
    }
  }
  WeatherEvent.init(
    {
      weather_event_id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      season: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'weather_event',
    },
  );
  return WeatherEvent;
};
