import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from '@clerk/express' 
import fileUpload from "express-fileupload";
import path from "path";

import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js"
import authRoutes from "./routes/auth.route.js"
import songRoutes from "./routes/song.route.js"
import albumRoutes from "./routes/album.route.js"
import statsRoutes from "./routes/stats.route.js"
import {connectDB} from "./lib/db.js";

dotenv.config();


const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT;

app.use(express.json()); // for parsing application/json(req.body 
app.use(clerkMiddleware()) //this will add auth to req obj => req.

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits:{
        fileSize: 10 * 1024 * 1024, //10MB Max file size
    },
}))

app.use("/api/users/", userRoutes);
app.use("/api/admin/", adminRoutes);
app.use("/api/auth/", authRoutes);
app.use("/api/songs/", songRoutes);
app.use("/api/albums/", albumRoutes);
app.use("/api/stats/", statsRoutes);

//error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);   
    res.status(500).json({
        message: process.env.NODE_ENV === "production" ? "Internal Server errror" : err.message   
    });
})

app.listen(PORT, () => {
    console.log("Server is running on port http://localhost:" + PORT);
    connectDB()
})

//todo: socket io