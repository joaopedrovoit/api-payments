import { Model, Schema, Types, Document, model } from 'mongoose';

interface IPayment extends Document {
    _id: Types.ObjectId,
    value: string;
    payer: Types.ObjectId;
    receiver: Types.ObjectId;
    status: string;
    execTime: Date;
}

const PaymentSchema = new Schema<IPayment>({
    value: { type: String, required: true },
    payer: { type: Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['scheduled', 'success', 'canceled'], required: true },
    execTime: { type: Date, required: true },
});

const Payment: Model<IPayment> = model('Payment', PaymentSchema);

export { IPayment, Payment };