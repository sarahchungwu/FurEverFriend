exports.up = async function (knex) {
  await knex.schema.createTable('messages', (table) => {
    table.increments('id').primary()
    table.string('sender_id').references('users.auth0_id')
    table.string('receiver_id').references('users.auth0_id')
    table.string('text')
    table.timestamp('sent_at')
    table.boolean('is_read')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('messages')
}
