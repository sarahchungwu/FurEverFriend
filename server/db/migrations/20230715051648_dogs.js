exports.up = async function (knex) {
  await knex.schema.createTable('dogs', (table) => {
    table.increments('id').primary()
    table.string('user_id').references('users.auth0_id')
    table.string('name')
    table.string('img')
    table.string('breed')
    table.string('gender')
    table.integer('age')
    table.string('personality')
    table.string('description')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('dogs')
}
