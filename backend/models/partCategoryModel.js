const mongoose = require("mongoose");

const partCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name for the category"],
  },
  parts: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("PartCategory", partCategorySchema);
