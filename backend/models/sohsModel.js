const mongoose = require('mongoose')

const sohsSchema = mongoose.Schema(
  {
    itemNo: {
      type: String,
      required: [false, 'Please add a text value'],
    },
    itemDescription: {
      type: String,
      required: [false, 'Please add a text value'],
    },
    inStock: {
      type: String,
      required: [false, 'Please add a text value'],
    },
    commited: {
      type: String,
      required: [false, 'Please add a text value'],
    },
    ordered: {
      type: String,
      required: [false, 'Please add a text value'],
    },
    available: {
      type: String,
      required: [false, 'Please add a text value'],
    },
    inventoryUoM: {
      type: String,
      required: [false, 'Please add a text value'],
    },
  }
)

module.exports = mongoose.model('Sohs', sohsSchema)
