const console = require("console");
const LatestSales = require("../models/latestSalesModel");
const LatestPurchases = require("../models/latestPurchasesModel");
const Opos = require("../models/oposModel");
const Sohs = require("../models/sohsModel");
const PartNotes = require("../models/partNotesModel");
const CurrentWarehouseStock = require("../models/currentWarehouseStockModel");
const Suppliers = require("../models/suppliersModel");
const Customers = require("../models/customersModel");
const CustomerNotes = require("../models/customerNotesModel");
const SupplierNotes = require("../models/supplierNotesModel");
const SupplierAccountManager = require("../models/supplierAccountManagerModel");
const Subscriptions = require("../models/subscriptionModel");
const Osos = require("../models/ososModel");
const OpenServiceJobs = require("../models/openServiceJobsModel");
const Part = require("../models/partModel");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config({ path: require("path").resolve(__dirname, "../../.env") });
const csvDir = process.env.CSV_DIR;
const GlobalVariable = require("../models/globalVariablesModel");
const SalesOrderLog = require("../models/salesOrderLogModel");
const JobLog = require("../models/jobLogModel");
const NewCustomers = require("../models/newCustomersModel");
const moment = require("moment");
const ShareOfWallet = require("../models/shareOfWalletModel");
const HubspotCustomers = require("../models/hubspotCustomersModel");
const PartCategory = require("../models/partCategoryModel");
const PartSubcategory = require("../models/partSubcategoryModel");
const ArOpenItems = require("../models/arOpenItemsModel");
const CumulativePart = require("../models/cumulativePartModel");
const ServicePipeline = require("../models/servicePipelineModel");
const OpenRMA = require("../models/openRMAModel");
const ClosedRMA = require("../models/closedRMAModel");
const { appendToSupplierNotes } = require("../controllers/allController");
const path = require("path");
const XLSX = require("xlsx");

async function updateIndividualSOW(sow) {
  const filter = {
    customerCode: sow.customerCode,
    partCode: sow.partCode,
  };

  // Determine if sow is a Mongoose document
  let restOfSOW;
  if (sow.toObject) {
    const { _id, ...rest } = sow.toObject();
    restOfSOW = rest;
  } else {
    const { _id, ...rest } = sow;
    restOfSOW = rest;
  }

  // Add any additional fields or calculations here
  const update = {
    ...restOfSOW,
  };

  try {
    const result = await ShareOfWallet.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
    });
    // console.log("SOW Update Result:", result);
  } catch (error) {
    console.error("Error updating or inserting SOW:", error);
  }
}

async function updateSOW() {
  console.log("updateSOW is being called");

  // Check database connection
  const mongoose = require("mongoose");
  if (mongoose.connection.readyState !== 1) {
    console.warn("MongoDB not connected, skipping updateSOW");
    return;
  }

  // Fetch all latest sales from the database
  const latestSales = await LatestSales.find({}).catch((e) =>
    console.error("Error fetching latest sales:", e)
  );

  // Create an object to keep track of unique customerCode and partCode pairs with their earliest invoiceDate
  const uniqueEntries = {};

  for (const sale of latestSales) {
    const uniqueKey = `${sale.customerCode}-${sale.partCode}`;

    const saleDate = moment(sale.invoiceDate, "DD/MM/YY");

    if (saleDate.isValid()) {
      // Make sure the date is valid
      if (!uniqueEntries.hasOwnProperty(uniqueKey)) {
        uniqueEntries[uniqueKey] = saleDate;
      } else {
        if (saleDate.isBefore(uniqueEntries[uniqueKey])) {
          uniqueEntries[uniqueKey] = saleDate;
        }
      }
    }
  }

  // Loop through uniqueEntries to update SOW with expiry dates
  for (const [uniqueKey, earliestDate] of Object.entries(uniqueEntries)) {
    const [customerCode, partCode] = uniqueKey.split("-");

    const calculatedExpiryDate = moment(earliestDate)
      .add(365, "days")
      .format("DD/MM/YY");

    // Update or Insert SOW
    const sow = {
      customerCode,
      partCode,
      expiryDate: calculatedExpiryDate, // Set the calculated expiry date here
      // ... Add any additional fields you need
    };

    await updateIndividualSOW(sow);
  }
}

async function updateIndividualNewCustomer(customer) {
  const filter = { customerCode: customer.customerCode }; // assuming customerCode is unique

  // Remove _id and then copy all fields from the customer to the update object
  const { _id, ...restOfCustomer } = customer.toObject();

  // Add earliestExpiryDate to the update object
  const update = {
    ...restOfCustomer,
    expiryDate: customer.expiryDate, // set the earliest expiry date here
  };

  try {
    const result = await NewCustomers.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
    });
    // console.log("Update Result:", result);
  } catch (error) {
    console.error("Error updating or inserting customer:", error);
  }
}

// This function processes all customers and updates the NewCustomers collection
async function updateNewCustomers() {
  console.log("updateNewCustomers is being called");

  // Check database connection
  const mongoose = require("mongoose");
  if (mongoose.connection.readyState !== 1) {
    console.warn("MongoDB not connected, skipping updateNewCustomers");
    return;
  }

  // Fetch all customers from the database
  const customers = await Customers.find({}).catch((e) =>
    console.error("Error fetching customers:", e)
  );

  // Update each customer's expiry date based on their own firstInvoiceDate
  for (const customer of customers) {
    // Only initialize expiryDate if firstInvoiceDate is present and not empty
    if (customer.firstInvoiceDate && customer.firstInvoiceDate !== "") {
      const firstInvoiceDate = moment(customer.firstInvoiceDate, "DD/MM/YY");
      const calculatedExpiryDate = moment(firstInvoiceDate).add(365, "days"); // Adding 365 days to firstInvoiceDate

      if (calculatedExpiryDate.isValid()) {
        const expiryDate = calculatedExpiryDate.format("DD/MM/YY");
        customer.expiryDate = expiryDate;
      }
    }

    // Always update the customer in the NewCustomers collection,
    // expiryDate will be null if not set
    await updateIndividualNewCustomer(customer);
  }
}

// Function to update categories and subcategories in partnotes
async function updateCategories() {
  console.log("updateCategories is being called");

  // Check database connection
  const mongoose = require("mongoose");
  if (mongoose.connection.readyState !== 1) {
    console.warn("MongoDB not connected, skipping updateCategories");
    return;
  }

  // Fetch all categories
  const categories = await PartCategory.find({}).catch((e) =>
    console.error("Error fetching part categories:", e)
  );

  // Loop through each category and update partnotes
  for (const category of categories) {
    const partCodes = category.parts;
    await PartNotes.updateMany(
      { partCode: { $in: partCodes } },
      { category: category.name }
    ).catch((e) =>
      console.error(
        `Error updating partnotes for category ${category.name}:`,
        e
      )
    );
  }

  // Fetch all subcategories
  const subCategories = await PartSubcategory.find({}).catch((e) =>
    console.error("Error fetching part subcategories:", e)
  );

  // Loop through each subcategory and update partnotes
  for (const subCategory of subCategories) {
    const partCodes = subCategory.parts;
    await PartNotes.updateMany(
      { partCode: { $in: partCodes } },
      { subCategory: subCategory.name }
    ).catch((e) =>
      console.error(
        `Error updating partnotes for subcategory ${subCategory.name}:`,
        e
      )
    );
  }
}

async function updateCumParts() {
  console.log("updateCumParts is being called");

  // Check database connection
  const mongoose = require("mongoose");
  if (mongoose.connection.readyState !== 1) {
    console.warn("MongoDB not connected, skipping updateCumParts");
    return;
  }

  try {
    const parts = await CumulativePart.find({});

    for (const part of parts) {
      if (part.description) {
        const match = part.description.match(/^([A-Z]{2})\./);
        if (match) {
          part.supplier = match[1];
        } else {
          console.error(
            `Invalid description format for item ${part.itemNo}: Unable to extract supplier`
          );
        }
      }

      if (part.cumulativeValue && part.cumulativeQuantity) {
        part.cost = part.cumulativeValue / part.cumulativeQuantity || 0;
      } else {
        part.cost = 0;
      }

      try {
        await part.save();
      } catch (error) {
        console.error(`Error saving updates for item ${part.itemNo}:`, error);
      }
    }
  } catch (error) {
    console.error("Error updating cumulative parts:", error);
  }
}

function updateCsvs() {
  try {
    // Check if we're in a context where database operations are safe
    if (
      typeof process !== "undefined" &&
      process.env.NODE_ENV === "production"
    ) {
      // In production, we assume the database is connected when this function is called
    }

    // Add a more robust database connection check
    const mongoose = require("mongoose");
    if (mongoose.connection.readyState !== 1) {
      console.warn("MongoDB not connected, skipping CSV update");
      return;
    }

    updateFilesInMongoDB();

    function updateFilesInMongoDB() {
      const csvList = [
        {
          name: "OpenRMA",
          model: OpenRMA,
        },
        {
          name: "ClosedRMA",
          model: ClosedRMA,
        },
        {
          name: "F6 - Latest Sales",
          model: LatestSales,
        },
        {
          name: "F6 - Customer Notes",
          model: CustomerNotes,
        },
        {
          name: "F6 - Customer",
          model: Customers,
        },
        {
          name: "F6 - Open PO by Item",
          model: Opos,
        },
        {
          name: "F6 - Open Service Jobs not fully invoiced",
          model: OpenServiceJobs,
        },
        {
          name: "F6 - Order Book by Item",
          model: Osos,
        },
        {
          name: "F6 - Part Master",
          model: PartNotes,
        },
        {
          name: "F6 - Current Stock in Warehouse",
          model: CurrentWarehouseStock,
        },
        {
          name: "F6 - Supplier Notes",
          model: SupplierNotes,
        },
        {
          name: "F6 - Latest Purchases",
          model: LatestPurchases,
        },
        {
          name: "F6 - Supplier",
          model: Suppliers,
        },
        {
          name: "F6 - Sales Order Log",
          model: SalesOrderLog,
        },
        {
          name: "F6 - Job Log",
          model: JobLog,
        },
        {
          name: "F6 - AR Open Items",
          model: ArOpenItems,
        },
        {
          name: "hubspot-crm-exports-all-companies",
          model: HubspotCustomers,
        },
        {
          name: "Inventory Audit Report - Summary",
          model: CumulativePart,
        },
        {
          name: "F6 - Supplier account manager",
          model: SupplierAccountManager,
        },
        {
          name: "F6 - Subscriptions",
          model: Subscriptions,
        },
        {
          name: "Service Pipeline - All",
          model: ServicePipeline,
        },
      ];

      csvList.map((csv) => {
        const possibleExtensions = [".csv", ".xlsx", ".xls"];
        let filePath = null;
        let extensionUsed = null;

        // Check which file exists
        for (const ext of possibleExtensions) {
          const fullPath = path.join(csvDir, `${csv.name}${ext}`);
          if (fs.existsSync(fullPath)) {
            filePath = fullPath;
            extensionUsed = ext;
            break;
          }
        }

        if (!filePath) {
          console.warn(`No supported file found for: ${csv.name}. Skipping.`);
          return;
        }

        // Get last modified time
        fs.stat(filePath, function (err, stats) {
          if (err) {
            return console.error(err);
          }
          const mtime = stats.mtime;
          GlobalVariable.findOneAndUpdate(
            { num: "1" },
            { $set: { lastUpdate: mtime.toISOString() } },
            { upsert: true }
          ).catch((err) => {
            console.log("Error inserting variable:", err.message);
          });
        });

        const processData = (jsonData) => {
          if (!Array.isArray(jsonData) || jsonData.length === 0) {
            console.warn(`Empty or invalid data for ${csv.name}, skipping.`);
            return;
          }

          // Clean up field names if needed
          jsonData.forEach((item) => {
            if (item["outstandingValue(LC)"]) {
              item.outstandingValue = item["outstandingValue(LC)"];
            }
          });

          csv.model
            .deleteMany({})
            .then(() => csv.model.insertMany(jsonData))
            .then(() => {
              console.log(`${csv.name} (${extensionUsed}) updated`);

              if (csv.name === "F6 - Latest Sales") {
                setTimeout(() => updateSOW(), 1000);
              }
              if (csv.name === "F6 - Customer") {
                setTimeout(() => updateNewCustomers(), 1000);
              }
              if (csv.name === "F6 - Part Master") {
                setTimeout(() => {
                  updateCategories();
                  updateSafetyStocks();
                }, 1000);
              }
              if (csv.name === "F6 - Supplier Notes") {
                setTimeout(() => appendToSupplierNotes(), 1000);
              }
              if (csv.name === "Inventory Audit Report - Summary") {
                setTimeout(() => updateCumParts(), 1000);
              }
            })
            .catch((error) => {
              console.error(
                `Error inserting data for ${csv.name}:`,
                error.message
              );
            });
        };

        if (extensionUsed === ".csv") {
          const CSVToJSON = require("csvtojson");
          CSVToJSON()
            .fromFile(filePath)
            .then(processData)
            .catch((err) => {
              console.error(`Error reading CSV for ${csv.name}:`, err.message);
            });
        } else {
          try {
            const workbook = XLSX.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const jsonData = XLSX.utils.sheet_to_json(
              workbook.Sheets[sheetName],
              {
                defval: "",
              }
            );
            processData(jsonData);
          } catch (err) {
            console.error(`Error reading Excel for ${csv.name}:`, err.message);
          }
        }
      });
    }
  } catch (err) {
    console.log("Error updating:", err.message);
  }
}

module.exports = updateCsvs;
