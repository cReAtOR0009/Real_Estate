const express = require("express");
const userController = require("../controller/userController");
const {
  authenticateToken,
  AdminAuthenticateToken,
} = require("../middleware/authenticateToken");

const router = express.Router();

router.post("/signup", (req, res) => {
  userController.signup(req, res);
});

router.post("/sendVerificationEmail", (req, res) => {
  userController.sendVerificationEmail(req, res);
});

router.get("/verify/:token", (req, res) => {
  userController.verifyEmail(req, res);
});

router.post("/sendPasswordtoemail", (req, res) => {
    userController.sendforgotPasswordEmail(req, res);
  });
  
  router.get("/verifyForgotPassword/:token", (req, res) => {
    userController.verifyForgotEmailPassword(req, res);
  });

router.post("/login", (req, res) => {
  userController.login(req, res);
});

router.post("/updateuser/:id", authenticateToken, (req, res) => {
  userController.updateuser(req, res);
});

// router.get("/getUserbyid/:id",  (req, res) => { 
//   userController.getUserbyid(req, res);
// });
module.exports = router;
