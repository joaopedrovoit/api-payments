import { IUser, User } from "../models/User";

class UserBusinness {
    static getUserById = async (userId: string): Promise<IUser | null> => {
        return await User.findOne({ _id: userId });
    }

    static getUserByEmail = async (email: string): Promise<IUser | null> => {
        return await User.findOne({ email: email });
    }

    static createUser = async (user: IUser): Promise<IUser> => {
        return await User.create(user);
    }

    static updateUser = async (user: IUser): Promise<void> => {
        await User.updateOne({ _id: user._id}, user);
    }
}

export {
    UserBusinness
}