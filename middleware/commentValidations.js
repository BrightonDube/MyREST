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
  body('text')
    .notEmpty().withMessage('Comment text is required')
    .isString().withMessage('Comment text must be a string')
    .trim()
    .escape(),
  body('author')
    .optional()
    .isString().withMessage('Author name must be a string')
    .trim()
    .escape(),
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
