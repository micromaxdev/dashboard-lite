const mongoose = require("mongoose");

const arOpenItemsSchema = new mongoose.Schema(
  {
    customerCode: String,
    customerName: String,
    transactionType: String,
    docNo: String,
    docDate: String,
    postingDate: String,
    dueDate: String,
    customerRefNumber: String,
    currency: String,
    amount: Number,
    balanceDue: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("ArOpenItems", arOpenItemsSchema);
