const mongoose = require("mongoose");

const jobLogSchema = mongoose.Schema({
  inputDate: {
    type: String,
  },
  salesEmployee: {
    type: String,
  },
  custCode: {
    type: String,
  },
  customerName: {
    type: String,
  },
  callId: {
    type: String,
  },
  subject: {
    type: String,
  },
  jobType: {
    type: String,
  },
  quotedAmount: {
    type: String,
  },
});

module.exports = mongoose.model("JobLog", jobLogSchema);
