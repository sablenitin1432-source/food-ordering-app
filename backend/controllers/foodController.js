import foodModel from "../models/foodModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// add food item

const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image not uploaded" });
    }

    // 🔥 Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    console.log("CLOUDINARY URL:", result.secure_url);

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      category: req.body.category,
      image: result.secure_url, // ✅ correct URL
    });

    await food.save();

    res.status(201).json({ success: true, message: "Food Added", food });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (!food) {
      return res.json({ success: false, message: "Food item not found" });
    }
    // optional: Cloudinary delete pan karu shakto
    await foodModel.findByIdAndDelete(req.body.id);

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, removeFood };
