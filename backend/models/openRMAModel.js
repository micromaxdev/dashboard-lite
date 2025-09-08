const mongoose = require("mongoose");

const openRMASchema = new mongoose.Schema(
  {
    rmaNo: String,
    company: String,
    technician: String,
    rmaDate: String,
    goodsArriveDate: String,
    dateShipToSupp: String,
    dateReturnsFromSupp: String,
    dateShipToCust: String,
    rmaProcessDuration: String,
    partNo: String,
    serialNo: String,
    reasonForReturn: String,
    investigationNote: String,
    proposeAction: String,
    underWarranty: String,
    itemStatus: String,
  },
  {
    timestamps: true,
    collection: "openrmas",
  }
);

module.exports = mongoose.model("OpenRMA", openRMASchema);
