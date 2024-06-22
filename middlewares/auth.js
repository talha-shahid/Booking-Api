// import User from "../models/user.js";
// import { ErrorHandler } from "../utils/utility.js";
// import jwt from 'jsonwebtoken';

// const isAuthenticated = async (req, res, next) => {
//     const token = req.cookies["token"];
//     console.log(token)
//     if (!token) {
//         return next(new ErrorHandler("You need to login to access this route"));
//     }
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = await User.findById(decoded._id);
//     next();
// };

// export { isAuthenticated }

import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Agent from '../models/agent.js';

const auth = async (req, res, next) => {
//   const token = req.header('X-Agent-Id');
const token = req.cookies["token"];
  console.log("token = ", token)
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    console.log("hello")
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decodes = ", decoded)
    const user = await Agent.findById(decoded.id);
    console.log("user = ", user)
    req.agent = user
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

export default auth;