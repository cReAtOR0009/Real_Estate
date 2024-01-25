const express = require("express");
const userController = require("../controller/userController")

const router = express.Router()

router.post("/signup", (req, res) => {
    userController.signup(req.body, req, res)
})

module.exports = router