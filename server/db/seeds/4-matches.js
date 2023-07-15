exports.seed = async function (knex) {
  await knex('matches').insert([
    { id: 1, dog1_id: 1, dog2_id: 6 },
    { id: 2, dog1_id: 6, dog2_id: 1 },
  ])
}
