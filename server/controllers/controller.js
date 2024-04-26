import Registrations from "../models/student.js";
import dotenv from "dotenv";
import Joi from "joi";
import CryptoJS from "crypto-js";
import nodemailer from "nodemailer";
import fetch from "node-fetch";
dotenv.config();
const PASSWORD = process.env.EMAIL_PASSWORD;
const secretKey = process.env.VITE_SECRET_KEY;

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

//function for sending  mail by sendgrid
async function sendEmail(emailTypeFunction, toMail, fromMail) {
  console.log('process.env.SENDGRID_API_KEY:', process.env.SENDGRID_API_KEY);
  try {
      const emailMessage = getEmail();

      emailMessage.to = toMail;
      emailMessage.from = fromMail;

      await sendGridMail.send(emailMessage);
      return { message: `email sent successfully` };
  } catch (error) {
      console.log({ 'message': `Error in sending email`, 'error': error });
      return error;
  }
}


function getEmail() {
  // return your html component here
  return {
      to: data.toMail,
      from: data.fromMail,
      subject: data.subject,
      html: `
  <font face="Google Sans" color="#444444" >
      <div style="font-size:110%">
          <p >Hi ${data.user.full_name}</p>
          <p> Please use the following OTP to reset your password: <b>${data.otp}</b> </p>
          <p>This OTP will expire in 15 minutes.</p>
          <br />
          <p>If you did not request a password change, please feel free to ignore this message.</p>
          <p>If you have any comments or questions don’t hesitate to reach us at <a href="mailto:support.agprop.in"> Support </a></p>

      <p style="margin:0">Regards,</p>
      <p style="margin:0">AGPROP</p>
  </div>
  </font>
  `,
  };
}
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
    // const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${Token}`;
    // const response = await fetch(url, {
    //   method: "POST",
    // });
    // const data = await response.json();
    const oldUser = await Registrations.findOne({
      $or: [{ Email }, { Phone }, { Roll }],
    });

    if (oldUser) {
      return res.status(409).json({ message: "User already exists" });
    } else {
      // if (data.success == true) {
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

        res.status(201).json("You have been registered successfully");
      // } else {
      //   res
      //     .status(421)
      //     .json({ message: "Please verify that you are not a robot" });
      // }
    }
    // await Registrations.create({
    //   Name,
    //   Gender,
    //   Branch,
    //   Roll,
    //   Email,
    //   Hostel,
    //   Year,
    //   Phone,
    // });
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
