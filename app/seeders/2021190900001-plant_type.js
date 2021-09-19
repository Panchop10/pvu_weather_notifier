module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'plant_type',
      [
        {
          plant_type_id: 1,
          name: 'Metal',
        },
        {
          plant_type_id: 2,
          name: 'Dark',
        },
        {
          plant_type_id: 3,
          name: 'Light',
        },
        {
          plant_type_id: 4,
          name: 'Water',
        },
        {
          plant_type_id: 5,
          name: 'Ice',
        },
        {
          plant_type_id: 6,
          name: 'Wind',
        },
        {
          plant_type_id: 7,
          name: 'Electro',
        },
        {
          plant_type_id: 8,
          name: 'Fire',
        },
        {
          plant_type_id: 9,
          name: 'Parasite',
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('plant_type', null, {});
  },
};
