const mongoose = require("mongoose");

const customersSchema = mongoose.Schema({
  customerCode: {
    type: String,
    required: [false, "Please add a text value"],
  },
  customerName: {
    type: String,
    required: [false, "Please add a text value"],
  },
  customerCurrency: {
    type: String,
    required: [false, "Please add a text value"],
  },
  salesEmployeeName: {
    type: String,
    required: [false, "Please add a text value"],
  },
  billingAddress: {
    type: String,
    required: [false, "Please add a text value"],
  },
  paymentTerm: {
    type: String,
    required: [false, "Please add a text value"],
  },
  shippingAddress: {
    type: String,
    required: [false, "Please add a text value"],
  },
  creationDate: {
    type: String,
    required: [false, "Please add a text value"],
  },
  firstInvoiceDate: {
    type: String,
    required: [false, "Please add a text value"],
  },
  lastInvoiceDate: {
    type: String,
    required: [false, "Please add a text value"],
  },
});

module.exports = mongoose.model("Customers", customersSchema);
