import express from "express";
import dotenv from "dotenv";



import userRoutes from "./routes/user.route.js";

dotenv.config();


const app = express();
const PORT = process.env.PORT;

app.use("/api/users/",userRoutes);

app.listen(PORT, () => {
    console.log("Server is running on port http://localhost:"+ PORT)
})