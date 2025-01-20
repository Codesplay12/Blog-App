const express = require("express");
const { getALLUsers, registerController, loginController } = require("../controllers/userControllers");

const router = express.Router();

//GET ALL USER || GET
router.get("/all-users",getALLUsers)


//CREATE USER  || POST

router.post("/register",registerController)


//LOGIN USER || POST

router.post("/login",loginController)
module.exports = router;