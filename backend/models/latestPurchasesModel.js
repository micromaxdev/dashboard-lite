const mongoose = require("mongoose");

const latestPurchasesSchema = mongoose.Schema({
  poDate: {
    type: String,
  },
  poNum: {
    type: String,
  },
  poItem: {
    type: String,
  },
  partCode: {
    type: String,
  },
  description: {
    type: String,
  },
  currency: {
    type: String,
  },
  supplierCode: {
    type: String,
  },
  qty: {
    type: String,
  },
  supplierName: {
    type: String,
  },
  price: {
    type: String,
  },
});

module.exports = mongoose.model("LatestPurchases", latestPurchasesSchema);
