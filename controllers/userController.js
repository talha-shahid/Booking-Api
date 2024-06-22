// import User from '../models/user.js';

// export const getUsers = async (req, res) => {
//   try {
//     const users = await User.find({}).populate('bookings');
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching users' });
//   }
// };


//////////////////////


import { compare } from 'bcrypt';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    
    const {username, password} = req.body;
    console.log("username", username)
    console.log("password", password)
    const user = await User.findOne({username}).select("+password");
    console.log("user", user)
    const isMatch = await compare(password, user.password)

    if(!user) {
        return res.status(404).json({message: 'Invalid Username'});
    }

    if(!isMatch) {
        return res.status(401).json({message: 'Invalid Password'});
    }
    sendToken(res, user, 200, `Logged In!. Welcome back ${user.name}`);
}


//get my profile
export const getMyProfile =
    async (req, res, next) => {
    res.send('My Profile');
    }


//logut
export const logout = async (req, res, next) => {
        return res.status(200).cookie('token', "", {...cookieOptions, maxAge: 0}).json(
            {success: true, message: 'Logged Out'}
        )
    }







// Function to create a new user
export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const user = new User({ name, email, password, role });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to get all users (for testing purpose, you can remove it later)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};