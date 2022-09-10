import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { PORT, configfileUpload } from "./utils/config.js";
import fileUpload from "express-fileupload";
import momentRoutes from "./routes/moment.route.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import uploadRoutes from "./routes/upload.route.js";


const app = express();
app.use(json());
app.use(cors());
app.use(cookieParser());

app.use(fileUpload(configfileUpload));
//app.use(express.static("../image"));

app.use("/api/", momentRoutes);
app.use("/api/", userRoutes);
app.use("/api/", authRoutes);
app.use("/files", uploadRoutes);


app.listen(PORT);
console.log(`Corriendo servidor en el puerto ${PORT} 🌪`);
