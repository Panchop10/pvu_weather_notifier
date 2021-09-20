const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Season extends Model {
    static associate(models) {
      models.season.hasMany(models.weather_event_plant, {
        foreignKey: 'season_id',
        targetKey: 'season_id',
      });
    }
  }
  Season.init(
    {
      season_id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'season',
    },
  );
  return Season;
};
