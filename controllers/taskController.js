const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

const today = new Date();
exports.createTask = async (req, res) => {
  const newTask = {
    description: "New task built by createTask",
    end_date: "2020-02-01",
    end_days_to_election: 76,
    election_name: "Sample Election",
    election_id: 1,
    created_at: today,
    updated_at: today,
    status: "Not Started",
    notifications_on: true,
    code: "ef-55-2355"
  };

  const task = await new Task(newTask).save();
  res.json({ message: "success" });
};
