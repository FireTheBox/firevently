import { model, models,Schema } from "mongoose";

const UserSchema = new Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

const User = models.User || model('User', UserSchema);

export default User;