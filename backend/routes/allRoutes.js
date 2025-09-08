const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  getUniqueCustomers,
  getAllSOWs,
  getNewCustomersByYearAndEmployee,
  getNewCustomers,
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
  createBusinessCalendar,
  getJobLog,
  getSalesOrderLog,
  getFileDetailsById,
  download,
  uploadFiles,
  getOpenRMAs,
  getClosedRMAs,
} = require("../controllers/allController");

const { protect } = require("../middleware/authMiddleware");

// Existing routes
router.route("/getUniqueCustomers").get(getUniqueCustomers);
router.route("/getAllSOWs").get(getAllSOWs);
router.route("/getNewCustomers").get(getNewCustomers);
router
  .route("/getNewCustomersByYearAndEmployee")
  .get(getNewCustomersByYearAndEmployee);
router.route("/globalVariables").get(getGlobalVariables);
router.route("/businessCalendar").get(getBusinessCalendar);
router.route("/pdf/:id").get(getPdf);
router.route("/img/:id").get(getImg);
router.route("/updatesap").get(updateSap);
router.route("/latestSales").get(getLatestSales);
router.route("/latestPurchases").get(getLatestPurchases);
router.route("/opos").get(getOpos);
router.route("/sohs").get(getSohs);
router.route("/partNotes").get(getPartNotes);
router.route("/cumulativeParts").get(getCumulativeParts);
router.route("/warehouseStock").get(getCurrentWarehouseStock);
router.route("/suppliers").get(getSuppliers);
router.route("/customers").get(getCustomers);
router.route("/customerNotes").get(getCustomerNotes);
router.route("/supplierNotes").get(getSupplierNotes);
router.route("/supplierOpos").get(getSupplierOpos);
router.route("/osos").get(getOsos);
router.route("/budget").get(getBudget);
router.route("/openServiceJobs").get(getOpenServiceJobs);
router.route("/partsOne/:paramsField").get(getPartsOne);
router.route("/jobLogs").get(getJobLog);
router.route("/salesOrderLogs").get(getSalesOrderLog);
router.route("/subscriptions").get(getSubscriptions);
router.route("/servicePipeline").get(getServicePipeline);
router.route("/arOpenItems").get(getArOpenItems);
router.route("/debtorsReport").get(getDebtorsReport);
router.route("/parts/:itemNo").put(updateParts);
router.route("/budget/update/:id").put(updateBudget);
router.route("/businessCalendar").post(createBusinessCalendar);
router.post("/updateNewCustomerExpiry", updateNewCustomerExpiry);
router.post("/updateSOW", updateSOW);
router.post("/updatePartsCategory", updatePartsCategory);

// Open and Closed RMA routes
router.route("/openRMAs").get(getOpenRMAs);
router.route("/closedRMAs").get(getClosedRMAs);

// File download upload test
// Configure Multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload", upload.array("files"), uploadFiles);
// Route to get a file by ID
router.get("/getFile/:id", getFileDetailsById);

router.get("/download/:id", download);

module.exports = router;
