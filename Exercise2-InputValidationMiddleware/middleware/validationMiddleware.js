// Input Validation Middleware
// Validates query parameters for year: checks if valid number and within reasonable range

const validateYearQuery = (req, res, next) => {
  const { year } = req.query;

  // If year is not provided, continue (it's optional)
  if (!year) {
    return next();
  }

  // Check if year is a valid number
  if (isNaN(year) || year.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'Invalid Input',
      message: 'Year must be a valid number',
      receivedValue: year,
      example: '/api/books?year=1949'
    });
  }

  // Convert to integer
  const yearNum = parseInt(year);

  // Check if year is within reasonable range (1000-2100)
  const MIN_YEAR = 1000;
  const MAX_YEAR = 2100;

  if (yearNum < MIN_YEAR || yearNum > MAX_YEAR) {
    return res.status(400).json({
      success: false,
      error: 'Invalid Year Range',
      message: `Year must be between ${MIN_YEAR} and ${MAX_YEAR}`,
      receivedValue: yearNum,
      validRange: `${MIN_YEAR}-${MAX_YEAR}`
    });
  }

  // If validation passes, attach to req for use in controller
  req.validatedYear = yearNum;
  next();
};

const validateAuthorQuery = (req, res, next) => {
  const { author } = req.query;

  // If author is not provided, continue (it's optional)
  if (!author) {
    return next();
  }

  // Check if author is a non-empty string
  if (typeof author !== 'string' || author.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'Invalid Input',
      message: 'Author must be a non-empty string',
      receivedValue: author
    });
  }

  // Check author length (min 2 chars, max 100 chars)
  if (author.trim().length < 2 || author.trim().length > 100) {
    return res.status(400).json({
      success: false,
      error: 'Invalid Author Length',
      message: 'Author name must be between 2 and 100 characters',
      receivedLength: author.trim().length,
      validRange: '2-100 characters'
    });
  }

  // If validation passes, attach to req
  req.validatedAuthor = author.trim();
  next();
};

const validateBothQueryParams = (req, res, next) => {
  const { year, author } = req.query;

  const errors = [];

  // Validate year if provided
  if (year) {
    if (isNaN(year) || year.trim() === '') {
      errors.push({
        field: 'year',
        message: 'Year must be a valid number',
        receivedValue: year
      });
    } else {
      const yearNum = parseInt(year);
      if (yearNum < 1000 || yearNum > 2100) {
        errors.push({
          field: 'year',
          message: 'Year must be between 1000 and 2100',
          receivedValue: yearNum
        });
      }
    }
  }

  // Validate author if provided
  if (author) {
    if (typeof author !== 'string' || author.trim() === '') {
      errors.push({
        field: 'author',
        message: 'Author must be a non-empty string',
        receivedValue: author
      });
    } else if (author.trim().length < 2 || author.trim().length > 100) {
      errors.push({
        field: 'author',
        message: 'Author name must be between 2 and 100 characters',
        receivedLength: author.trim().length
      });
    }
  }

  // If there are validation errors, return them
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation Failed',
      message: 'One or more query parameters are invalid',
      errors: errors,
      validationRules: {
        year: 'Must be a number between 1000-2100 (optional)',
        author: 'Must be a string between 2-100 characters (optional)'
      }
    });
  }

  // If all validations pass, attach validated values to req
  if (year) req.validatedYear = parseInt(year);
  if (author) req.validatedAuthor = author.trim();

  next();
};

module.exports = {
  validateYearQuery,
  validateAuthorQuery,
  validateBothQueryParams
};
