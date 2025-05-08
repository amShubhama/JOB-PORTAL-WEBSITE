import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js';
import companyRoutes from './routes/companyRoutes.js'
import connectCloudinary from './config/cloudinary.js';
import jobRoutes from './routes/jobRoutes.js';
import userRoutes from './routes/userRoutes.js';



//Initialize Express
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.get("/", (req, res) => {
    console.log("Working");
    res.send("Working");
});
app.use('/api/company', companyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);



//Port
const PORT = process.env.PORT;

app.listen(PORT, async () => {
    console.log(`app is listening on port ${PORT}`)
    await connectDB();
    await connectCloudinary();
});