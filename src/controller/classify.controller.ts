import type { Request, Response } from 'express';
import type { UploadedFile } from 'express-fileupload';

import classifyImageFile from '../service/classify.service';

const classifyImage = async (req: Request, res: Response) => {
  try {
    const imageObject = req.files?.image as UploadedFile;
    await classifyImageFile(imageObject, (output) => res.json(output));
  } catch (error) {
    if (error instanceof Error) {
      res.json({ message: error.message });
    }
  }
};

export default classifyImage;
