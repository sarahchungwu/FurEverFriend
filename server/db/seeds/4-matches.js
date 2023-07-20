exports.seed = async function (knex) {
  await knex('matches').insert([
    {
      id: 1,
      dog_id: 1,
      user_id: 'auth0|64b1d363e35e3a4604c4f5ab',
      matched_dog_id: 6,
    },
  ])
}
