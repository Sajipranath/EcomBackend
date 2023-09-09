require("dotenv").config();
const express = require("express");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const employeeRoutes = require("./routes/emploeeRoutes");
const noticeRoutes = require("./routes/noticeRoute");
const promotion = require("./routes/promotion.routes");
const suggestions = require("./routes/suggestions")

const { connectDB } = require("./config/db");
const cors = require("cors");

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});

app.use("/api/products", productRoutes);
app.use("/api/notice", noticeRoutes);
app.use("/api/promotion", promotion);
app.use("/api/suggestions", suggestions);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/employee", employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
