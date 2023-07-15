exports.seed = async function (knex) {
  await knex('dogs').del()
  await knex('users').del()

  // await knex('massages').del()
}
