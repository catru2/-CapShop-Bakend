const db = require("../configs/db");

async function getAll() {
    const [rows] = await db.query("SELECT id, name FROM categories ORDER BY name ASC",);
    return rows;    
}


async function create(name) {
    const [result] = await db.query("INSERT INTO categories (name) VALUES (?)",[name]);
    return {id: result.inserId, name };
    
}

async function update(id, name) {
    const [result] = await db.query("UPDATE categories SET name = ? WHERE id = ?", [name,id]);
    return result.affectedRows;
    
}

async function remove(id) {
    const [result] = await db.query("DELETE FROM categories WHERE id = ?", [id]);
    return result.affectedRows;
    
}

module.exports = {getAll, create, update, remove };