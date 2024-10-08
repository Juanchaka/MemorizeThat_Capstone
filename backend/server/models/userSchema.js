import mongoose from 'mongoose';
import bycrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.index({ usaername: 1, email: 1});

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    this.password = await bycrypt.hash(this.password, 12);
    next();
});

userSchema.methods.isValidPassword = async function(password) {
    return await bycrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;