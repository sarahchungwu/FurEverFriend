exports.seed = async function (knex) {
  await knex('matches').del()
  await knex('messages').del()
  await knex('dogs').del()
  await knex('users').del()
}
