const jwt = require('jsonwebtoken');
const Student = require('../models/studentModel');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const student = await Student.findOne({ _id: decoded.id, 'tokens.token': token });

        if (!student) {
            throw new Error();
        }

        req.token = token;
        req.student = student;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports = authMiddleware;
