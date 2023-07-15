exports.seed = async function (knex) {
  await knex('messages').del()
  await knex('dogs').del()
  await knex('users').del()
}
