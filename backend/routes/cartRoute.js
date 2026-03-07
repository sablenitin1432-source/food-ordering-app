import express from "express"
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js"
import authMidddleware from "../middleware/auth.js";


const cartRoute = express.Router();

cartRoute.post("/add",authMidddleware,addToCart)
cartRoute.post ("/remove",authMidddleware,removeFromCart)
cartRoute.post("/get",authMidddleware,getCart)


export default cartRoute;