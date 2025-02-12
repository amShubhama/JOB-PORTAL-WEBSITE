import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js';
import clerkWebhooks from './controller/webhooks.js';

//Initialize Express
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.get("/",(req,res)=>{
    console.log("Working");
    res.send("Working");
});
app.post("/webhooks",clerkWebhooks)

//Port
const PORT = process.env.PORT || 3000;

app.listen(PORT,async()=>{
    console.log(`app is listening on port ${PORT}`)
    await connectDB();
});