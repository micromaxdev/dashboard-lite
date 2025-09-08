const mongoose = require("mongoose");

const openServiceJobsSchema = mongoose.Schema({
  customerCode: {
    type: String,
    required: [false, "Please add a text value"],
  },
  customerName: {
    type: String,
    required: [false, "Please add a text value"],
  },
  call_id: {
    type: String,
    required: [false, "Please add a text value"],
  },
  serviceCallSubject: {
    type: String,
    required: [false, "Please add a text value"],
  },
  jobStatus: {
    type: String,
    required: [false, "Please add a text value"],
  },
  callType: {
    type: String,
    required: [false, "Please add a text value"],
  },
  salesEmployeeName: {
    type: String,
    required: [false, "Please add a text value"],
  },
  quotedAmount: {
    type: String,
    required: [false, "Please add a text value"],
  },
  totalInvoicedAmount: {
    type: String,
    required: [false, "Please add a text value"],
  },
  dateCreated: {
    type: String,
    required: [false, "Please add a text value"],
  },
  dueDate: {
    type: String,
    required: [false, "Please add a text value"],
  },
  managedBy: {
    type: String,
    required: [false, "Please add a text value"],
  },
  State: {
    type: String,
    required: [false, "Please add a text value"],
  },
  amountToBeInvoiced: {
    type: String,
    required: [false, "Please add a text value"],
  },
});

module.exports = mongoose.model("OpenServiceJobs", openServiceJobsSchema);
