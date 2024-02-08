const express = require("express");
const checkoutController = require("../controller/checkoutController");

const {
  AdminAuthenticateToken,
  authenticateToken,
} = require("../middleware/authenticateToken");

const router = express.Router();

router.post("/checkout", (req, res) => {
    checkoutController.checkout(req, res)
})

module.exports = router