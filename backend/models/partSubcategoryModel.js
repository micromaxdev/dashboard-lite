const mongoose = require("mongoose");

const partSubcategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name for the subcategory"],
  },
  parts: [
    {
      type: String,
    },
  ],
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PartCategory",
    required: [true, "Please add a parent category"],
  },
});

module.exports = mongoose.model("PartSubcategory", partSubcategorySchema);
