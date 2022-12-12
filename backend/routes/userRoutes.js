import express from 'express';
import {
  authUser,
  registerUser,
  confirmedResetPassword,
  resetPassword
} from '../controllers/userController.js';
const router = express.Router();
router.route('/signup').post(registerUser);
router.route('/signin').post(authUser);
router.route('/password-reset').post(resetPassword);
router.route('/password-reset/:userID/:token').post(confirmedResetPassword);


export default router;
