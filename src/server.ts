import fs from 'fs/promises';

import app from './app';
import { PORT } from './config/config';
import { predict } from './config/tensorflow';

const port = PORT || 3000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on: ${port}`);
});

fs.readFile('sedotan.jpg').then((img) => {
  predict(img.toString('base64'), 'image/jpeg', (output) => {
    console.log(output);
  });
});
