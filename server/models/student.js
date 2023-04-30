import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Year: { type: String, required: true },
  Roll: { type: String, required: true },
  Email: { type: String, required: true },
  Phone: { type: String, required: true },
  Branch: { type: String, required: true },
});

const Registrations=mongoose.model("Registration",studentSchema);
export default Registrations;