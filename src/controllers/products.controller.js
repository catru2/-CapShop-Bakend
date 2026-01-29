const Products = require("../models/product.model");

async function list(req, res) {
  try {
    const q = (req.query.q || "").trim();
    const categoryId = Number(req.query.categoryId) || null;

    const rows = await Products.getAll({ q: q || null, categoryId });
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products" });
  }
}

async function getOne(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: "invalid id" });

    const product = await Products.getById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching product" });
  }
}

async function create(req, res) {
  try {
    const { name, description, price, stock, image_url, category_id } = req.body || {};
    if (!name || !category_id) return res.status(400).json({ message: "name and category_id required" });

    const payload = {
      name,
      description: description || null,
      price: Number(price ?? 0),
      stock: Number(stock ?? 0),
      image_url: image_url || null,
      category_id: Number(category_id),
      user_id: req.user.id,
    };

    const created = await Products.create(payload);
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating product" });
  }
}

async function update(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: "invalid id" });

    const { name, description, price, stock, image_url, category_id } = req.body || {};
    if (!name || !category_id) return res.status(400).json({ message: "name and category_id required" });

    const payload = {
      name,
      description: description || null,
      price: Number(price ?? 0),
      stock: Number(stock ?? 0),
      image_url: image_url || null,
      category_id: Number(category_id),
    };

    const affected = await Products.update(id, payload);
    if (affected === 0) return res.status(404).json({ message: "Product not found" });

    res.json({ id, ...payload });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating product" });
  }
}

async function remove(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: "invalid id" });

    const affected = await Products.remove(id);
    if (affected === 0) return res.status(404).json({ message: "Product not found" });

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting product" });
  }
}

module.exports = { list, getOne, create, update, remove };
