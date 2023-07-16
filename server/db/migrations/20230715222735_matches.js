exports.up = async function (knex) {
  await knex.schema.createTable('matches', (table) => {
    table.increments('id').primary()
    table.integer('dog_id')
    table.string('user_id').references('users.auth0_id')
    table.integer('matched_dog_id').references('dogs.id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('matches')
}
