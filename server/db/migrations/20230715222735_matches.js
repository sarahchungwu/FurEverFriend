exports.up = async function (knex) {
  await knex.schema.createTable('matches', (table) => {
    table.increments('id').primary()
    table.integer('dog1_id').references('dogs.id')
    table.integer('dog2_id').references('dogs.id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('matches')
}
