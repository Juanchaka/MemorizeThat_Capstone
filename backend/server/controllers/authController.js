import User from '../models/userSchema.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: `User ${username} successfully registered!` });
    }  catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Username or email already exists.' });
        }
        if (err.name === 'ValidationError') {
            if (err.errors.password) {
                return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
            }
            return res.status(400).json({ message: 'Validation error. Please check your input.' });
        }
        res.status(400).json({ message: "Registration failed. Please try again." });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.isValidPassword(password))){
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
        res.status(400).json({ message: "Login failed", error: err.message });
    }
};

export const getCurrentUser = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error in getCurrentUser:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };