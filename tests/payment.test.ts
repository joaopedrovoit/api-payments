import { expect, test } from '@jest/globals';
import { UserBusinness } from '../services/UserBusiness'
import { User } from '../models/User';
import { PaymentBusiness } from '../services/PaymentBusiness'
import { Payment } from '../models/Payment';
import { Types } from 'mongoose';

beforeEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

test('should return success payment', async () => {
    const user1 = { _id: new Types.ObjectId("655cea23244d549e4cde80b9"), name: 'Teste', email: "test1@gmail.com", wallet: "100" };
    const user2 = { _id: new Types.ObjectId("655cca55616e818a944e1cba"), name: 'Teste', email: "test2@gmail.com", wallet: "100" };
    const payment = { value: '20.00', status: 'success', payer: new Types.ObjectId("655cea23244d549e4cde80b9"), receiver: new Types.ObjectId("655cca55616e818a944e1cba") };

    User.findOne = jest.fn().mockImplementationOnce(() => user1).mockImplementationOnce(() => user2);
    User.updateOne = jest.fn().mockImplementationOnce(() => { }).mockImplementationOnce(() => { });

    Payment.create = jest.fn().mockImplementationOnce((element) => element);

    return PaymentBusiness.makePayment('test1@gmail.com', 'test2@gmail.com', "20.00").then(data => expect(data).toEqual(expect.objectContaining(payment)));
});

test('should return canceled payment', async () => {
    const user1 = { _id: new Types.ObjectId("655cea23244d549e4cde80b9"), name: 'Teste', email: "test1@gmail.com", wallet: "100" };
    const user2 = { _id: new Types.ObjectId("655cca55616e818a944e1cba"), name: 'Teste', email: "test2@gmail.com", wallet: "100" };
    const payment = { value: '120.00', status: 'canceled', payer: new Types.ObjectId("655cea23244d549e4cde80b9"), receiver: new Types.ObjectId("655cca55616e818a944e1cba") };

    User.findOne = jest.fn().mockImplementationOnce(() => user1).mockImplementationOnce(() => user2);

    Payment.create = jest.fn().mockImplementationOnce((element) => element);

    return PaymentBusiness.makePayment('test1@gmail.com', 'test2@gmail.com', "120.00").then(data => expect(data).toEqual(expect.objectContaining(payment)));
});

test('should return scheduled payment', async () => {
    const date = new Date();
    date.setHours(date.getHours() + 1);

    const user1 = { _id: new Types.ObjectId("655cea23244d549e4cde80b9"), name: 'Teste', email: "test1@gmail.com", wallet: "100" };
    const user2 = { _id: new Types.ObjectId("655cca55616e818a944e1cba"), name: 'Teste', email: "test2@gmail.com", wallet: "100" };
    const payment = { value: '120.00', status: 'scheduled', payer: new Types.ObjectId("655cea23244d549e4cde80b9"), receiver: new Types.ObjectId("655cca55616e818a944e1cba"), execTime: date };

    User.findOne = jest.fn().mockImplementationOnce(() => user1).mockImplementationOnce(() => user2);

    Payment.create = jest.fn().mockImplementationOnce((element) => element);

    return PaymentBusiness.createScheduledPayment('test1@gmail.com', 'test2@gmail.com', "120.00", date).then(data => expect(data).toEqual(expect.objectContaining(payment)));
});

test('should return canceled payment', async () => {
    const date = new Date();

    const user1 = { _id: new Types.ObjectId("655cea23244d549e4cde80b9"), name: 'Teste', email: "test1@gmail.com", wallet: "100" };
    const user2 = { _id: new Types.ObjectId("655cca55616e818a944e1cba"), name: 'Teste', email: "test2@gmail.com", wallet: "100" };
    const payment = { value: '120.00', status: 'canceled', payer: new Types.ObjectId("655cea23244d549e4cde80b9"), receiver: new Types.ObjectId("655cca55616e818a944e1cba"), execTime: date };

    User.findOne = jest.fn().mockImplementationOnce(() => user1).mockImplementationOnce(() => user2);

    Payment.create = jest.fn().mockImplementationOnce((element) => element);

    return PaymentBusiness.createScheduledPayment('test1@gmail.com', 'test2@gmail.com', "120.00", date).then(data => expect(data).toEqual(expect.objectContaining(payment)));
});