import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  console.log("TOKEN BACKEND:", token);

  if (!token) {
    return res.json({ success: false, message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.json({ success: false, message: "Invalid token" });
  }
};

export default authMiddleware;
