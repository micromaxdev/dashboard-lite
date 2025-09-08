const mongoose = require("mongoose");
const Customers = require("../models/customersModel");
const NewCustomers = require("../models/newCustomersModel"); // Update with your actual path
const moment = require("moment");

async function seedNewCustomers() {
  try {
    console.log("Starting seedNewCustomers...");

    // Use a more efficient approach with aggregation
    const customers = await Customers.find({}).lean(); // .lean() for better performance

    const transformedCustomers = customers.map((customer) => {
      if (customer.firstInvoiceDate) {
        const firstInvoiceDate = moment(
          customer.firstInvoiceDate,
          "DD/MM/YYYY"
        );
        customer.expiryDate = firstInvoiceDate
          .add(365, "days")
          .format("DD/MM/YYYY");
      }
      return customer;
    });

    // Use bulkWrite for better performance on large datasets
    await NewCustomers.deleteMany({});
    await NewCustomers.insertMany(transformedCustomers);

    console.log(
      `Successfully seeded ${transformedCustomers.length} NewCustomers.`
    );
  } catch (error) {
    console.error("Error in seedNewCustomers:", error);
    throw error; // Re-throw to be caught by the cron job handler
  }
}

module.exports = seedNewCustomers;
