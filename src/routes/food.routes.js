import express from "express";
import {
  createNewFood,
  getAllFoods,
  getFoodById,
} from "../controller/food.controller.js";

const food = express.Router();

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log("Time: ", Date.now());
  next();
};

food.use(timeLog);

food.get("/", getAllFoods);
food.get("/:id", getFoodById);
food.post("/", createNewFood);

export default food;
