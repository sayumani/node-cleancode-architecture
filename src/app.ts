import express from 'express';
import cors from 'cors';

import * as dotenv from "dotenv";
dotenv.config();

import rootRouter from './router/router';
import errorHandler from './middlewares/error';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', rootRouter)

app.use(errorHandler)

export default app;