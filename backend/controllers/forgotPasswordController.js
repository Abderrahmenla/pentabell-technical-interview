import asyncHandler from 'express-async-handler';
import Token from '../models/tokenModel.js';
import User from '../models/userModel.js';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';


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
  resetPassword,
  confirmedResetPassword
};
