import mongoose from 'mongoose';
import bycrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: {},
    email: {},
    password: {},
    createdAt: {}
});