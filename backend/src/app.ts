import express ,{Request,Response} from "express";
import {config} from "dotenv";
config();
import morgan from "morgan"
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";

//server
const app = express();

//middleware
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//remove it in production
app.use(morgan('dev'))

//router
app.use('/api/v1',appRouter);



export default app;