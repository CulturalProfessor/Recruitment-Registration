const UserModal = require("../models/users.js") ;
const AmdinModal = require("../models/Admin"); 
var nodemailer = require('nodemailer'); 
const jwt = require("jsonwebtoken") ; 
var transporter = nodemailer.createTransport(({
    service:"sendinblue",
    auth:{
      user :"svinayak994@gmail.com",
      pass: "fhgera23@34$3e",
    }
  })) 
const register = async(req,res)=>{
    try{
  
    const {Name , Branch , Roll , Email , Phone , Year} = req.body; 
    const oldUser = await UserModal.findOne({ Roll ,Email});
    if(oldUser){
      return res.status(404).json({ message: "User Already Exist" });
    }
    const result = await UserModal.create({Name , Branch , Roll , Email , Phone , Year}); 
    if(result){
      
            transporter.sendMail({
              to:Email,
              from: "svinayak994@gmail.com",
              subject:"Registration",
              html:`<h1>you have registered</h1>`,
            })
    res.status(201).json(true); 
    }

    }
    catch(err){
        console.log(err) ; 
    } 
}
const AdminAuth = async(req,res)=>{
  try{
 
  const {Username , Password} = req.body;
  const AdminUser = await AmdinModal.findOne({ Username , Password});
  const token = jwt.sign({ Username: AdminUser?.Username, Password: AdminUser?.Username }, "test", { expiresIn: "1h" });
  console.log(token) ; 
  res.status(200).json({token});
  // const result = await AmdinModal.create({Username , Password}); 
  }
  catch(err){
      console.log(err); 
  } 
}

const Fetchdata = async(req,res)=>{
  try{
    console.log("hello") ; 
  }catch(err){
    console.log(err) ; 
  }
}

module.exports={register , AdminAuth , Fetchdata} ; 