const db = require("../configs/db");

async function findByEmail(email) {
  const [rows] = await db.query(
    "SELECT id, name, email, password, role FROM users WHERE email = ? LIMIT 1",
    [email]
  );
  return rows[0] || null;
}

async function updatePassword(id, hashedPassword) {
  await db.query(
    "UPDATE users SET password = ? WHERE id = ?",
    [hashedPassword, id]
  );
}

module.exports = { findByEmail, updatePassword };
