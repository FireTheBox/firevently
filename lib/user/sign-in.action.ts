"use server";

import bycript from 'bcryptjs';

import { handleError } from "../utils";
import { findUserByEmail } from './find-by-email.action';
import { UserResponse } from "./user.type";

export async function signInAction(email: string, password: string) {
    try {
        const userDb = await findUserByEmail(email)

        if (!userDb) {
            return null;
        }

        const validPassword = await bycript.compare(password, userDb.password);

        if (!validPassword) {
            return null;
        }

        const response: UserResponse = {
            id: userDb.id,
            username: userDb.username,
            email: userDb.email
        }

        return response;
    } catch (error) {
        handleError(error);
        return null;
    }
}