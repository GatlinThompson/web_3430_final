import express from "express";
import { createAdmin } from "../controllers/createAdmin.js";

let router = express.Router();

export const configureRoutes = (app) => {
  app.get("/api/createAdmin", createAdmin);
  app.use("/", router);
};

//module.exports = { configureRoutes };
