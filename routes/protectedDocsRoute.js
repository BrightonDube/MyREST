import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';
import isLoggedIn from '../middleware/isLoggedIn.js';
const require = createRequire(import.meta.url);
const swaggerDocument = require('../swagger_output.json');
const router = express.Router();

// Create a protected router
const protectedDocsRouter = express.Router();

// Apply authentication middleware to the protected router
protectedDocsRouter.use(isLoggedIn);
// Mount Swagger UI under the protected router
protectedDocsRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Mount the protected router at /api-docs
router.use('/api-docs', protectedDocsRouter);

export default router;
