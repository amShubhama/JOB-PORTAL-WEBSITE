import express from "express";
import { changeJobApplicationStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from "../controller/companyController.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middleware/authMiddleware.js";

const router = express.Router();

//Register a company
router.post('/register', upload.single('image'), registerCompany)

//Company login
router.post('/login', loginCompany);

//Get company data
router.get('/company', protectCompany, getCompanyData);

//post a job
router.post('/post-job', protectCompany, postJob);

//Get applicants data of company
router.get('/applicants', protectCompany, getCompanyJobApplicants);

//Get Company Job list
router.get('/list-jobs', protectCompany, getCompanyPostedJobs);

//change application status
router.post('/change-status', protectCompany, changeJobApplicationStatus);

//change application visibility
router.post('/change-visibility', protectCompany, changeVisibility);

export default router;