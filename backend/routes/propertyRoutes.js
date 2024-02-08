const express = require("express");
const propertyController = require("../controller/propertyController");

const {
  AdminAuthenticateToken,
  authenticateToken,
} = require("../middleware/authenticateToken");

const router = express.Router();
 
router.post("/create", (req, res) => {
  propertyController.createProperty(req, res);  
});

router.get("/list", (req, res) => {
    propertyController.listProperty(req, res);  
  });

router.get("/:id", (req, res) => {
    propertyController.getPropertyById(req, res)
})

module.exports = router 