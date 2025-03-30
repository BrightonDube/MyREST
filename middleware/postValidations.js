import { body, validationResult } from 'express-validator';

// Validation middleware for creating a new post (POST route)
export const validateCreatePost = [
  body('title').notEmpty().withMessage('Title is required').isString().trim().escape(),
  body('description').notEmpty().withMessage('Description is required').isString().trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateUpdatePost = [
  body('title')
    .optional()
    .isString().withMessage('Title must be a string')
    .trim()
    .escape(),
  body('description')
    .optional()
    .isString().withMessage('Description must be a string')
    .trim()
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Ensure at least one field is provided
    if (!req.body.title && !req.body.description) {
      return res.status(400).json({
        errors: [{ msg: 'At least one field (title or description) must be provided' }]
      });
    }

    next();
  }
];
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
