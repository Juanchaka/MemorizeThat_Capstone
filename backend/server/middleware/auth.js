import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.userId };
        next();
    } catch (err) {
        res.status(401).json({ message: "You must authenticate to continue!" })
    }
};

export default auth;