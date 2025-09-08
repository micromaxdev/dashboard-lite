const asyncHandler = require("express-async-handler");
const OpenRMA = require("../models/openRMAModel");
const ClosedRMA = require("../models/closedRMAModel");
const LatestSales = require("../models/latestSalesModel");
const LatestPurchases = require("../models/latestPurchasesModel");
const Opos = require("../models/oposModel");
const Sohs = require("../models/sohsModel");
const PartNotes = require("../models/partNotesModel");
const CurrentWarehouseStock = require("../models/currentWarehouseStockModel");
const Suppliers = require("../models/suppliersModel");
const Customers = require("../models/customersModel");
const NewCustomers = require("../models/newCustomersModel");
const CustomerNotes = require("../models/customerNotesModel");
const SupplierNotes = require("../models/supplierNotesModel");
const SupplierOpos = require("../models/supplierOposModel");
const Osos = require("../models/ososModel");
const OpenServiceJobs = require("../models/openServiceJobsModel");
const Part = require("../models/partModel");
const CumulativePart = require("../models/cumulativePartModel");
const Budget = require("../models/budgetModel");
const GlobalVariables = require("../models/globalVariablesModel");
const BusinessCalendar = require("../models/businessCalendarModel");
const File = require("../models/filesModel");
const fs = require("fs");
const path = require("path");
const JobLog = require("../models/jobLogModel");
const SalesOrderLog = require("../models/salesOrderLogModel");
const SOW = require("../models/shareOfWalletModel");
const SupplierAccountManager = require("../models/supplierAccountManagerModel");
const Subscriptions = require("../models/subscriptionModel");
const ServicePipeline = require("../models/servicePipelineModel");
const ArOpenItems = require("../models/arOpenItemsModel");
const moment = require("moment");

//-----------------------------------------------------------------------------------
//--------------------------------------GETTERS----------------------------------
//-----------------------------------------------------------------------------------
// Utility to parse date strings in various formats
function parseDateFlexible(dateStr) {
  if (!dateStr || typeof dateStr !== "string" || dateStr.trim() === "")
    return dateStr;

  const moment = require("moment");

  // Define formats in order of preference
  let formats = [
    "DD-MMM-YY", // For RMA dates: "14-Oct-20"
    "DD-MMM-YYYY", // For RMA dates: "14-Oct-2020"
    "DD/MM/YY", // For AR dates: "01/08/25"
    "DD/MM/YYYY", // For AR dates: "01/08/2025"
  ];

  for (let fmt of formats) {
    let m = moment(dateStr, fmt, true); // strict parsing
    if (m.isValid()) return m.toDate();
  }

  // If all moment parsing fails, return original string
  return dateStr;
}

const getOpenRMAs = asyncHandler(async (req, res) => {
  const openRMAs = await OpenRMA.find({});
  const dateFields = [
    "rmaDate",
    "goodsArriveDate",
    "dateShipToSupp",
    "dateReturnsFromSupp",
    "dateShipToCust",
  ];
  const processed = openRMAs.map((doc) => {
    let obj = doc.toObject();
    dateFields.forEach((field) => {
      obj[field] = parseDateFlexible(obj[field]);
    });
    return obj;
  });
  res.status(200).json(processed);
});

const getClosedRMAs = asyncHandler(async (req, res) => {
  const closedRMAs = await ClosedRMA.find({});
  const dateFields = [
    "rmaDate",
    "goodsArriveDate",
    "dateShipToSupp",
    "dateReturnsFromSupp",
    "dateShipToCust",
  ];
  const processed = closedRMAs.map((doc) => {
    let obj = doc.toObject();
    dateFields.forEach((field) => {
      obj[field] = parseDateFlexible(obj[field]);
    });
    return obj;
  });
  res.status(200).json(processed);
});

const getUniqueCustomers = asyncHandler(async (req, res) => {
  // Fetch all customers and newCustomers
  const customers = await Customers.find({});
  const newCustomers = await NewCustomers.find({});

  // Merge them into a single list
  const allCustomers = [...customers, ...newCustomers];

  // Create a map to store unique customers
  const uniqueCustomersMap = new Map();

  // Iterate through all customers and populate the map
  for (const customer of allCustomers) {
    const { customerCode, customerName } = customer;

    // Generate a unique key based on customerCode and customerName
    const uniqueKey = `${customerCode}_${customerName}`;

    // If the customer is unique, add or update it in the map
    if (!uniqueCustomersMap.has(uniqueKey)) {
      uniqueCustomersMap.set(uniqueKey, customer);
    } else {
      // Merge the fields (excluding expiryDate and sOW)
      const existingCustomer = uniqueCustomersMap.get(uniqueKey);
      uniqueCustomersMap.set(uniqueKey, {
        ...existingCustomer,
        ...customer,
      });
    }
  }

  // Convert the map values to an array
  const uniqueCustomersArray = Array.from(uniqueCustomersMap.values());

  // Calculate the expiryDate based on firstInvoiceDate
  uniqueCustomersArray.forEach((customer) => {
    if (customer.firstInvoiceDate) {
      const firstInvoiceDate = moment(customer.firstInvoiceDate, "DD/MM/YYYY");
      const expiryDate = firstInvoiceDate.add(365, "days").format("DD/MM/YYYY");
      customer.expiryDate = expiryDate;
    }
  });

  // Return the unique customers array
  res.status(200).json(uniqueCustomersArray);
});

const updateSap = asyncHandler(async (req, res) => {
  try {
    //list of all csv files to get from ftp server
    const csvList = [
      {
        name: "F6 - Latest Sales",
        model: LatestSales,
      },
    ];

    // require csvtojson module
    const CSVToJSON = require("csvtojson");

    // convert users.csv file to JSON array
    csvList.map((csv) => {
      CSVToJSON()
        .fromFile(`backend/files/csvs/${csv.name}.csv`)
        .then((json) => {
          updateModel(csv.model, json);
        })
        .catch((err) => {
          // log error if any
          console.log(err);
        });
    });

    async function updateModel(Model, content) {
      //remove all latest sales
      await Model.deleteMany({});

      //insert new latest sales into mongodb
      Model.insertMany(content, function (error, docs) {});
    }
  } catch (error) {
    ftp_client.end();
    console.log(error);
    throw new Error("Error occured");
  }

  res.status(200).json("");
});

const getPdf = asyncHandler(async (req, res) => {
  var fileName = req.params.id;
  const path = require("path");

  const directory = `/home/dashdev/dashenv/upload/parts/${fileName}`;
  const filename = `${fileName}.pdf`;

  let filePath = path.resolve(directory, filename);

  if (!fs.existsSync(filePath)) {
    filePath = path.resolve(directory, `${fileName}.PDF`);
  }

  try {
    fs.readFile(filePath, function (err, data) {
      if (err) {
        res.status(400);
      }
      res.contentType("application/pdf").status(200).send(data);
    });
  } catch (error) {
    throw new Error("Error occuured: " + error);
  }
});

const getImg = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const imgDir = path.join(__dirname, "../../../upload/parts", id);
  const extensions = ["JPG", "jpg", "PNG", "png"];
  let imgPath = null;

  // Loop through the possible extensions to find the correct image file
  for (let ext of extensions) {
    const potentialPath = path.join(imgDir, `${id}.${ext}`);
    if (fs.existsSync(potentialPath)) {
      imgPath = potentialPath;
      break;
    }
  }

  // If the image is found, send the file
  if (imgPath) {
    res.sendFile(imgPath);
  } else {
    // If no image is found, send a 404 status with a message
    res.status(404).json({ message: "No Image found" });
  }
});

const getLatestSales = asyncHandler(async (req, res) => {
  const latestSales = await LatestSales.find({}); //user: req.user.id
  res.status(200).json(latestSales);
});

const getLatestPurchases = asyncHandler(async (req, res) => {
  const latestPurchases = await LatestPurchases.find({}); //user: req.user.id
  res.status(200).json(latestPurchases);
});

const getOpos = asyncHandler(async (req, res) => {
  const opos = await Opos.find({}); //user: req.user.id
  res.status(200).json(opos);
});

const getSohs = asyncHandler(async (req, res) => {
  const sohs = await Sohs.find({}); //user: req.user.id
  res.status(200).json(sohs);
});

const getBudget = asyncHandler(async (req, res) => {
  const budget = await Budget.find({}); //user: req.user.id
  res.status(200).json(budget);
});

const getPartNotes = asyncHandler(async (req, res) => {
  const partNotes = await PartNotes.find({}); //user: req.user.id
  res.status(200).json(partNotes);
});

const getCumulativeParts = asyncHandler(async (req, res) => {
  const cumulativeParts = await CumulativePart.find({});
  res.status(200).json(cumulativeParts);
});

const getCurrentWarehouseStock = asyncHandler(async (req, res) => {
  const warehouseStock = await CurrentWarehouseStock.find({});
  res.status(200).json(warehouseStock);
});

const getSuppliers = asyncHandler(async (req, res) => {
  const suppliers = await Suppliers.find({}); //user: req.user.id
  res.status(200).json(suppliers);
});

const getCustomers = asyncHandler(async (req, res) => {
  const customers = await Customers.find({}); //user: req.user.id
  res.status(200).json(customers);
});

const getNewCustomers = asyncHandler(async (req, res) => {
  const newCustomers = await NewCustomers.find({}); //user: req.user.id
  res.status(200).json(newCustomers);
});

const getAllSOWs = asyncHandler(async (req, res) => {
  try {
    const sowRecords = await SOW.find({}); // Fetch all SOW records
    res.status(200).json(sowRecords); // Send the fetched records as JSON
  } catch (error) {
    // Handle any errors that occurred during the fetching
    res.status(500).json({ message: "Error fetching SOWs", error: error });
  }
});

const getNewCustomersByYearAndEmployee = asyncHandler(async (req, res) => {
  // Extract query params
  const { financialYear, employee } = req.query;

  let conditions = {};

  // If financialYear is provided (format: "2020-2021")
  if (financialYear) {
    const [startYear, endYear] = financialYear.split("-").map(Number);
    const startOfFinancialYear = moment({
      year: startYear,
      month: 6,
      date: 1,
    }).toDate();
    const endOfFinancialYear = moment({ year: endYear, month: 5, date: 30 })
      .endOf("day")
      .toDate();

    conditions["expiryDate"] = {
      $gte: startOfFinancialYear,
      $lt: endOfFinancialYear,
    };
  }

  // If employee is provided and not 'All'
  if (employee && employee !== "All") {
    conditions["salesEmployeeName"] = employee;
  }

  const newCustomers = await NewCustomers.find(conditions);
  res.status(200).json(newCustomers);
});

const getCustomerNotes = asyncHandler(async (req, res) => {
  const customerNotes = await CustomerNotes.find({}); //user: req.user.id
  res.status(200).json(customerNotes);
});

const getSupplierNotes = asyncHandler(async (req, res) => {
  const supplierNotes = await SupplierNotes.find({}); //user: req.user.id
  res.status(200).json(supplierNotes);
});

const getSupplierOpos = asyncHandler(async (req, res) => {
  const supplierOpos = await SupplierOpos.find({}); //user: req.user.id
  res.status(200).json(supplierOpos);
});

const getOsos = asyncHandler(async (req, res) => {
  const osos = await Osos.find({}); //user: req.user.id
  res.status(200).json(osos);
});

const getGlobalVariables = asyncHandler(async (req, res) => {
  const globalVariables = await GlobalVariables.find({}); //user: req.user.id
  res.status(200).json(globalVariables);
});

const getOpenServiceJobs = asyncHandler(async (req, res) => {
  const openServiceJobs = await OpenServiceJobs.find({}); //user: req.user.id
  res.status(200).json(openServiceJobs);
});

const getPartsOne = asyncHandler(async (req, res) => {
  var itemNo = req.params.paramsField;
  console.log("getting part");

  const part = await Part.find();

  res.status(200).json(part);
});

const getBusinessCalendar = asyncHandler(async (req, res) => {
  const businessCalendar = await BusinessCalendar.find({}); //user: req.user.id
  res.status(200).json(businessCalendar);
});

const getJobLog = asyncHandler(async (req, res) => {
  const jobLog = await JobLog.find({}); //user: req.user.id
  res.status(200).json(jobLog);
});

const getSalesOrderLog = asyncHandler(async (req, res) => {
  const salesOrderLog = await SalesOrderLog.find({}); //user: req.user.id
  res.status(200).json(salesOrderLog);
});

const getSubscriptions = asyncHandler(async (req, res) => {
  const subscriptions = await Subscriptions.find({});
  res.status(200).json(subscriptions);
});

const getServicePipeline = asyncHandler(async (req, res) => {
  const servicePipeline = await ServicePipeline.find({});
  res.status(200).json(servicePipeline);
});

const getArOpenItems = asyncHandler(async (req, res) => {
  const arOpenItems = await ArOpenItems.find({}); //user: req.user.id

  res.status(200).json(arOpenItems);
});

const getDebtorsReport = asyncHandler(async (req, res) => {
  const arOpenItems = await ArOpenItems.find({}); //user: req.user.id

  // Helper function to calculate age based on due date
  const calculateAge = (dueDate) => {
    const today = new Date();
    const due = parseDateFlexible(dueDate);

    // If parsing failed, return the original date string
    if (!(due instanceof Date) || isNaN(due)) {
      return "Unknown";
    }

    const diffTime = today - due;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 30) return "0 - 30";
    if (diffDays <= 60) return "31 - 60";
    if (diffDays <= 90) return "61 - 90";
    if (diffDays <= 120) return "91 - 120";
    return "121+";
  };

  // Process the data according to requirements
  const processedData = arOpenItems
    // Remove all objects with transactionType "RC"
    .filter((item) => item.transactionType !== "RC")
    // Transform each object
    .map((item) => ({
      customerCode: item.customerCode,
      customerName: item.customerName,
      transactionType: item.transactionType,
      docNo: item.docNo,
      postingDate: item.postingDate,
      dueDate: item.dueDate,
      customerRefNumber: item.customerRefNumber,
      currency: item.currency === "" || !item.currency ? "AUD" : item.currency,
      amount: item.amount,
      balanceDue: item.balanceDue,
      age: calculateAge(item.dueDate),
    }))
    // Sort by customerCode A to Z
    .sort((a, b) => a.customerCode.localeCompare(b.customerCode));

  // Group items by customerCode to analyze age categories
  const customerGroups = processedData.reduce((acc, item) => {
    if (!acc[item.customerCode]) {
      acc[item.customerCode] = [];
    }
    acc[item.customerCode].push(item);
    return acc;
  }, {});

  // Filter out customers who only have "0 - 30" age items
  const filteredData = [];

  for (const [customerCode, items] of Object.entries(customerGroups)) {
    // Check if customer has any items outside "0 - 30" age category
    const hasItemsOutside0to30 = items.some((item) => item.age !== "0 - 30");

    // Only include customer if they have at least one item outside "0 - 30"
    if (hasItemsOutside0to30) {
      filteredData.push(...items);
    }
  }

  res.status(200).json(filteredData);
});
//-----------------------------------------------------------------------------------
//--------------------------------------UPDATERS----------------------------------
//-----------------------------------------------------------------------------------

const updateParts = asyncHandler(async (req, res) => {
  var { itemNo, image } = req.body;

  var filter = { itemNo: itemNo, image: image };
  var update = { itemNo, image };

  let updatedPartOne = await Part.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true,
  });

  res.status(200).json(updatedPartOne);
});

const updateSOW = asyncHandler(async (req, res) => {
  const { _id, overrideExpiry, sOW } = req.body; // Retrieve _id, overrideExpiry, and sOW from the request body

  // Define a filter to find the SOW record by its _id
  const filter = { _id: _id };

  // Define the fields to update
  const update = {};
  if (overrideExpiry !== undefined) {
    update.overrideExpiryDate = overrideExpiry;
  }
  if (sOW !== undefined) {
    update.sOW = sOW;
  }

  try {
    // Attempt to find and update the SOW record
    let updatedSOW = await SOW.findOneAndUpdate(filter, update, {
      new: true, // Return the new object after the update
    });

    if (updatedSOW) {
      console.log("Updated SOW:", updatedSOW); // Add this line for debugging
      res.status(200).json(updatedSOW);
    } else {
      res.status(404).json({ message: "SOW not found" }); // If the SOW does not exist
    }
  } catch (error) {
    console.log("Error details:", error); // Add this line for debugging
    res.status(500).json({ message: "Error updating SOW", error: error });
  }
});

const updateNewCustomerExpiry = asyncHandler(async (req, res) => {
  const { _id, overrideExpiry } = req.body; // Retrieve _id and overrideExpiry from the request body

  console.log("ID" + _id);
  console.log("OVERRIDE" + overrideExpiry);
  // Define a filter to find the customer record by its _id
  const filter = { _id: _id };

  // Define the fields to update
  const update = { overrideExpiryDate: overrideExpiry };

  try {
    // Attempt to find and update the customer record
    let updatedCustomer = await NewCustomers.findOneAndUpdate(filter, update, {
      new: true, // Return the new object after the update
    });

    if (updatedCustomer) {
      res.status(200).json(updatedCustomer); // Send the updated customer object as JSON
    } else {
      res.status(404).json({ message: "Customer not found" }); // If the customer does not exist
    }
  } catch (error) {
    // Handle any errors that occurred during the update
    res.status(500).json({ message: "Error updating customer", error: error });
  }
});

const updateBudget = asyncHandler(async (req, res) => {
  const {
    _id,
    salesTeam,
    salesBaseLine,
    gpBaseLine,
    gPPercent,
    salesBudget,
    gpBudget,
    year1,
    year2,
    additionalCOGS,
  } = req.body;

  const filter = { _id };
  const update = {
    salesTeam,
    salesBaseLine,
    gpBaseLine,
    gPPercent,
    salesBudget,
    gpBudget,
    year1,
    year2,
    additionalCOGS,
  };

  let updatedBudget = await Budget.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true,
  });

  res.status(200).json(updatedBudget);
});

const updatePartsCategory = asyncHandler(async (req, res) => {
  const { ids, category, subcategory } = req.body;
  console.log("Update parts cat: ", ids, category, subcategory);

  if (!category && !subcategory) {
    return res
      .status(400)
      .json({ message: "Category or subcategory must be provided" });
  }

  const filter = { _id: { $in: ids } };
  console.log("filter: ", filter);

  const update = {};

  if (category) {
    update.category = category;
  }

  if (subcategory) {
    update.subCategory = subcategory; // Change subcategory to subCategory for the database field
  }

  try {
    const result = await PartNotes.updateMany(filter, { $set: update });

    if (result.modifiedCount > 0) {
      return res
        .status(200)
        .json({ message: "Part notes updated successfully", result });
    } else {
      return res.status(404).json({ message: "No matching part notes found" });
    }
  } catch (error) {
    console.error("Error updating part notes:", error);
    return res
      .status(500)
      .json({ message: "Error updating part notes", error });
  }
});

const appendToSupplierNotes = async () => {
  try {
    // Check database connection
    const mongoose = require("mongoose");
    if (mongoose.connection.readyState !== 1) {
      console.warn("MongoDB not connected, skipping appendToSupplierNotes");
      return;
    }

    // Fetch all suppliers with a non-empty, non-null "Account manager"
    const suppliersWithManager = await SupplierAccountManager.find({
      "Account manager": { $ne: null, $ne: "" },
    });

    // Iterate over each supplier and update supplierNotes
    for (const supplier of suppliersWithManager) {
      const {
        supplierCode,
        "Brand ID": brandId,
        "Account manager": accountManager,
      } = supplier;

      // Find the matching supplierNote entry
      const existingNote = await SupplierNotes.findOne({ supplierCode });

      if (existingNote) {
        // Prepare update object
        let updateFields = {};
        if (!existingNote.brandId || existingNote.brandId !== brandId) {
          updateFields.brandId = brandId;
        }
        if (
          !existingNote.accountManager ||
          existingNote.accountManager !== accountManager
        ) {
          updateFields.accountManager = accountManager;
        }

        // Only update if there's a change
        if (Object.keys(updateFields).length > 0) {
          await SupplierNotes.updateOne(
            { supplierCode },
            { $set: updateFields }
          );
        }
      }
    }

    console.log("SupplierNotes updated successfully");
  } catch (error) {
    console.error("Error updating SupplierNotes:", error);
  }
};

//-----------------------------------------------------------------------------------
//--------------------------------------CREATORS----------------------------------
//-----------------------------------------------------------------------------------

const markBusinessCalendarAsComplete = async (email, completed, id, date) => {
  try {
    const businessCalendar = await BusinessCalendar.findById(id);
    if (!businessCalendar) {
      return res.status(404).json({ message: "Business calendar not found" });
    }

    console.log("date", date);

    let emailsInCompletedBy = businessCalendar?.completedBy?.map(
      (completedBy) => completedBy.email
    );
    console.log("emailsInCompletedBy", emailsInCompletedBy);
    const emailsInAssignedTo = businessCalendar?.assignedTo;

    const hasCompletedByEmail = businessCalendar.completedBy.some((item) => {
      return item.email === email;
    });

    const hasCompletedByEmailAndDate = businessCalendar.completedBy.some(
      (item) => {
        return item.email === email && item.dueDate === date;
      }
    );

    let indexOfIncomplete = businessCalendar.completedBy.findIndex((item) => {
      return item.email === email && item.dueDate === date;
    });

    let finalDueDate = businessCalendar.dueDate;

    //if repeat is daily, disregard dueDate
    if (businessCalendar.repeat !== "Never") {
      indexOfIncomplete = businessCalendar.completedBy.findIndex((item) => {
        return item.email === email;
      });
      finalDueDate = date;
    }

    //if todo date is not in the array, or not completed is not in the array push it
    if (businessCalendar.repeat === "Daily") {
      if (emailsInAssignedTo.includes(email) && !hasCompletedByEmailAndDate) {
        console.log("ASSIGNING");
        businessCalendar.completedBy = businessCalendar.completedBy || [];
        businessCalendar.completedBy.push({
          email: email,
          completed: completed,
          dueDate: finalDueDate,
        });
        await businessCalendar.save();
      }
    } else if (businessCalendar.repeat === "Weekly") {
      if (emailsInAssignedTo.includes(email) && !hasCompletedByEmailAndDate) {
        console.log("ASSIGNING weekly");
        businessCalendar.completedBy = businessCalendar.completedBy || [];
        businessCalendar.completedBy.push({
          email: email,
          completed: completed,
          dueDate: finalDueDate,
        });
        await businessCalendar.save();
      }
    } else {
      if (emailsInAssignedTo.includes(email) && !hasCompletedByEmail) {
        console.log("ASSIGNING");
        businessCalendar.completedBy = businessCalendar.completedBy || [];
        businessCalendar.completedBy.push({
          email: email,
          completed: completed,
          dueDate: finalDueDate,
        });
        await businessCalendar.save();
      }
    }

    //update completedBy array
    emailsInCompletedBy = businessCalendar?.completedBy?.map(
      (completedBy) => completedBy.email
    );

    if (indexOfIncomplete !== -1 && !completed) {
      // do something with the index
      businessCalendar.completedBy.splice(indexOfIncomplete, 1);
      await businessCalendar.save();
    }

    const isSubset = businessCalendar.assignedTo.every((value) =>
      emailsInCompletedBy.includes(value)
    );

    //logic for tasks that are not continuous
    if (businessCalendar.status !== "Continuous") {
      if (isSubset) {
        businessCalendar.status = "Completed";
        await businessCalendar.save();
      }

      if (!completed) {
        businessCalendar.status = "Incomplete";
        await businessCalendar.save();
      }
    }

    // res.json(businessCalendar);
  } catch (error) {
    console.log(error);
  }
};

const findAndUpdateStatusNotes = async (id, statusNotes) => {
  //find business calendar by id and update status notes
  try {
    //find business calendar by id
    const businessCalendar = await BusinessCalendar.findById(id);
    if (!businessCalendar) {
      return res.status(404).json({ message: "Business calendar not found" });
    }

    //update status notes
    businessCalendar.statusNotes = statusNotes;
    await businessCalendar.save();
  } catch (error) {
    console.log(error);
  }
};

const createBusinessCalendar = asyncHandler(async (req, res) => {
  const {
    title,
    dueDate,
    assignedTo,
    createdBy,
    repeat,
    startingDate,
    endingDate,
    notes,
    email,
    completed,
    id,
    date,
    statusNotes,
  } = req.body;

  if (email) {
    markBusinessCalendarAsComplete(email, completed, id, date);
  } else if (statusNotes) {
    //update status notes
    findAndUpdateStatusNotes(id, statusNotes);
  } else {
    if (
      title === null ||
      // dueDate === null ||
      assignedTo === null ||
      createdBy === null ||
      repeat === null
    ) {
      throw new Error("Please add all fields");
    }

    let toDoStatus = "Incomplete";

    if (repeat !== "Never") {
      toDoStatus = "Continuous";
    }

    // Create business calendar
    try {
      const businessCalendar = await BusinessCalendar.create({
        title,
        dueDate,
        assignedTo,
        createdBy,
        repeat,
        startingDate,
        endingDate: null,
        endingDates: [],
        notes,
        status: toDoStatus,
        statusNotes: null,
        completedBy: [],
      });
    } catch (error) {
      console.log(error);
      res.status(400);
      throw new Error("Invalid business calendar data");
    }
  }

  const businessCalendarAll = await BusinessCalendar.find({});

  res.status(200).json(businessCalendarAll);
});

//-----------------------------------------------------------------------------
//--------------------------------FILE HANDLING--------------------------------
//-----------------------------------------------------------------------------

async function download(req, res) {
  try {
    const fileId = req.params.id; // Get the file ID from the URL parameter
    // Retrieve the file metadata from MongoDB
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).send("File not found");
    }

    // Construct the full path to the file in the ../../uploads directory
    const filePath = path.join(
      __dirname,
      "../../../uploads",
      file.datafilename
    );

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).send("File not found on server");
    }

    // Use res.download to send the file
    res.download(filePath, file.filename, (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).send("Internal server error");
      }
    });
  } catch (error) {
    console.error("Error retrieving file:", error);
    res.status(500).send("Internal server error");
  }
}

// Function to retrieve a file by its MongoDB object ID
async function getFileDetailsById(req, res) {
  try {
    const fileId = req.params.id; // Get the file ID from the URL parameter

    // Retrieve the file from MongoDB, selecting only the desired fields
    const file = await File.findById(fileId).select(
      "filename mimetype uploadDate"
    );

    if (!file) {
      return res.status(404).send("File not found");
    }

    // Send the file details to the frontend
    res.json({
      filename: file.filename,
      mimetype: file.mimetype,
      uploadDate: file.uploadDate,
    });
  } catch (error) {
    console.error("Error retrieving file:", error);
    res.status(500).send("Internal server error");
  }
}

async function uploadFiles(req, res) {
  try {
    const uploadedFiles = [];

    // Ensure the ../../uploads directory exists
    const uploadDir = path.join(__dirname, "../../../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Iterate through the array of files
    for (const file of req.files) {
      const { originalname, mimetype, size, buffer } = file;

      // Generate a unique filename with a timestamp to avoid duplicates
      let uniqueFilename = originalname;
      const timestamp = Date.now();
      const fileExtension = path.extname(originalname);
      const baseName = path.basename(originalname, fileExtension);

      let fullPath = path.join(uploadDir, uniqueFilename);

      // Check if a file with the same name exists and append a timestamp if it does
      if (fs.existsSync(fullPath)) {
        uniqueFilename = `${baseName}-${timestamp}${fileExtension}`;
        fullPath = path.join(uploadDir, uniqueFilename);
      }

      // Write the file to the uploads directory
      fs.writeFileSync(fullPath, buffer);

      // Create a new File document for each file
      const newFile = new File({
        filename: originalname,
        mimetype,
        size,
        datafilename: uniqueFilename,
      });

      // Save the file metadata to MongoDB
      await newFile.save();

      // Push the ID of the newly created File document to the array
      uploadedFiles.push(newFile._id);
    }

    // Return the array of Object IDs of the newly created File documents
    res
      .status(201)
      .json({ fileIds: uploadedFiles, message: "Files uploaded successfully" });
  } catch (error) {
    console.error("Error uploading files:", error);
    res.status(500).json({ error: "Error uploading files" });
  }
}

module.exports = {
  getNewCustomers,
  getAllSOWs,
  getUniqueCustomers,
  getOpenRMAs,
  getClosedRMAs,
  getNewCustomersByYearAndEmployee,
  getPdf,
  getImg,
  getLatestSales,
  getLatestPurchases,
  getOpos,
  getSohs,
  getPartNotes,
  getCumulativeParts,
  getCurrentWarehouseStock,
  getSuppliers,
  getCustomers,
  getCustomerNotes,
  getSupplierNotes,
  getSupplierOpos,
  getOsos,
  getOpenServiceJobs,
  getPartsOne,
  getBudget,
  getGlobalVariables,
  getBusinessCalendar,
  getSubscriptions,
  getServicePipeline,
  getArOpenItems,
  getDebtorsReport,
  updateParts,
  updateSap,
  updateBudget,
  updateNewCustomerExpiry,
  updateSOW,
  updatePartsCategory,
  appendToSupplierNotes,
  createBusinessCalendar,
  getJobLog,
  getSalesOrderLog,
  getFileDetailsById,
  download,
  uploadFiles,
};
