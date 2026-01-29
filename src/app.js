const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const categoriesRoutes = require("./routes/categories.routes");
const productsRoutes = require("./routes/products.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ ok: true, name: "CapShop Backend API" }));

app.use("/auth", authRoutes);
app.use("/categories", categoriesRoutes);
app.use("/products", productsRoutes);

module.exports = app;
