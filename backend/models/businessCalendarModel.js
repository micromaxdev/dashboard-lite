const mongoose = require("mongoose");

const businessCalendarSchema = mongoose.Schema({
  title: {
    type: String,
  },
  dueDate: {
    type: String,
  },
  assignedTo: {
    type: [String],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "User",
  },
  repeat: {
    type: String,
  },
  startingDate: {
    type: String,
  },
  endingDate: {
    type: String,
  },
  endingDates: {
    type: [String],
  },
  notes: {
    type: String,
  },
  status: {
    type: String,
  },
  statusNotes: {
    type: String,
  },
  completedBy: {
    type: [],
  },
});

module.exports = mongoose.model("businessCalendar", businessCalendarSchema);
