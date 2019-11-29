const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
    required: "Please enter a description"
  },
  end_date: {
    type: Date
  },
  end_days_to_election: {
    type: Number,
    required: "Please enter the number of days from the election day."
  },
  election_name: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    trim: true,
    default: "Not Completed"
  },
  notifications_on: {
    type: Boolean,
    default: true
  }
});

// find the election and get the name

module.exports = mongoose.model("Task", taskSchema);
