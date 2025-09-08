const mongoose = require('mongoose')

const partSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: false,
    },
    itemNo: {
      type: String,
      required: [false, 'Please add a text value'],
    },
  }
)

module.exports = mongoose.model('Part', partSchema)
