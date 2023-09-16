import express from "express";
import { create, find,verifyRecapcha } from "../controllers/controller.js";
import limiter from "../middlewares/rate-limiter.js";
const routes = express.Router();

routes.post("/users", limiter,create);
routes.get("/users", find);
routes.post("/recaptcha", verifyRecapcha);

export default routes;
