let authorsData = [
  {
    id: 1,
    name: 'Harper Lee',
    birthYear: 1926,
    nationality: 'American',
    genre: 'Fiction',
    booksCount: 1
  },
  {
    id: 2,
    name: 'George Orwell',
    birthYear: 1903,
    nationality: 'British',
    genre: 'Dystopian',
    booksCount: 2
  },
  {
    id: 3,
    name: 'Jane Austen',
    birthYear: 1775,
    nationality: 'British',
    genre: 'Romance',
    booksCount: 6
  },
  {
    id: 4,
    name: 'F. Scott Fitzgerald',
    birthYear: 1896,
    nationality: 'American',
    genre: 'Fiction',
    booksCount: 1
  },
  {
    id: 5,
    name: 'J.K. Rowling',
    birthYear: 1965,
    nationality: 'British',
    genre: 'Fantasy',
    booksCount: 7
  }
];

let nextId = 6;

module.exports = {
  getAll: () => authorsData,
  getById: (id) => authorsData.find(a => a.id === id),
  create: (authorData) => {
    const newAuthor = {
      id: nextId++,
      ...authorData,
      createdAt: new Date().toISOString()
    };
    authorsData.push(newAuthor);
    return newAuthor;
  },
  update: (id, authorData) => {
    const index = authorsData.findIndex(a => a.id === id);
    if (index === -1) return null;
    authorsData[index] = { ...authorsData[index], ...authorData };
    return authorsData[index];
  },
  delete: (id) => {
    const index = authorsData.findIndex(a => a.id === id);
    if (index === -1) return null;
    const deletedAuthor = authorsData[index];
    authorsData.splice(index, 1);
    return deletedAuthor;
  }
};
