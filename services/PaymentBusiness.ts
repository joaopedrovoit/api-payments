import { string } from "joi";
import { Types } from "mongoose";
import { IPayment, Payment } from "../models/Payment";
import { IUser, User } from "../models/User";
import { UserBusinness } from "./UserBusiness";
import Big from 'big.js';


class PaymentBusiness {
    static cancelScheduledPayment = async (_id: string): Promise<any> => {
        return (await Payment.updateOne({ _id: _id, status: 'scheduled' }, { status: 'canceled' }));
    }

    static createScheduledPayment = async (emailFrom: string, emailTo: string, value: string, dateTime: Date): Promise<IPayment> => {
        const payer = await UserBusinness.getUserByEmail(emailFrom);
        const receiver = await UserBusinness.getUserByEmail(emailTo);
        let status = 'scheduled';

        if (payer == null || receiver == null) {
            throw new Error('User not found');
        }

        if(payer._id.toString() == receiver._id.toString()) {
            throw new Error('Same users');
        }

        if ((new Date().getTime()) > dateTime.getTime()) {
            status = 'canceled';
        }

        const paymentValue = new Big(value);

        const payment: IPayment = new Payment({
            value: (paymentValue).toFixed(2),
            execTime: dateTime,
            payer: payer._id,
            receiver: receiver._id,
            status
        });

        return await Payment.create(payment);
    }

    static executeScheduledPayments = async (): Promise<void> => {
        const payments = await Payment.find({ status: 'scheduled', execTime: { $lt: new Date() } });

        for (let payment of payments) {
            let status = 'canceled';

            try {
                const payer = await UserBusinness.getUserById(payment.payer.toString());
                const receiver = await UserBusinness.getUserById(payment.receiver.toString());

                if (payer == null || receiver == null) {
                    throw new Error('User not found');
                }

                const payerWallet = new Big(payer!.wallet);
                const receiverWallet = new Big(receiver!.wallet);
                const paymentValue = new Big(payment.value);

                if (payerWallet.minus(paymentValue).gte(0)) {
                    payer!.wallet = payerWallet.minus(paymentValue).toFixed(2);
                    receiver!.wallet = receiverWallet.plus(paymentValue).toFixed(2);

                    await UserBusinness.updateUser(payer!);
                    await UserBusinness.updateUser(receiver!);

                    status = 'success';
                }
            }
            catch (err) {
                console.error(err);
            }
            finally {
                payment.status = status;
                payment.execTime = new Date();

                await Payment.updateOne({ _id: payment._id }, payment)
            }
        }
    }

    static makePayment = async (emailFrom: string, emailTo: string, value: string): Promise<IPayment> => {
        const payer = await UserBusinness.getUserByEmail(emailFrom);
        const receiver = await UserBusinness.getUserByEmail(emailTo);
        let status = 'canceled';

        if (payer == null || receiver == null) {
            throw new Error('User not found');
        }

        if(payer._id.toString() == receiver._id.toString()) {
            throw new Error('Same users');
        }

        const payerWallet = new Big(payer?.wallet);
        const receiverWallet = new Big(receiver?.wallet);
        const paymentValue = new Big(value);

        if (payerWallet.minus(paymentValue).gte(0)) {
            payer.wallet = payerWallet.minus(paymentValue).toFixed(2);
            receiver.wallet = receiverWallet.plus(paymentValue).toFixed(2);

            await UserBusinness.updateUser(payer);
            await UserBusinness.updateUser(receiver);

            status = 'success';
        }

        const payment: IPayment = new Payment({
            value: (paymentValue).toFixed(2),
            execTime: new Date(),
            payer: payer._id,
            receiver: receiver._id,
            status
        });

        return await Payment.create(payment);
    }
}

export {
    PaymentBusiness
}