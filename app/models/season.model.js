const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Season extends Model {
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
