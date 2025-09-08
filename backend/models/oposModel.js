const mongoose = require('mongoose')

const oposSchema = mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: false,
    //   ref: 'User',
    // },
    image: {
      type: String,
      required: false,
    },
    itemNo: {
      type: String,
      required: [false, 'Please add a text value'],
    },
    itemDescription: {
      type: String,
      required: [false, 'Please add a text value'],
    },
    purchaseOrder: {
      type: String,
      required: [false, 'Please add a text value'],
    },
    rowNumber: {
      type: String,
      required: [false, 'Please add a text value'],
    },
    dueDate: {
      type: String,
      required: [false, 'Please add a text value'],
    },
    supplierCode: {
      type: String,
      required: [false, 'Please add a text value'],
    },
    supplierName: {
      type: String,
      required: [false, 'Please add a text value'],
    },
    outstandingQty: {
      type: String,
      required: [false, 'Please add a text value'],
    },
  }
)

module.exports = mongoose.model('Opos', oposSchema)
