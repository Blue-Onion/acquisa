import logger from '#config/logger.js';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan("combined",{stream:{write:(message)=>logger.info(message.trim())}}))
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => {
  logger.info("Hello from logger - aquisa server");
  res.status(200).send('Hello from aquisa server!');
});

export default app;
