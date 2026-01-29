const router = require("express").Router();
const Categories = require("../controllers/categories.controller");
const { authRequired, adminOnly } = require("../middlewares/auth.middleware");

router.get("/", Categories.list);
router.post("/", authRequired, adminOnly, Categories.create);
router.put("/:id", authRequired, adminOnly, Categories.update);
router.delete("/:id", authRequired, adminOnly, Categories.remove);

module.exports = router;
