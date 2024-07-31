import { connectToDatabase } from "@/lib/database"
import User from "@/lib/database/models/user.model"
import { handleError } from "@/lib/utils"

export interface GetUserByEmailInput {
    email: string;
}

export interface GetUserByEmailOutput {
    userId: string;
    username: string;
    email: string;
    avatar: string;
}

export async function getUserByEmail({ email }: GetUserByEmailInput): Promise<GetUserByEmailOutput | null> {
    try {
        await connectToDatabase()

        const user = await User.findOne({ email })

        if (!user) {
            return null;
        }

        return {
            userId: user._id.toString(),
            username: user.username,
            email: user.email,
            avatar: user.avatar,
        }
    } catch (error) {
        handleError(error)
        return null;
    }
}