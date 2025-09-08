const mongoose = require("mongoose");

const ososSchema = mongoose.Schema({
  soNumber: {
    type: String,
    required: [false, "Please add a text value"],
  },
  customerOrderNo: {
    type: String,
    required: [false, "Please add a text value"],
  },
  salesEmployee: {
    type: String,
    required: [false, "Please add a text value"],
  },
  customerCode: {
    type: String,
    required: [false, "Please add a text value"],
  },
  customerName: {
    type: String,
    required: [false, "Please add a text value"],
  },
  partCode: {
    type: String,
    required: [false, "Please add a text value"],
  },
  description: {
    type: String,
    required: [false, "Please add a text value"],
  },
  outstandingQty: {
    type: String,
    required: [false, "Please add a text value"],
  },
  dueDate: {
    type: String,
    required: [false, "Please add a text value"],
  },
  outstandingValue: {
    type: String,
    required: [false, "Please add a text value"],
  },
  "outstandingValue(LC)": {
    type: String,
    required: [false, "Please add a text value"],
  },
  "outstandingValue(FC)": {
    type: String,
    required: [false, "Please add a text value"],
  },
  stockQty: {
    type: String,
    required: [false, "Please add a text value"],
  },
});

module.exports = mongoose.model("Osos", ososSchema);
