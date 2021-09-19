const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class WeatherDay extends Model {
    static associate(models) {
      // Add relationships here
    }
  }
  WeatherDay.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      weather: {
        type: DataTypes.STRING,
      },
      season: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'weatherday',
    },
  );
  return WeatherDay;
};
