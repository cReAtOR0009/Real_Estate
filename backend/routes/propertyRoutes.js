const express = require("express");
const productControllers = require("../controller/productController");

const {
  AdminAuthenticateToken,
  authenticateToken,
} = require("../middleware/authenticateToken");

const router = express.Router();

router.post("/create", (req, res) => {
  productControllers.createProduct(req, res);  
});

module.exports = router