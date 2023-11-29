import Registrations from "../models/student.js";
import dotenv from "dotenv";
import Joi from "joi";
import CryptoJS from "crypto-js";
import nodemailer from "nodemailer";
import fetch from "node-fetch";
dotenv.config();
const PASSWORD = process.env.EMAIL_PASSWORD;
const secretKey = process.env.VITE_SECRET_KEY;
const recapchaSecretKey = process.env.RECAPCHA_SECRET_KEY;

const registrationSchema = Joi.object({
  Name: Joi.string().required(),
  Gender: Joi.string().required(),
  Branch: Joi.string().required(),
  Roll: Joi.string().required(),
  Email: Joi.string().email().required(),
  Hostel: Joi.string().required(),
  Year: Joi.string().required(),
  Phone: Joi.string().length(10).required(),
  Token: Joi.string().required(),
});

export const create = async (req, res) => {
  try {
    const encryptedData = req.body.encryptedData;
    const decryptedData = CryptoJS.AES.decrypt(
      encryptedData,
      secretKey
    ).toString(CryptoJS.enc.Utf8);
    const decryptedDataJSON = JSON.parse(decryptedData);

    const { error } = registrationSchema.validate(decryptedDataJSON);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { Name, Gender, Branch, Roll, Email, Phone, Year, Hostel, Token } =
      decryptedDataJSON;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${recapchaSecretKey}&response=${Token}`;
    const response = await fetch(url, {
      method: "POST",
    });
    const data = await response.json();
    const oldUser = await Registrations.findOne({
      $or: [{ Email }, { Phone }, { Roll }],
    });

    if (oldUser) {
      return res.status(409).json({ message: "User already exists" });
    } else {
      if (data.success == true) {
        await Registrations.create({
          Name,
          Gender,
          Branch,
          Roll,
          Email,
          Hostel,
          Year,
          Phone,
        });

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
          },
        });

        const mailOptions = {
          from: "ossrndcentre@gmail.com",
          to: Email,
          subject: "Registration Successful",
          text: "Thank you for registering. Your registration was successful. The contest will be held on 5th December 2023 in 4th Floor CSIT block from 4:00pm to 7pm ,please register yourself on HackerRank before contest.",
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
          } else {
            console.log("Email sent:", info.response);
          }
        });

        res.status(201).json("You have been registered successfully");
      } else {
        res
          .status(421)
          .json({ message: "Please verify that you are not a robot" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const find = async (req, res) => {
  try {
    const { password } = req.body;
    if (password === PASSWORD) {
      const result = await Registrations.find();
      res.status(200).json(result);
    } else {
      res.status(400).json({ message: "Please provide a valid password" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
