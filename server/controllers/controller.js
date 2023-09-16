import Registrations from "../models/student.js";
import dotenv from "dotenv";
import Joi from "joi";
import CryptoJS from "crypto-js";
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
  Domain: Joi.string().required(),
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

    const { Name, Gender, Branch, Roll, Email, Phone, Domain, Hostel, Token } =
      decryptedDataJSON;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${recapchaSecretKey}&response=${Token}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Accept-Encoding": "application/json",
      },
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
          Domain,
          Phone,
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
