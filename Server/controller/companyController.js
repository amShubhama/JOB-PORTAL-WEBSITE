import Company from "../models/Company.js";
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";
import JobApplication from "../models/jobApplication.js";
//register a new company
export const registerCompany = async (req, res) => {

    const { name, email, password } = req.body;

    const imageFile = req.file;

    if (!imageFile) {
        return res.json({
            success: false,
            message: 'Missing Details'
        })
    }

    try {
        const companyExists = await Company.findOne({email});

        if (companyExists) {
            return res.json({ success: false, message: 'Company already exists' })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const imageUpload = await cloudinary.uploader.upload(imageFile.path);

        const company = await Company.create({
            name,
            email,
            password: hashPassword,
            image: imageUpload.secure_url
        });

        return res.json({
            success: true,
            company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image
            },
            token: generateToken(company._id),
            message: 'Company is successfully registered'
        })


    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

//Company login
export const loginCompany = async (req, res) => {
    const { email, password } = req.body;
    try {
        const company = await Company.findOne({ email });
        if (!company) {
            return res.json({ success: false, message: "Company doesn't exist" });
        }
        console.log(company)
        if (await bcrypt.compare(password, company.password)) {
            return res.json({
                success: true,
                company: {
                    _id: company._id,
                    name: company.name,
                    email: company.email,
                    image: company.image
                },
                token: generateToken(company._id),
                message: "Successfully login"
            });
        } else {
            return res.json({
                success: false,
                message: 'Invalid email or password',
            })
        }

    } catch (error) {
        return res.json({
            success: false,
            message: error.message,
        })
    }
}

//get company data
export const getCompanyData = async (req, res) => {

    const company = req.company;
    try {
        res.json({
            success:true,
            company
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}

//Post a new job
export const postJob = async (req, res) => {

    const {title, description,location,category,level,salary} = req.body;
    const companyId = req.company._id;
   if(!title && !description && !location && !category && !level && !salary){
    return res.json({
        success:true,
        message:'Missing Details!'
    })
   }
   try {
    const  newJob = new Job({
        title,
        description,
        location,
        category,
        level,
        salary,
        date: Date.now(),
        companyId
    })
    await newJob.save();
    return res.json({
        success:true,
        newJob,
        message:'Job is successfully posted!'
    })
   } catch (error) {
    return res.json({
        success:false,
        message:error.message
    })
   }
}

// get company job applicants
export const getCompanyJobApplicants = async (req, res) => {

}

//get company posted job
export const getCompanyPostedJobs = async (req, res) => {
    try {
        const companyId = req.company._id;
        const jobs = await Job.find({companyId});

        //adding No. of applicants info in data
        const jobsData = await Promise.all(jobs.map(async (job) => {
            const applicants = await JobApplication.find({jobId:job._id});
            return {...job.toObject(),applicants:applicants.length}
        }))
       
        return res.json({
            success:true,
            jobsData,

        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}

//change job application status
export const changeJobApplicationStatus = async (req, res) => {

}

//change job visibility
export const changeVisibility = async (req,res) => {
    try {
        const {id} = req.body;
        const companyId = req.company._id;

        const job = await Job.findById(id);

        if(companyId.toString() === job.companyId.toString()){
            job.visible = !job.visible;
        }
        await job.save();
        res.json({
            success:true,
            job
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message,
        })
    }
}