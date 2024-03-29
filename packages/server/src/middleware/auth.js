const jwt = require('jsonwebtoken');
const { User } = require('../user/');
const r = require('../utils/resHelpers.js');

// middleware to check for valid JWT token and user
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.wagauth || null; // extracts jwt from 🍪
    if (!token) throw new Error('Must be logged in to perform this action');
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id }); // find user associated with jwt
    if (!token) throw new Error('Authentication failed'); // error if JWT info does not have user in database

    req.user = user; // store user object in request for access in controller
    next();
  } catch (e) {
    r.error(res, 401, e.message);
  }
};

module.exports = auth;
