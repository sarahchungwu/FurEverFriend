/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('users').insert([
    {
      auth0_id: 'google-oauth2|110655168',
      username: 'Sarah',
      email: 'sarahchungwu@gmail.com',
      pronouns: 'she/her',
      bio: 'Passionate about coding and gym.',
    },
    {
      auth0_id: 'auth0|64b1d1ed25e7dbc3e1bfa2cf',
      username: 'Mary',
      email: 'mary_zhong@example.com',
      pronouns: 'she/her',
      bio: 'Hi, I am Mary! I am a curious and creative girl who loves books, art, music, and exploring the outdoors.',
    },
    {
      auth0_id: 'auth0|64b1d2a1e35e3a4604c4f5a1',
      username: 'John',
      email: 'john_smith@example.com',
      pronouns: 'he/his',
      bio: 'Hey, I am John! I am creative artist with a love for painting, design, and music.',
    },
    {
      auth0_id: 'auth0|64b1d363e35e3a4604c4f5ab',
      username: 'Olivia',
      email: 'olivia_johnson@example.com',
      pronouns: 'she/her',
      bio: 'Hi, Iam Olivia! A girl who adores dogs and cherishes every moment with her furry companion.',
    },
    {
      auth0_id: 'auth0|64b1d3c6056d7f23348ffda8',
      username: 'Noah',
      email: 'noah_carter@example.com',
      pronouns: 'he/his',
      bio: 'Hi, Im Noah! An adventurous music lover, always seeking inspiration from the world',
    },
  ])
}
