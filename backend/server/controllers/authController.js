import User from '../models/userSchema.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: `User ${ unsername } successfully registered!` });
    } catch (err) {
        res.status(400).json({ message: "Registration failed!", error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.isValidPassword(password))){
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (err) {
        res.status(400).json({ message: "Login failed", error: err.message });
    }
};