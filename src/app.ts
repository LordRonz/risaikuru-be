import cors from 'cors';
import express from 'express';

import routes from './routes';

const app = express();
app.use(express.json({ limit: '10MB' }));
app.use(cors());

app.use('/', routes);

app.use((req, res) => {
  res.status(404).send({
    message: 'Not Found',
  });
});

export default app;
