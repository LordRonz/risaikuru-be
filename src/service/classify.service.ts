import { predict } from '../config/tensorflow';

export interface IImageFile {
  data: Buffer;
  mimetype: string;
}

const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

const classifyImageFile = async (
  image: IImageFile,
  responseFunction: (
    output: {
      className: string;
      probability: number;
    }[]
  ) => void
) => {
  if (!SUPPORTED_IMAGE_TYPES.includes(image.mimetype)) {
    throw new Error(
      `Expected image (${SUPPORTED_IMAGE_TYPES}), but got ${image.mimetype}`
    );
  }
  return predict(image.data, image.mimetype, responseFunction);
};

export default classifyImageFile;
