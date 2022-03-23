import * as tmImage from '@teachablemachine/image';
import { createCanvas, Image } from 'canvas';
import { JSDOM } from 'jsdom';

let model: tmImage.CustomMobileNet | undefined;

export const loadModel = async () => {
  if (model) return model;
  model = await tmImage.load(
    'https://raw.githubusercontent.com/LordRonz/risaikuru_be/main/model.json',
    'https://raw.githubusercontent.com/LordRonz/risaikuru_be/main/metadata.json'
  );
  return model;
};

export const predict = async (
  imageData: string | Buffer,
  contentType: string,
  responseFunction: (
    output: {
      className: string;
      probability: number;
    }[]
  ) => void
) => {
  if (!model) {
    model = await loadModel();
  }
  if (typeof imageData !== 'string') {
    imageData = imageData.toString('base64');
  }
  getPrediction(model, imageData, contentType, responseFunction);
};

export const getPrediction = async (
  model: tmImage.CustomMobileNet,
  imageData: string,
  contentType: string,
  responseFunction: (
    output: {
      className: string;
      probability: number;
    }[]
  ) => void
) => {
  const imageCanvas = createCanvas(64, 64);
  const canvasContext = imageCanvas.getContext('2d');

  const canvasImage = new Image();
  canvasImage.onload = async () => {
    canvasContext.drawImage(canvasImage, 0, 0, 64, 64);

    const prediction = await model.predict(
      imageCanvas as unknown as tmImage.ClassifierInputSource
    );
    console.log(prediction);
    responseFunction(prediction);
  };

  canvasImage.onerror = (error) => {
    throw error;
  };

  canvasImage.src = `data:${contentType};base64,` + imageData;
};

const configureBrowserPolyFills = () => {
  global.window = new JSDOM(`
  <body>
    <script>
    document.body.appendChild(document.createElement("hr"));
    </script>
  </body>`).window as unknown as Window & typeof globalThis;
  global.document = window.document;
  global.fetch = require('node-fetch');
  global.HTMLVideoElement =
    class HTMLVideoElement {} as typeof global.HTMLVideoElement;
};

configureBrowserPolyFills();
