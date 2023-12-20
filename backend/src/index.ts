import express ,{Request,Response} from "express";

const app = express();

//middleware
app.use(express.json());

app.get("/hello",(req:Request,res:Response)=>{
    console.log("Hello OpenAI")
    res.send("Hello OpenAI")
})


app.listen(5000,()=>{
    console.log("Server Open")
})