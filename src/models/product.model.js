const db = require("../configs/db")

async function getAll({q, categoryId}) {
    let sql = `
    SELECT p.*, c.name AS category_name
    FROM products p 
    JOIN categories c ON c.id = p.category_id
    WHERE 1=1
    `;
    const params = [];

    if (q){
        sql += " AND p.name LIKE ?";
        params.push(`%${q}%`);
    }

    if (categoryId) {
        sql += " AND p.category_id = ?";
        params.push(categoryId);
    }

    sql += " ORDER BY p.id DESC";
    
    const [rows] = await db.query(sql,params);
    return rows;
}

async function getById(id) {
    const [rows] = await db.query(
    `SELECT p.*, c.name AS category_name
    FROM products p
    JOIN categories c ON c.id = p.category_id
    WHERE p.id = ? LIMIT 1`,
    [id]
);

return rows[0] || null;
      
}

async function create(payload) {
    const {name, description, price, stock, image_url, category_id, user_id} = payload;

    const [result] = await db.query(
        `INSERT INTO products (name, description, price, stock, image_url, category_id, user_id)
        VALUES (?, ?, ?, ?, ?, ?, ? )`,
        [name,description || null, price, stock, image_url || null, category_id, user_id] 
    );

    return { id: result.insertId, ...payload };
    
}


async function update(id,payload) {
    const {name, description, price, stock, image_url, category_id} = payload;

    const [result] = await db.query(
        `UPDATE products
        SET name=?, description=?, price=?, stock=?, image_url=?, category_id=?
        WHERE id=? `,
        [name,description || null, price, stock, image_url || null, category_id, id ]
    );

    return result.affectedRows;
    
}


async function remove(id) {
    const [result] = await db.query("DELETE FROM products WHERE id = ?", [id]);
    return result.affectedRows;
}

module.exports = {getAll, getById, create, update, remove };