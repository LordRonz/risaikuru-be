import { Router } from 'express';

import classifyImage from '../controller/classify.controller';
import classifyImageBuffer from '../controller/classifyBuffer.controller';

const router = Router();

router.post('/', classifyImage);
router.post('/buffer', classifyImageBuffer);

export default router;
