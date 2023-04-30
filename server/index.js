const express = require("express"); 
const app = express(); 
const cors = require("cors"); 
const port = 8080 ;
const conn = require("./config/conn"); 
conn(); 
app.use(express.json({limit:"30mb"  , extended:true}) ) ; 
app.use(express.urlencoded({limit:"30mb"  , extended:true}) ) ; 

app.use(cors()) ; 
app.get("/" , (req,res)=>{
    res.send("app is running "); 
}) ; 
app.use("/users" , require("./routes/users")) ; 
app.listen(port , ()=>{
    console.log(`listeing the port number ${port}`) ; 
})


