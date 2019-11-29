const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.get("/api/tasks", taskController.getTasks);
router.post("/api/tasks/new", taskController.createTask);

module.exports = router;
