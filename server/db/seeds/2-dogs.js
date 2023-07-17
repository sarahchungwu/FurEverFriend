exports.seed = async function (knex) {
  await knex('dogs').insert([
    {
      id: 1,
      user_id: 'google-oauth2|110655168501149628622',
      name: 'Bubble',
      img: 'https://cdn.pixabay.com/photo/2016/07/07/15/35/puppy-1502565_640.jpg',
      breed: 'Pug',
      gender: 'female',
      age: 3,
      personality: 'friendly',
      description:
        'Bubble is a friendly pug who enjoys snuggling up with her favorite humans and going for leisurely walks.',
    },
    {
      id: 2,
      user_id: 'google-oauth2|110655168501149628622',
      name: 'Buddy',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Labrador_on_Quantock_%282175262184%29.jpg/800px-Labrador_on_Quantock_%282175262184%29.jpg',
      breed: 'Labrador Retriever',
      gender: 'male',
      age: 2,
      personality: 'playful',
      description:
        'Buddy is a playful and friendly Labrador Retriever who loves to fetch and make new friends at the park.',
    },
    {
      id: 3,
      user_id: 'auth0|64b1d1ed25e7dbc3e1bfa2cf',
      name: 'Charlie',
      img: 'https://ocdn.eu/images/pulscms/OWM7MDA_/fb1a540060e575ceba4012396662ccaf.jpg',
      breed: 'Golden Retriever',
      gender: 'male',
      age: 2,
      personality: 'friendly',
      description:
        'Charlie is a friendly Golden Retriever who enjoys long walks and spending quality time with family.',
    },
    {
      id: 4,
      user_id: 'auth0|64b1d2a1e35e3a4604c4f5a1',
      name: 'Max',
      img: 'https://www.akc.org/wp-content/uploads/2022/10/Ger…g-up-on-a-tree-trunk-exploring-a-park-500x486.jpg',
      breed: 'German Shepherd',
      gender: 'male',
      age: 3,
      personality: 'intelligent',
      description:
        'Max is an intelligent German Shepherd who loves to learn new tricks and engage in stimulating activities.',
    },
    {
      id: 5,
      user_id: 'auth0|64b1d2a1e35e3a4604c4f5a1',
      name: 'Luna',
      img: 'https://media1.popsugar-assets.com/files/thumbor/-…39c4.60280062_/i/cute-pictures-border-collies.jpg',
      breed: 'Border Collie',
      gender: 'female',
      age: 3,
      personality: 'playful',
      description:
        'Luna is playful Border Collie who excels in agility training and loves interactive gameses.',
    },
    {
      id: 6,
      user_id: 'auth0|64b1d363e35e3a4604c4f5ab',
      name: 'Bailey',
      img: 'https://highlandcanine.com/wp-content/uploads/2021/04/pug-running-in-the-grass.jpg',
      breed: 'pug',
      gender: 'male',
      age: 1,
      personality: 'playful',
      description:
        'Bailey is a playful  Pug with an adorable wrinkled face. They bring joy and love to everyone they meet, making them the perfect companion for fun and cuddles.',
    },
    {
      id: 7,
      user_id: 'auth0|64b1d3c6056d7f23348ffda8',
      name: 'Cooper',
      img: 'https://media1.popsugar-assets.com/files/thumbor/-…39c4.60280062_/i/cute-pictures-border-collies.jpg',
      breed: 'pug',
      gender: 'male',
      age: 2,
      personality: 'intelligent',
      description:
        'Cooper is an intelligent Golden Retriever with a love for learning. He excel in training activities, quickly mastering new tricks with his sharp mind and problem-solving skills.',
    },
  ])
}
