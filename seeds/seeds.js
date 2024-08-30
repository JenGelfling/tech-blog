
const userdata = [
    { username: 'Johnson', email: 'jjohnson@gmail.com', password: 'jjohnson', like_id: 1 },
    { username: 'Smith', email: 'msmith@gmail.com', password: 'msmith', like_id: 2 },
    { username: 'Henderson', email: 'ahenderson@gmail.com', password: 'ahenderson', like_id: 3 },
    { username: 'Courson', email: 'rcourson@gmail.com', password: 'rcourson', like_id: 4 },
    { username: 'Abhorsen', email: 'abhorsen@gmail.com', password: 'abhorsen', like_id: 5 }
  ]

const reviewdata = [
  {
    "title": "Inception",
    "author_id": 1,
    "content": "this was great!",
    "like_id": 1,
    "is_public": "true",
    "score": 9
},
{
  "title": "Ip Man",
  "author_id": 2,
  "content": "An account of Bruce Lee's main instructor. Ip Man has great martial arts action and a historically accurate representation of the time.",
  "like_id": 2,
  "is_public": "true",
  "score": 8.5
},
{
  "title": "Iron Man",
  "author_id": 3,
  "content": "Great MCU movie!",
  "like_id": 3,
  "is_public": "true",
  "score": 8
},
{
  "title": "Terminator",
  "author_id": 4,
  "content": "When robots become sentient, can humanity survive?",
  "like_id": 4,
  "is_public": "true",
  "score": 8
},
{
  "title": "Lord of the Rings: Fellowship of the Ring",
  "author_id": 5,
  "content": "Frodo and Gandalf smoke a lot of leaf and go on an adventure. Amazing visuals.",
  "like_id": 5,
  "is_public": "true",
  "score": 10
}
]

const likedata = [
  { likes: 1 },
  { likes: 4 },
  { likes: 3 },
  { likes: 2 },
  { likes: 8 }
]


// const moviedata = [
//     { title: 'Furiosa: A Mad Max Saga', year: '2024', director: 'George Miller', rated: 'R', released: '24 May 2024', runtime: '148 min', genre: 'Action, Adventure, Sci-Fi', actors: 'Anya Taylor-Joy, Chris Hemsworth, Tom Burke', plot: 'The origin story of renegade warrior Furiosa before her encounter and teamup with Mad Max.', language: 'English', poster: 'https://m.media-amazon.com/images/M/MV5BNDRkNGNjNzMtYzE3MS00OWQyLTkzZGUtNWIyMmYwMjY3YzYxXkEyXkFqcGc@._V1_SX300.jpg', imdbRating: '7.7', boxoffice: '$67,260,980'  }
//   ]
  
  module.exports = { userdata, likedata, reviewdata }