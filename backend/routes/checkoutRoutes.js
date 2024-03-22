const express = require("express");
const checkoutController = require("../controller/checkoutController");

const {
  AdminAuthenticateToken,
  authenticateToken,
} = require("../middleware/authenticateToken");

const router = express.Router();

router.post("/", (req, res) => {
    checkoutController.checkout(req, res)
})

router.get("/successfull", (req, res) => {
  checkoutController.checkoutSuccesfull(req, res)
})

router.get("/failed", (req, res) => {
  checkoutController.checkoutFailed(req, res)
})

module.exports = router