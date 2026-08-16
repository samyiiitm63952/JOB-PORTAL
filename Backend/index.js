import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.routes.js";
import CompanyRoute from "./routes/company.route.js"

dotenv.config({})
const app = express();

const corsOptions = {
    origin: true,  // allows all origins including Postman
    credentials: true,
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/",(req,res)=>{
    return res.status(200).json({
        message: "Welcome to the API!",
        timestamp: new Date().toISOString(),
        success: true,
    })
})

const PORT = process.env.PORT || 5001

//api's
app.use("/api/users",userRoute)
app.use("/api/company",CompanyRoute);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})