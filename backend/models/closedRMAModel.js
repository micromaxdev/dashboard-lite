const mongoose = require("mongoose");

const closedRMASchema = new mongoose.Schema(
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
    rmaResolvedToClientSatisfaction: String,
    reasonForUnsatisfaction: String,
  },
  {
    timestamps: true,
    collection: "closedrmas",
  }
);

module.exports = mongoose.model("ClosedRMA", closedRMASchema);
