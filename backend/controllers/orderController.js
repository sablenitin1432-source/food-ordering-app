import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// placing user order for frontend
const placeOrder = async (req, res) => {
  try {
    // userId authMiddleware kadun milto
    const newOrder = new orderModel({
      userId: req.userId || "demoUser123",
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();

    // clear user cart
    await userModel.findByIdAndUpdate(req.userId || "demoUser123", {
      cartData: {},
    });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// user order for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, verifyOrder, userOrders };
