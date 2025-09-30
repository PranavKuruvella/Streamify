// routes/authRoutes.js
import express from 'express';
import { signup, login, logout, onboard } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', signup); //eekada just user - fullname,email,password ni matrame save chesthunam..onborad lo other fields ni save chesthunamm

router.post('/login', login);
router.post('/logout', logout);

router.post('/onboarding', protectRoute, onboard)
//new users signup chesina taravatha valla details like languages and all ee route lo chestham...only for signup and this should be protected as it need to be accessed after signup only

router.get("/me",protectRoute,(req,res)=>{
  res.status(200).json({success:true,user:req.user})
})

export default router;
