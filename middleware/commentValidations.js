// middleware/commentValidations.js
import { body, validationResult } from 'express-validator';

export const validateCreateComment = [
  body('text').notEmpty().withMessage('Comment text is required').isString().trim().escape(),
  body('author').notEmpty().withMessage('Author name is required').isString().trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateUpdateComment = [
  // Optional - if you want to allow updating comments
  body('text').optional().isString().trim().escape().withMessage('Comment text must be a string'),
  body('author').optional().isString().trim().escape().withMessage('Author name must be a string'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const handleValidationErrors = (req, res, next) => {
  // You might already have this, can reuse
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
