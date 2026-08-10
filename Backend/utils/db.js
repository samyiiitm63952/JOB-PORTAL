import mongoose from "mongoose"
const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MONGODB Connected")
    } catch(err){
        console.log('Error connecting to Mongo DB : ',err.message);
        process.exit(1);
    }
}
export default connectDB