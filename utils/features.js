import mongoose from "mongoose";
import jwt from "jsonwebtoken";

function connectDb(url) {
  mongoose
    .connect(url)
    .then((data) => {
      console.log(`Connected to the database ${data.connection.host}`);
    })
    .catch((error) => {
      console.error("Failed to connect to the database:", error);
    });
}

const sendToken = (res, user, statusCode, message) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  return res
    .status(statusCode)
    .cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
      httpOnly: true,
      secure: true,
    })
    .json({ success: true, token, message, user });
};

export { connectDb, sendToken };
