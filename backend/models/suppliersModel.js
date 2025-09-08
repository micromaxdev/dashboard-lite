const mongoose = require('mongoose')

const suppliersSchema = mongoose.Schema(
  {
    supplierCode: {
      type: String,
      required: [false, 'Please add a text value'],
    },
    supplierName: {
      type: String,
      required: [false, 'Please add a text value'],
    },
    supplierCurrency: {
      type: String,
      required: [false, 'Please add a text value'],
    },
    billingAddress: {
      type: String,
      required: [false, 'Please add a text value'],
    },
    creationDate: {
      type: String,
      required: [false, 'Please add a text value'],
    },
  }
)

module.exports = mongoose.model('Suppliers', suppliersSchema)
