import express from "express";
import { create, find } from "../controllers/controller.js";
const routes = express.Router();

routes.post("/users", create);
routes.get("/users", find);

export default routes;
