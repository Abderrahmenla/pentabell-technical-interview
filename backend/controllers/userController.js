import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import Token from '../models/tokenModel.js';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';


// @desc    Auth user & get token
// @route   POST /api/signin
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.description = 'Authenticate user and get token.'
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/User" },
            description: 'Signed in.' 
        } */
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/signup
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.description = 'Sign up.'
  const { firstName,lastName,phoneNumber, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({firstName,lastName,phoneNumber, email, password});

  if (user) {
    /* #swagger.responses[201] = { 
            schema: { $ref: "#/definitions/User" },
            description: 'The user have been registered.' 
        } */
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Send password reset link
// @route   POST /api/password-reset
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send("user with given email doesn't exist");
    let token = await Token.findOne({ userId: user._id });
    if (!token) {
        token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();
    }

    const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
    await sendEmail(user.email, "Password reset", link);

    res.send("password reset link sent to your email account");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});

// @desc    Confirmed reset password
// @route   POST /api/password-reset/:userID/:token
// @access  Public
const confirmedResetPassword = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send("invalid link or expired");

    const token = await Token.findOne({
        userId: user._id,
        token: req.params.token,
    });
    if (!token) return res.status(400).send("Invalid link or expired");

    user.password = req.body.password;
    await user.save();
    await token.delete();

    res.send("password reset sucessfully.");
  } catch (error) {
      res.send("An error occured");
      console.log(error);
  }
});


export {
  authUser,
  registerUser,
  resetPassword,
  confirmedResetPassword
};
