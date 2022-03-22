import * as tfnode from '@tensorflow/tfjs-node';
import * as mobilenet from '@tensorflow-models/mobilenet';

let model: mobilenet.MobileNet | undefined;

export const loadModel = async () => {
  if (model) return model;
  model = await mobilenet.load({
    version: 2,
    alpha: 1.0,
    modelUrl: 'file://model.json',
  });
  return model;
};

export const classify = async (imageBuffer: Buffer, topk = 3) => {
    if (!model) {
      await loadModel();
    }

    const tfimage = tfnode.node.decodeImage(imageBuffer) as tfnode.Tensor3D;
    return model?.classify(tfimage, topk);
  }
