import Registrations from "../models/student.js";
import dotenv from "dotenv";
dotenv.config();
const PASSWORD = process.env.EMAIL_PASSWORD;

export const create = async (req, res) => {
  try {
    const { Name, Branch, Roll, Email, Phone, Year } = req.body;
    const oldUser = await Registrations.findOne({ Email, Phone });
    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      const result = await Registrations.create({
        Name,
        Branch,
        Roll,
        Email,
        Phone,
        Year,
      });
    }
    res.status(201).json("You have been registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const find = async (req, res) => {
  try {
    if (PASSWORD) {
      const result = await Registrations.find();
      res.status(200).json(result);
    } else {
      res.status(400).json({ message: "Please provide a password" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
