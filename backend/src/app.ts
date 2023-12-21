import express ,{Request,Response} from "express";
import {config} from "dotenv";
config();
import morgan from "morgan"
import appRouter from "./routes/index.js";

//server
const app = express();

//middleware
app.use(express.json());

//remove it in production
app.use(morgan('dev'))

//router
app.use('/api/v1',appRouter);



export default app;