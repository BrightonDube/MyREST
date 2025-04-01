import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const userSchema = new Schema({
    username: String,
    googleId: String,
    email: String,
});
const User = mongoose.model('user', userSchema);

export default User;