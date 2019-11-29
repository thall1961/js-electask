require("dotenv").config({ path: __dirname + "/../variables.env" });

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const Task = require("../models/Task");

const today = new Date();
const tasks = [
  {
    description: "Take polling places down after election",
    end_date: "2020-03-03",
    end_days_to_election: 45,
    election_name: "Sample Election",
    election_id: 1,
    created_at: today,
    updated_at: today,
    status: "Not Started",
    notifications_on: true,
    code: "ef-44-011"
  },
  {
    description: "Open new drawer to see what's in there",
    end_date: "2020-04-03",
    end_days_to_election: 15,
    election_name: "Sample Election",
    election_id: 1,
    created_at: today,
    updated_at: today,
    status: "Not Started",
    notifications_on: true,
    code: "ef-922-000"
  },
  {
    description:
      "Going with what customers already know can be a really great thing.",
    begin_date: "2020-04-01",
    end_date: "2020-04-05",
    begin_days_to_election: 11,
    end_days_to_election: 15,
    election_name: "Sample Election",
    election_id: 1,
    created_at: today,
    updated_at: today,
    status: "In Progress",
    notifications_on: true,
    code: "pi-022-910"
  }
];

async function loadData() {
  try {
    await Task.insertMany(tasks);
    console.log("Success");
    process.exit();
  } catch (e) {
    console.log(`Error: ${e.message}`);
    process.exit();
  }
}

async function deleteData() {
  await Task.remove();
  console.log("Tasks removed");
  process.exit();
}

if (process.argv.includes("--delete")) {
  deleteData();
} else {
  loadData();
}
