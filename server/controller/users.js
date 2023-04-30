const UserModal = require("../models/users.js");
const AmdinModal = require("../models/Admin");
var nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
var transporter = nodemailer.createTransport({
  service: "sendinblue",
  auth: {
    user: "svinayak994@gmail.com",
    pass: "fafW23QWdwDqsaw",
  },
});
const register = async (req, res) => {
  try {
    const {
      Name,
      Branch,
      Roll,
      Email,
      Phone,
      Year
    } = req.body;
    const oldUser = await UserModal.findOne({ Roll, Email });
    if (oldUser) {
      return res.status(404).json({ message: "User Already Exist" });
    }
    const result = await UserModal.create({
      Name,
      Branch,
      Roll,
      Email,
      Phone,
      Year,
    });
    if (result) {
      transporter.sendMail({
        to: Email,
        from: "svinayak994@gmail.com",
        subject: "Registration",
        html: `<h1>you have registered</h1>`,
      });
      res.status(201).json(true);
    }
  } catch (err) {
    console.log(err);
  }
};

const Fetchdata = async (req, res) => {
  try {
    console.log("hello");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { register,Fetchdata };
