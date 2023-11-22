import { IUser, User } from "../models/User"
import { UserBusinness } from "../services/UserBusiness";
import Big from 'big.js';
import { Request, Response } from 'express';

const createUserController = async (req: Request, res: Response) => {
    try {
        const userBody: IUser = new User({
            email: req.body!.email,
            name: req.body!.name,
            wallet: (new Big(req.body!.wallet)).toFixed(2),
        });

        const user = await UserBusinness.createUser(userBody);

        res.status(200).json(user);
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

const getUserWallet = async (req: Request, res: Response) => {
    try {
        const user = await UserBusinness.getUserByEmail(req.body!.email);
        if (user)
            res.status(200).json({ wallet: user?.wallet });
        else
            res.status(400).json({ err: 'User not found' });
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
    createUserController,
    getUserWallet
}