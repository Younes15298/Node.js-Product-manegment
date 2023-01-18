const express = require("express");
const router = express.Router();

const userController =require("../controllers/user");


router.post("/signup",userController.create_user);
router.post("/login",userController.login);
router.delete("/:usertId",userController.delete_user );

module.exports = router;
