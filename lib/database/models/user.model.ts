import { Schema, model, models } from "mongoose";

export interface UserType {
  userId: string;
  username: string;
  email: string;
  avatar: string;
}

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
})

const User = models.User || model('User', UserSchema);

export default User;