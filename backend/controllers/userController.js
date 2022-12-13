import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';


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




export {
  authUser,
  registerUser
};
