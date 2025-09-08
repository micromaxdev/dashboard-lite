const mongoose = require("mongoose");

const globalVariablesSchema = mongoose.Schema({
  num: {
    type: String,
  },
  lastUpdate: {
    type: String,
  },
});

module.exports = mongoose.model("GlobalVariables", globalVariablesSchema);
