module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('plant', {
      plant_id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      phone_number_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'phone_number',
          key: 'phone_number_id',
        },
      },
      type: {
        type: DataTypes.STRING,
      },
      land: {
        type: DataTypes.STRING,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        ),
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('plant');
  },
};
