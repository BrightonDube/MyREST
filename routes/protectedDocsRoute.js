import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';
import isLoggedIn from '../middleware/isLoggedIn.js';
const require = createRequire(import.meta.url);
const swaggerDocument = require('../swagger_output.json');
const router = express.Router();

const protectedDocsRouter = express.Router();

protectedDocsRouter.use(isLoggedIn);

protectedDocsRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.use('/api-docs', protectedDocsRouter);

export default router;
