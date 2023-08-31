const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({ error: "Authorization token not provided." });
        }

        const userObject = jwt.verify(token, "seiuhn3o4it8y34953n4v5o345");
        const user = await User.findByPk(userObject.userId);

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        req.user = userObject;
        console.log('>>>>> req.user in auth line 19: ', req.user);
        next();
    } catch (err) {
        console.error('Error in authentication:', err);
        return res.status(500).json({ error: "Something went wrong in authenticating." });
    }
};
