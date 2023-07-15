exports.up = async function (knex) {
  await knex.schema.createTable('users', (table) => {
    table.string('auth0_id').primary()
    table.string('username')
    table.string('email')
    table.string('pronouns')
    table.string('bio')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
