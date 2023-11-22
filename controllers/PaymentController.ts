import { PaymentBusiness } from '../services/PaymentBusiness';
import { Request, Response } from 'express';

const createInstantPayment = async (req: Request, res: Response) => {
    try {
        const payment = await PaymentBusiness.makePayment(req.body!.emailFrom, req.body!.emailTo, req.body!.value);

        res.status(200).json(payment);
    } catch (error) {
        let message;

        if (error instanceof Error) {
            message = error.message;
        }
        else {
            message = String(error);
        }

        res.status(500).json({ err: message });
    }
}

const createScheduledPayment = async (req: Request, res: Response) => {
    try {
        const payment = await PaymentBusiness.createScheduledPayment(req.body!.emailFrom, req.body!.emailTo, req.body!.value, new Date(req.body!.dateTime));

        res.status(200).json(payment);
    } catch (error) {
        let message;

        if (error instanceof Error) {
            message = error.message;
        }
        else {
            message = String(error);
        }

        res.status(500).json({ err: message });
    }
}

const cancelScheduledPayment = async (req: Request, res: Response) => {
    try {
        const deletedCount = await PaymentBusiness.cancelScheduledPayment(req.body!.paymentId);

        res.status(200).json(deletedCount);
    } catch (error) {
        let message;

        if (error instanceof Error) {
            message = error.message;
        }
        else {
            message = String(error);
        }

        res.status(500).json({ err: message });
    }
}

export {
    createInstantPayment,
    createScheduledPayment,
    cancelScheduledPayment
}