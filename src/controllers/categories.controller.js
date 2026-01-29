const Categories = require("../models/category.model");

async function list(req, res) {
  try {
    const rows = await Categories.getAll();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching categories" });
  }
}

async function create(req, res) {
  try {
    const { name } = req.body || {};
    if (!name) return res.status(400).json({ message: "name required" });

    const created = await Categories.create(name);
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    if (err.code === "ER_DUP_ENTRY") return res.status(409).json({ message: "Category already exists" });
    res.status(500).json({ message: "Error creating category" });
  }
}

async function update(req, res) {
  try {
    const id = Number(req.params.id);
    const { name } = req.body || {};
    if (!id) return res.status(400).json({ message: "invalid id" });
    if (!name) return res.status(400).json({ message: "name required" });

    const affected = await Categories.update(id, name);
    if (affected === 0) return res.status(404).json({ message: "Category not found" });

    res.json({ id, name });
  } catch (err) {
    console.error(err);
    if (err.code === "ER_DUP_ENTRY") return res.status(409).json({ message: "Category already exists" });
    res.status(500).json({ message: "Error updating category" });
  }
}

async function remove(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: "invalid id" });

    const affected = await Categories.remove(id);
    if (affected === 0) return res.status(404).json({ message: "Category not found" });

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting category" });
  }
}

module.exports = { list, create, update, remove };
