import express from 'express';
import cors from 'cors';

import * as dotenv from "dotenv";
dotenv.config();

import rootRouter from './router/router';

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', rootRouter)

app.listen(port, () => {
  // tslint:disable-next-line: no-console
  return console.log(`server is listening on ${port}`);
}).on('error', (e: Error) => {
  // tslint:disable-next-line: no-console
  console.log('Error happened: ', e.message)
})