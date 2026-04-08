const express = require("express");
const router = express.Router();

const { getUsers } = require("./controller");

// route: GET /api/users
router.get("/users", getUsers);

module.exports = router;
