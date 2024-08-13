import pool from "../db/db.js";
import { v4 as uuidv4 } from "uuid";

export async function getAllFoods(__req, res) {
  try {
    const [rows] = await pool.query("SELECT * FROM ovni.food");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getFoodById(req, res) {
  try {
    const param = Number(req.params.id);

    if (isNaN(param) || param < 0) {
      return res.status(400).json({ message: "Invalid food ID" });
    }

    const [rows] = await pool.query(
      "SELECT * FROM ovni.food WHERE foodId = ?",
      [param]
    );

    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createNewFood(req, res) {
  try {
    const foodId = uuidv4().substring(0, 8);
    const { title, price, ...unexpected } = req.body;
    const parsedPrice = Number(req.body.price);

    if (!title || typeof title !== "string") {
      return res.status(404).json({ message: "Title must be a string" });
    }

    if (!price || isNaN(parsedPrice)) {
      return res.status(404).json({ message: "Price must be a number" });
    }

    if (Object.keys(unexpected).length > 0) {
      return res
        .status(400)
        .json({ error: "Unexpected fields provided", unexpected });
    }

    const rows = await pool.query(
      "INSERT INTO ovni.food(foodId, title, price) VALUES(?, ?, ?)",
      [foodId, title, price]
    );

    return res
      .status(201)
      .json({ message: "Food created successfully", foodId });
  } catch (error) {
    console.error("Error creating new food", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
