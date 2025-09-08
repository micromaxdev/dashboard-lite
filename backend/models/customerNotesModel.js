const mongoose = require('mongoose')

const customerNotesSchema = mongoose.Schema(
  {
    customerCode: {
      type: String,
      required: [false, 'Please add a text value'],
    },
    customerName: {
      type: String,
      required: [false, 'Please add a text value'],
    },
    customerNotes: {
      type: String,
      required: [false, 'Please add a text value'],
    },
  }
)

module.exports = mongoose.model('CustomerNotes', customerNotesSchema)
