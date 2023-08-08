const express=require("express")
const app=express()
const bodyParser = require("body-parser")
//app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.text())
const number=Math.floor(Math.random()*10)



const middleware=(req,res,next)=>{
    
    const Number =+req.body;
    console.log(Number,number)
    if (Number !== number) throw new Error("Client number does not match server number")
    else next()
  
}

app.post("/",middleware,(req,res,next)=>{

        res.send("Success!!!")
})

app.use((err,req,resp,next)=>{
    resp.status(404).send(err.message)
})

app.listen(3000)



