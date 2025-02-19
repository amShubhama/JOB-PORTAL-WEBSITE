import User from "../models/User.js";
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import generateToken from "../utils/generateToken.js";
import JobApplication from "../models/jobApplication.js";
import Job from "../models/Job.js";


//register user
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const imageFile = req.file;

    if (!imageFile) {
        return res.json({
            success: false,
            message: 'Missing Details'
        })
    }

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.json({ success: false, message: 'User already exists' })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const imageUpload = await cloudinary.uploader.upload(imageFile.path);

        const user = await User.create({
            name,
            email,
            password: hashPassword,
            image: imageUpload.secure_url
        });

        return res.json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.image
            },
            token: generateToken(user._id),
            message: 'User is successfully registered'
        })


    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

//user login
export const loginUser = async (req, res) => {

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }
        if (await bcrypt.compare(password, user.password)) {
            return res.json({
                success: true,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    image: user.image
                },
                token: generateToken(user._id),
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



//Get user data
export const getUserData = async (req, res) => {

    const userId = req.user;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.json({
                success: false,
                message: 'user not found'
            })
        }
        res.json({
            success: true,
            user
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

//Apply for a job
export const applyForjob = async (req, res) => {

    const { jobId } = req.body;
    const userId = req.user._id;

    try {
        const isAlreadyApplied = await JobApplication.find({ jobId, userId });
        if (isAlreadyApplied.length > 0) {
            return res.json({
                success: false,
                message: 'Already Applied'
            })
        }
        const jobData = await Job.findById(jobId);
        if (!jobData) {
            return res.json({
                success: false,
                message: 'Job not found'
            })
        }
        await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date: Date.now()
        })
        res.json({
            success: true,
            message: 'Applied successfully.'
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

//Get user applied applications
export const getUserJobApplications = async (req, res) => {

    try {
        const userId = req.user._id;
        const application = await JobApplication.find({ userId })
            .populate('companyId', 'name email image')
            .populate('jobId', 'title description location category level salary')
            .exec();

        if (!application) {
            return res.json({
                success: false,
                message: 'No job applications found'
            })
        }
        return res.json({
            success: true,
            application
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

//update user profile (resume)
export const updateUserResume = async (req, res) => {
    try {
        const userId = req.user._id;
        const resumeFile = req.file;
        const userData = await User.findById(userId);
        if (resumeFile) {
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path);
            userData.resume = resumeUpload.secure_url;
        }
        await userData.save();
        return res.json({
            success: true,
            link: userData.resume,
            message: 'Resume Updated'
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}