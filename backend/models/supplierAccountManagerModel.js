const mongoose = require("mongoose");

const supplierAccountManagerSchema = mongoose.Schema(
  {
    supplierCode: {
      type: String,
      required: true,
      unique: true,
    },
    supplierName: {
      type: String,
      required: true,
    },
    "Brand ID": {
      type: String,
      required: false,
    },
    "Account manager": {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "SupplierAccountManager",
  supplierAccountManagerSchema
);
