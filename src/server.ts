import app from './app';
import { PORT } from './config/config';

const port = PORT || 3001;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on: ${port}`);
});
