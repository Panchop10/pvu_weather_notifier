module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'plant_type',
      [
        {
          plant_type_id: 1,
          name: 'METAL',
        },
        {
          plant_type_id: 2,
          name: 'DARK',
        },
        {
          plant_type_id: 3,
          name: 'LIGHT',
        },
        {
          plant_type_id: 4,
          name: 'WATER',
        },
        {
          plant_type_id: 5,
          name: 'ICE',
        },
        {
          plant_type_id: 6,
          name: 'WIND',
        },
        {
          plant_type_id: 7,
          name: 'ELECTRO',
        },
        {
          plant_type_id: 8,
          name: 'FIRE',
        },
        {
          plant_type_id: 9,
          name: 'PARASITE',
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('plant_type', null, {});
  },
};
