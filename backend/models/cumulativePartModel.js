const mongoose = require("mongoose");

// Define the schema
const cumulativePartSchema = mongoose.Schema(
  {
    itemNo: {
      type: String,
      required: [true, "Item number is required"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    supplier: {
      type: String,
    },
    systemDate: {
      type: String,
    },
    postingDate: {
      type: String,
    },
    document: {
      type: String,
    },
    warehouse: {
      type: String,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    cost: {
      type: Number,
      default: 0,
    },
    transactionValue: {
      type: Number,
      default: 0,
    },
    cumulativeQuantity: {
      type: Number,
      default: 0,
    },
    cumulativeValue: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
    },
    rate: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CumulativePart", cumulativePartSchema);
