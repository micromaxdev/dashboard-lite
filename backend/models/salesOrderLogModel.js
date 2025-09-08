const mongoose = require("mongoose");

const salesOrderLogSchema = mongoose.Schema({
  salesEmployee: {
    type: String,
  },
  dateCreated: {
    type: String,
  },
  soNumber: {
    type: String,
  },
  customerCode: {
    type: String,
  },
  customerName: {
    type: String,
  },
  custOrderNum: {
    type: String,
  },
  orderAmountInAUD: {
    type: String,
  },
  orderAmountInUSD: {
    type: String,
  },
});

module.exports = mongoose.model("SalesOrderLog", salesOrderLogSchema);
