import express from 'express';
import {
  authUser,
  registerUser
} from '../controllers/userController.js';
const router = express.Router();
router.route('/signup').post(registerUser);
router.route('/signin').post(authUser);


export default router;
