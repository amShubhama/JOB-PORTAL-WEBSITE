import express from 'express';
import { applyForjob, getUserData, getUserJobApplications, loginUser, registerUser, updateUserResume } from '../controller/userController.js';
import upload from '../config/multer.js';
import { protectUser } from '../middleware/authMiddlewareUser.js';
const router = express();

//register user
router.post('/register', upload.single('image'), registerUser);

//login user
router.post('/login', loginUser);

//Get userdata
router.get('/user', protectUser, getUserData);

//Apply for a job
router.post('/apply', protectUser, applyForjob);

//Get applied jobs data
router.get('/applications', protectUser, getUserJobApplications);

//update user profile (resume)
router.post('/update-resume', protectUser, upload.single('resume'), updateUserResume);

export default router;