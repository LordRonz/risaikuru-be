import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';

import routes from './routes';

const app = express();
app.use(cors());
app.use(fileUpload());

app.use('/', routes);

export default app;
