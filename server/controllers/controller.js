import Registrations from "../models/student.js";

export const create = async (req, res) => {
  const { Name, Branch, Roll, Email, Phone, Year } = req.body;
  const result = await Registrations.create({
    Name,
    Branch,
    Roll,
    Email,
    Phone,
    Year,
  });
  res.status(201).json(result);
};

export const find = async (req, res) => {
  try {
    const result = await Registrations.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
