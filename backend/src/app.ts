import express ,{Request,Response} from "express";
import {config} from "dotenv";
config();

const app = express();

//middleware
app.use(express.json());

app.get("/hello",(req:Request,res:Response)=>{
    console.log("Hello OpenAI")
    res.send("Hello OpenAI")
})

export default app;