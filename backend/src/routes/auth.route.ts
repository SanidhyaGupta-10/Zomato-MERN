import express from 'express';
import { registerUser, loginUser, logoutUser, registerFoodPartner, loginFoodPartner, logoutFoodPartner } from '../controller/auth.controller';

const router = express.Router();

// register and login is post request REST api
// user auth APIs
router.post('/user/register', registerUser)
router.post('/user/login', loginUser)
router.get('/user/logout', logoutUser)

// food partner auth APIs
router.post('/food-partner/register', registerFoodPartner)
router.post('/food-partner/login', loginFoodPartner)
router.get('/food-partner/logout', logoutFoodPartner)

export default router;