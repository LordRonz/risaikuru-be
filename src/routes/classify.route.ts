import { Router } from 'express';

import classifyImage from '../controller/classify.controller';

const router = Router();

router.post('/', classifyImage);

export default router;
