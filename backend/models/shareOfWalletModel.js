const mongoose = require("mongoose");

const shareOfWalletSchema = mongoose.Schema({
  customerCode: {
    type: String,
  },
  customerName: {
    type: String,
  },
  salesEmployee: {
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
  unitPrice: {
    type: String,
  },
  qty: {
    type: String,
  },
  discount: {
    type: String,
  },
  foreignSalesAmount: {
    type: String,
  },
  audSalesAmount: {
    type: String,
  },
  invoiceCRNote: {
    type: String,
  },
  invoiceDate: {
    type: String,
  },
  customerOrderNo: {
    type: String,
  },
  courier: {
    type: String,
  },
  consignmentNoteNo: {
    type: String,
  },
  COGS: {
    type: String,
  },
  salesType: {
    type: String,
  },
  sOW: {
    type: Boolean,
  },
  expiryDate: {
    type: String,
  },
  overrideExpiryDate: {
    type: String,
  },
});

module.exports = mongoose.model("ShareOfWallet", shareOfWalletSchema);
