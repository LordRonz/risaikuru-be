import { Router } from 'express';
import fileUpload from 'express-fileupload';

import classifyImage from '../controller/classify.controller';
import classifyImageBuffer from '../controller/classifyBuffer.controller';

const router = Router();

router.post('/', fileUpload(), classifyImage);
router.post('/buffer', classifyImageBuffer);

export default router;
