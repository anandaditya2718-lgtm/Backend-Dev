const AuthorModel = require('../model/authorsData');

// CREATE - Add new author
const createAuthor = (req, res) => {
  try {
    const newAuthor = AuthorModel.create(req.validatedAuthor);
    res.status(201).json({
      success: true,
      message: 'Author created successfully',
      data: newAuthor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating author',
      error: error.message
    });
  }
};

// READ - Get all authors
const getAllAuthors = (req, res) => {
  try {
    const authors = AuthorModel.getAll();
    res.json({
      success: true,
      count: authors.length,
      data: authors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching authors',
      error: error.message
    });
  }
};

// READ - Get single author by ID
const getAuthorById = (req, res) => {
  try {
    const author = AuthorModel.getById(parseInt(req.params.id));
    
    if (!author) {
      return res.status(404).json({
        success: false,
        message: 'Author not found',
        authorId: req.params.id
      });
    }

    res.json({
      success: true,
      data: author
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching author',
      error: error.message
    });
  }
};

// UPDATE - Update author (full or partial)
const updateAuthor = (req, res) => {
  try {
    const author = AuthorModel.getById(parseInt(req.params.id));
    
    if (!author) {
      return res.status(404).json({
        success: false,
        message: 'Author not found',
        authorId: req.params.id
      });
    }

    const updatedAuthor = AuthorModel.update(parseInt(req.params.id), req.validatedAuthor);
    
    res.json({
      success: true,
      message: 'Author updated successfully',
      data: updatedAuthor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating author',
      error: error.message
    });
  }
};

// DELETE - Delete author
const deleteAuthor = (req, res) => {
  try {
    const author = AuthorModel.getById(parseInt(req.params.id));
    
    if (!author) {
      return res.status(404).json({
        success: false,
        message: 'Author not found',
        authorId: req.params.id
      });
    }

    const deletedAuthor = AuthorModel.delete(parseInt(req.params.id));
    
    res.json({
      success: true,
      message: 'Author deleted successfully',
      data: deletedAuthor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting author',
      error: error.message
    });
  }
};

// Get CRUD info
const getCRUDInfo = (req, res) => {
  res.json({
    success: true,
    message: 'CRUD Operations Information',
    operations: {
      create: {
        method: 'POST',
        endpoint: '/api/authors',
        description: 'Create a new author',
        requiredFields: ['name', 'birthYear', 'nationality', 'genre', 'booksCount'],
        example: {
          name: 'Stephen King',
          birthYear: 1947,
          nationality: 'American',
          genre: 'Horror',
          booksCount: 60
        }
      },
      read: {
        method: 'GET',
        endpoints: {
          all: '/api/authors',
          single: '/api/authors/:id'
        },
        description: 'Get all authors or a specific author by ID'
      },
      update: {
        method: 'PUT',
        endpoint: '/api/authors/:id',
        description: 'Update author (all fields required)',
        requiredFields: ['name', 'birthYear', 'nationality', 'genre', 'booksCount']
      },
      updatePartial: {
        method: 'PATCH',
        endpoint: '/api/authors/:id',
        description: 'Partial update author (only provide fields to update)',
        optionalFields: ['name', 'birthYear', 'nationality', 'genre', 'booksCount']
      },
      delete: {
        method: 'DELETE',
        endpoint: '/api/authors/:id',
        description: 'Delete an author by ID'
      }
    }
  });
};

module.exports = {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
  getCRUDInfo
};
