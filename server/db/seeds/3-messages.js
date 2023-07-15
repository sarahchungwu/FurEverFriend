exports.seed = async function (knex) {
  await knex('messages').insert([
    {
      id: 1,
      sender_id: 'google-oauth2|110655168501149628622',
      receiver_id: 'auth0|64b1d363e35e3a4604c4f5ab',
      text: 'Hello, how are you?',
      sent_at: new Date(),
      is_read: false,
    },
    {
      id: 2,
      sender_id: 'auth0|64b1d363e35e3a4604c4f5ab',
      receiver_id: 'google-oauth2|110655168501149628622',
      text: 'I am doing great, thanks! How about you?',
      sent_at: new Date(),
      is_read: false,
    },
    {
      id: 3,
      sender_id: 'google-oauth2|110655168501149628622',
      receiver_id: 'auth0|64b1d363e35e3a4604c4f5ab',
      text: 'Hey, are you available for a meeting tomorrow?',
      sent_at: new Date(),
      is_read: false,
    },
    {
      id: 4,
      sender_id: 'auth0|64b1d363e35e3a4604c4f5ab',
      receiver_id: 'google-oauth2|110655168501149628622',
      text: 'Yes, I am available. What time works for you?',
      sent_at: new Date(),
      is_read: false,
    },
  ])
}
