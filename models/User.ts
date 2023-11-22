import { Model, Schema, Types, model } from 'mongoose';

interface IUser extends Document {
    _id: Types.ObjectId,
    name: string;
    email: string;
    wallet: string;
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, dropDups: true },
    wallet: { type: String, required: true },
});

const User: Model<IUser> = model('User', UserSchema);

export { IUser, User };