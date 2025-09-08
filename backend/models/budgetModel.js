const mongoose = require("mongoose");

const budgetSchema = mongoose.Schema({
  salesTeam: {
    type: String,
    required: false,
  },
  salesBaseLine: {
    type: String,
  },
  gpBaseLine: {
    type: String,
  },
  gPPercent: {
    type: String,
  },
  salesBudget: {
    type: String,
  },
  gpBudget: {
    type: String,
  },
  year1: {
    type: String,
  },
  year2: {
    type: String,
  },
  additionalCOGS: {
    type: String,
  },
});

module.exports = mongoose.model("Budget", budgetSchema);
