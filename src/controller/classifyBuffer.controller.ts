import type { Request, Response } from 'express';

import classifyImageFile from '../service/classify.service';

const classifyImageBuffer = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const imageObject = { data: body.buffer as Buffer, mimetype: body.mimetype as string }
    await classifyImageFile(imageObject, (output) => res.json(output));
  } catch (error) {
    if (error instanceof Error) {
      res.json({ message: error.message });
    }
  }
};

export default classifyImageBuffer;
