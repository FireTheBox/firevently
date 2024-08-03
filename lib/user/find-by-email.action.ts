import { connectToDatabase } from "../database";
import { getModelData } from "../database/utils";
import User from "./user.model";
import { UserEntity } from "./user-entity.type";

export async function findUserByEmail(email: string): Promise<UserEntity> {
    await connectToDatabase();

    const userModel = await User.findOne({ email });
    const data = getModelData(userModel);

    return {
        id: data._id.toString(),
        username: data.username,
        email: data.email,
        password: data.password
    } as UserEntity
}