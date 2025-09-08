const mongoose = require("mongoose");

const supplierNotesSchema = mongoose.Schema({
  supplierCode: {
    type: String,
    required: false,
  },
  supplierName: {
    type: String,
    required: false,
  },
  supplierNotes: {
    type: String,
    required: false,
  },
  brandId: {
    type: String,
    required: false,
  },
  accountManager: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("SupplierNotes", supplierNotesSchema);
