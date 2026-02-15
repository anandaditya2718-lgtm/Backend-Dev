// Validation Middleware for Authors

const validateAuthorCreation = (req, res, next) => {
  const { name, birthYear, nationality, genre, booksCount } = req.body;

  const errors = [];

  // Validate name
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push({
      field: 'name',
      message: 'Name must be a string with at least 2 characters',
      type: 'string'
    });
  }

  if (name && name.trim().length > 100) {
    errors.push({
      field: 'name',
      message: 'Name must not exceed 100 characters',
      type: 'string'
    });
  }

  // Validate birthYear
  if (!birthYear || isNaN(birthYear)) {
    errors.push({
      field: 'birthYear',
      message: 'Birth year must be a valid number',
      type: 'number'
    });
  } else if (birthYear < 1000 || birthYear > new Date().getFullYear()) {
    errors.push({
      field: 'birthYear',
      message: `Birth year must be between 1000 and ${new Date().getFullYear()}`,
      type: 'number'
    });
  }

  // Validate nationality
  if (!nationality || typeof nationality !== 'string' || nationality.trim().length < 2) {
    errors.push({
      field: 'nationality',
      message: 'Nationality must be a string with at least 2 characters',
      type: 'string'
    });
  }

  if (nationality && nationality.trim().length > 50) {
    errors.push({
      field: 'nationality',
      message: 'Nationality must not exceed 50 characters',
      type: 'string'
    });
  }

  // Validate genre
  if (!genre || typeof genre !== 'string' || genre.trim().length < 2) {
    errors.push({
      field: 'genre',
      message: 'Genre must be a string with at least 2 characters',
      type: 'string'
    });
  }

  if (genre && genre.trim().length > 50) {
    errors.push({
      field: 'genre',
      message: 'Genre must not exceed 50 characters',
      type: 'string'
    });
  }

  // Validate booksCount
  if (!booksCount || isNaN(booksCount) || booksCount < 0) {
    errors.push({
      field: 'booksCount',
      message: 'Books count must be a non-negative number',
      type: 'number'
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation Failed',
      message: 'Author data validation failed',
      errors: errors,
      requiredFields: ['name', 'birthYear', 'nationality', 'genre', 'booksCount']
    });
  }

  req.validatedAuthor = {
    name: name.trim(),
    birthYear: parseInt(birthYear),
    nationality: nationality.trim(),
    genre: genre.trim(),
    booksCount: parseInt(booksCount)
  };

  next();
};

const validateAuthorUpdate = (req, res, next) => {
  const { name, birthYear, nationality, genre, booksCount } = req.body;

  const errors = [];

  // Validate name if provided
  if (name !== undefined) {
    if (typeof name !== 'string' || name.trim().length < 2) {
      errors.push({
        field: 'name',
        message: 'Name must be a string with at least 2 characters'
      });
    }
    if (name.trim().length > 100) {
      errors.push({
        field: 'name',
        message: 'Name must not exceed 100 characters'
      });
    }
  }

  // Validate birthYear if provided
  if (birthYear !== undefined) {
    if (isNaN(birthYear) || birthYear < 1000 || birthYear > new Date().getFullYear()) {
      errors.push({
        field: 'birthYear',
        message: `Birth year must be between 1000 and ${new Date().getFullYear()}`
      });
    }
  }

  // Validate nationality if provided
  if (nationality !== undefined) {
    if (typeof nationality !== 'string' || nationality.trim().length < 2) {
      errors.push({
        field: 'nationality',
        message: 'Nationality must be a string with at least 2 characters'
      });
    }
    if (nationality.trim().length > 50) {
      errors.push({
        field: 'nationality',
        message: 'Nationality must not exceed 50 characters'
      });
    }
  }

  // Validate genre if provided
  if (genre !== undefined) {
    if (typeof genre !== 'string' || genre.trim().length < 2) {
      errors.push({
        field: 'genre',
        message: 'Genre must be a string with at least 2 characters'
      });
    }
    if (genre.trim().length > 50) {
      errors.push({
        field: 'genre',
        message: 'Genre must not exceed 50 characters'
      });
    }
  }

  // Validate booksCount if provided
  if (booksCount !== undefined) {
    if (isNaN(booksCount) || booksCount < 0) {
      errors.push({
        field: 'booksCount',
        message: 'Books count must be a non-negative number'
      });
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation Failed',
      message: 'Author data validation failed',
      errors: errors
    });
  }

  req.validatedAuthor = {};
  if (name !== undefined) req.validatedAuthor.name = name.trim();
  if (birthYear !== undefined) req.validatedAuthor.birthYear = parseInt(birthYear);
  if (nationality !== undefined) req.validatedAuthor.nationality = nationality.trim();
  if (genre !== undefined) req.validatedAuthor.genre = genre.trim();
  if (booksCount !== undefined) req.validatedAuthor.booksCount = parseInt(booksCount);

  next();
};

module.exports = { validateAuthorCreation, validateAuthorUpdate };
