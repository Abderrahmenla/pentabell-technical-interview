import express from 'express';
import {
  confirmedResetPassword,
  resetPassword
} from '../controllers/forgotPasswordController.js';
const router = express.Router();

router.route('/').post(resetPassword);
router.route('/:userID/:token').post(confirmedResetPassword);


export default router;
