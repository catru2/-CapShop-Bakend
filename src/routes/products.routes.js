const router = require("express").Router();
const Products = require("../controllers/products.controller");
const { authRequired, adminOnly } = require("../middlewares/auth.middleware");

router.get("/", Products.list);
router.get("/:id", Products.getOne);
router.post("/", authRequired, adminOnly, Products.create);
router.put("/:id", authRequired, adminOnly, Products.update);
router.delete("/:id", authRequired, adminOnly, Products.remove);

module.exports = router;
