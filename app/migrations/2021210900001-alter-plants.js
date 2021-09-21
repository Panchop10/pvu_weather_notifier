module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(
      `ALTER TABLE plant DROP PRIMARY KEY, ADD PRIMARY KEY(plant_id, phone_number_id)`,
    );
  },
  down: async (queryInterface) => {
    await queryInterface.sequelize.query(
      `ALTER TABLE plant DROP PRIMARY KEY, ADD PRIMARY KEY(plant_id)`,
    );
  },
};