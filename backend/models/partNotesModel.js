const mongoose = require("mongoose");

const partNotesSchema = mongoose.Schema({
  partCode: {
    type: String,
    required: [false, "Please add a text value"],
  },
  description: {
    type: String,
    required: [false, "Please add a text value"],
  },
  longDescription: {
    type: String,
    required: [false, "Please add a text value"],
  },
  category: {
    type: String,
    required: [false, "Please add a text value"],
  },
  subCategory: {
    type: String,
    required: [false, "Please add a text value"],
  },
  brand: {
    type: String,
    required: [false, "Please add a text value"],
  },
  stockOnHand: {
    type: String,
    required: [false, "Please add a text value"],
  },
  inventoryUOM: {
    type: String,
  },
  committed: {
    type: String,
  },
  ordered: {
    type: String,
  },
  available: {
    type: String,
  },
  storageLocation: {
    type: String,
  },
  procurementMethod: {
    type: String,
  },
});

module.exports = mongoose.model("PartNotes", partNotesSchema);
