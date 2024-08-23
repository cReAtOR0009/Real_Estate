const express = require("express");
const propertyController = require("../controller/propertyController");

const {
  AdminAuthenticateToken,
  authenticateToken,
} = require("../middleware/authenticateToken");

const router = express.Router();
 
router.post("/add", (req, res) => {
  propertyController.createProperty(req, res);  
});

router.get("/list", (req, res) => {
    propertyController.listProperty(req, res);  
  });

router.get("/:id", (req, res) => {
    propertyController.getPropertyById(req, res)
})

router.get("/delete/:id", (req, res) => {
    propertyController.deletePropertyById(req, res)
})
 
router.get("/search/search", (req, res) => {
  propertyController.searchProperty(req, res)
})

module.exports = router  