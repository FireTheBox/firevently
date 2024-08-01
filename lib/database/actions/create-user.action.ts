import { connectToDatabase } from "@/lib/database";
import User, { UserType } from "@/lib/database/models/user.model";
import { handleError } from "@/lib/utils";

export interface CreateUserInput {
    username: string;
    email: string;
    avatar: string | null;
}

export async function createUser(user: CreateUserInput) {
    try {
        await connectToDatabase()

        const newUser = await User.create(user)
        return {
            userId: newUser._id.toString(),
            username: newUser.username,
            email: newUser.email,
            avatar: newUser.avatar,
        } satisfies UserType
    } catch (error) {
        handleError(error)
    }
}