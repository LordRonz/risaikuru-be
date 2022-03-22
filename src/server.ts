import fs from 'fs/promises';

import app from './app';
import { PORT } from './config/config';
import { classify,loadModel } from './config/tensorflow';

const port = PORT || 3000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on: ${port}`);
});

loadModel().then(() => {
  fs.readFile('sedotan.jpg').then((img) => {
    classify(img).then((s) => {
      console.log(s);
    });
  });
});
