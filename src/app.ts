import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';

const app = express();
app.use(cors());
app.use(fileUpload());

export default app;
