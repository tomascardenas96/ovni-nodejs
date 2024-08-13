import express from "express";
import food from "./routes/food.routes.js";

const app = express();

app.use(express.json());
app.use("/food", food);

app.listen(3000, () => {
  console.log("Listen on port 3000 🚀");
});
