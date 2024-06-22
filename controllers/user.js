import User from '../models/user.js';
// import { cookieOptions, sendToken } from '../utils/features.js';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendToken } from '../utils/features.js';

//crete a new user and save it to database and save it to cookie
const newUser = async (req, res) => {
    const user = await User.create({name: req.body.name, email: req.body.email, password: req.body.password, role: req.body.role})

    sendToken(res, user, 201, 'User Created!');
}

//login
const login =  async (req, res) => {
    
    const {email, password} = req.body;
    // console.log("username", username)
    // console.log("password", password)
    const user = await User.findOne({email}).select("+password");
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
const getMyProfile =
    async (req, res, next) => {
    res.send('My Profile');
    }


//logut
const logout = async (req, res, next) => {
        return res.status(200).cookie('token', "", {...{
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "none",
            httpOnly: true,
            secure: true,
          }, maxAge: 0}).json(
            {success: true, message: 'Logged Out'}
        )
    }



export {login, newUser, getMyProfile , logout }