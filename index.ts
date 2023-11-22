import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { createUserController, getUserWallet } from './controllers/UserController';
import { createInstantPayment, createScheduledPayment, cancelScheduledPayment } from './controllers/PaymentController';
import { PaymentBusiness } from './services/PaymentBusiness';
import { Schema } from './middlewares/Middleware';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const mongodb_url: string = process.env.MONGODB_URL || '';

mongoose.connect(mongodb_url).
  catch(error => console.error(error));


app.use(express.json());

const jsonErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ error: err });
}

app.use(jsonErrorHandler);

// Configure job
const intervalId = setInterval(PaymentBusiness.executeScheduledPayments, +(process.env.JOB_INTERVAL!));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server running');
});

app.post('/user', Schema.createUser, createUserController);

app.get('/getUserWallet', Schema.getUserWallet, getUserWallet);

app.post('/createInstantPayment', Schema.createInstantPayment, createInstantPayment);

app.post('/createScheduledPayment', Schema.createScheduledPayment, createScheduledPayment);

app.delete('/cancelScheduledPayment', Schema.cancelScheduledPayment, cancelScheduledPayment);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});