import Registrations from "../models/student.js";
import dotenv from "dotenv";
import Joi from "joi";

dotenv.config();
const PASSWORD = process.env.EMAIL_PASSWORD;

const registrationSchema = Joi.object({
  Name: Joi.string().required(),
  Gender: Joi.string().required(),
  Branch: Joi.string().required(),
  Roll: Joi.string().required(),
  Email: Joi.string().email().required(),
  Hostel: Joi.string().required(),
  Domain: Joi.string().required(),
  Phone: Joi.string().length(10).required(),
});

export const create = async (req, res) => {
  try {
    const { error } = registrationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { Name, Gender, Branch, Roll, Email, Phone, Domain, Hostel } =
      req.body;
    const oldUser = await Registrations.findOne({
      $or: [{ Email }, { Phone }, { Roll }],
    });

    if (oldUser) {
      return res.status(409).json({ message: "User already exists" });
    } else {
      const result = await Registrations.create({
        Name,
        Gender,
        Branch,
        Roll,
        Email,
        Hostel,
        Domain,
        Phone,
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
