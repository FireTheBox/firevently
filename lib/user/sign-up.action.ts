import bycript from 'bcryptjs';

import { connectToDatabase } from "../database";
import { handleError } from '../utils';
import User from "./user.model";
import { UserResponse } from './user.type';

export async function signUpAction(email: string, password: string, username?: string) {
    await connectToDatabase();

    try {
        const userDb = await User.findOne({ email });

        if (userDb) {
            return null;
        }

        const salt = await bycript.genSalt();
        const encryptedPassword = await bycript.hash(password, salt);

        const savedUser = await User.create({
            username,
            email,
            password: encryptedPassword
        })

        if (!savedUser) {
            return null;
        }

        const response: UserResponse = {
            id: savedUser._id.toString(),
            username: savedUser.username,
            email: savedUser.email
        }

        return response;
    } catch (error) {
        handleError(error);
        return null;
    }
}