const blogs = [
  {
    title: '4d testing',
    author: 'Kimi Räikkönen',
    url: 'www.google.com',
    likes: 15,
    user: {
      username: 'Ismo',
      name: 'Ismo Laitela',
      id: '5d2f022d01105d4384d0d451'
    },
    id: '5d2f02a001105d4384d0d454'
  },
  {
    title: '5d testing, this is not rendered yet',
    author: 'Dan Abramov',
    url: 'www.google.com',
    likes: 2,
    user: {
      username: 'Ismo',
      name: 'Ismo Laitela',
      id: '5d2f022d01105d4384d0d451'
    },
    id: '5d2f24479bdbb92bc007f3cf'
  },
  {
    title: 'Testi',
    author: 'Pekka Pouta',
    url: 'http://localhost:3000/',
    likes: 2,
    user: {
      username: 'Arto',
      name: 'Arto Hellas',
      id: '5d2f026301105d4384d0d453'
    },
    id: '5d31a13eace6d34f3c40e173'
  }
]

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, setToken }