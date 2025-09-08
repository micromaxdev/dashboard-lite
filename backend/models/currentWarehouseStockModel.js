const mongoose = require("mongoose");

const currentWarehouseStockSchema = mongoose.Schema({
  itemCode: {
    type: String,
    required: [false, "Please add a text value"],
  },
  itemName: {
    type: String,
    required: [false, "Please add a text value"],
  },
  longDescription: {
    type: String,
  },
  totalStock: {
    type: Number,
    required: [false, "Please add a text value"],
  },
  qtyInWhs01: {
    type: Number,
    required: [false, "Please add a text value"],
  },
  qtyInDemoWhs: {
    type: Number,
    required: [false, "Please add a text value"],
  },
  qtyInTS01Whs: {
    type: Number,
    required: [false, "Please add a text value"],
  },
  qtyInNSW01Whs: {
    type: Number,
    required: [false, "Please add a text value"],
  },
  qtyInQLD01Whs: {
    type: Number,
    required: [false, "Please add a text value"],
  },
  qtyInVIC01Whs: {
    type: Number,
    required: [false, "Please add a text value"],
  },
  qtyInWA01Whs: {
    type: Number,
    required: [false, "Please add a text value"],
  },
});

module.exports = mongoose.model(
  "CurrentWarehouseStock",
  currentWarehouseStockSchema
);
