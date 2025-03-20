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
  body('title').optional().isString().trim().escape().withMessage('Title must be a string'),
  body('description')
    .optional()
    .isString()
    .trim()
    .escape()
    .withMessage('Description must be a string'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
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
