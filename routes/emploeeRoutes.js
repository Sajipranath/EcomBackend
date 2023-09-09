const express = require("express");
const router = express.Router();
const {
    addEmployee,
    getEmployeeById,
    getEmployee
 
} = require("../controller/employee");

router.get("/", getEmployee);
router.get("/:id", getEmployeeById);
router.post("/add", addEmployee);

module.exports = router;
