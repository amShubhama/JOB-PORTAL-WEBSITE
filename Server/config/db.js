import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database is connected successfully");
    } catch (error) {
        console.log(error.message);
    }
}
export default connectDB;