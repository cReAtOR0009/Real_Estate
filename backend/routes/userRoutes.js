const express = require("express");
const userController = require("../controller/userController")
const {authenticateToken, AdminAuthenticateToken} = require("../middleware/authenticateToken")

const router = express.Router()

router.post("/signup", (req, res) => {

    userController.signup(req, res)
})

router.post("/login", (req, res) => {
    userController.login(req, res)
})

router.post("/updateuser/:id", authenticateToken, (req, res) => {
    
    userController.updateuser(req, res)
})
module.exports = router