exports.seed = async function (knex) {
  await knex('users').del()
  // await knex('dogs').del()
  // await knex('massages').del()
}
