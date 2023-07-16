exports.seed = async function (knex) {
  await knex('matches').insert([
    {
      id: 1,
      dog_id: 1,
      user_id: 'google-oauth2|110655168501149628622',
      matched_dog_id: 6,
    },
  ])
}
