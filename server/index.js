import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/routes.js";
import ExpressMongoSanitize from "express-mongo-sanitize";

dotenv.config();

const origin = process.env.ORIGIN;
const uri = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;
// const corsOptions = {
//   origin: origin,
//   credentials: true,
//   optionSuccessStatus: 200,
// };
const app = express();

// app.use(cors(corsOptions));
app.use(ExpressMongoSanitize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
