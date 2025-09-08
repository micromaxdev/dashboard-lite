import axios from "axios";

const API_URL = "/api/all/";

//-----------------------------------------------------------------------------------
//--------------------------------------GETTERS----------------------------------
//-----------------------------------------------------------------------------------

const getPdf = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "blob",
  };

  try {
    console.log("about to open");
    console.log(id);

    await axios.get("/api/all/pdf/" + id, config).then((response) => {
      //Create a Blob from the PDF Stream
      const file = new Blob([response.data], { type: "application/pdf" });
      //Build a URL from the file
      const fileURL = URL.createObjectURL(file);
      //Open the URL on new Window
      const pdfWindow = window.open();
      pdfWindow.location.href = fileURL;
    });
  } catch (error) {
    console.log("cant open file");
  }

  return null;
};

const getImg = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "blob", // Handle binary data
  };

  const response = await axios.get("/api/all/img/" + id, config);

  const imageObjectUrl = URL.createObjectURL(response.data);

  return imageObjectUrl;
};

const updateSap = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log("starting to update");
  const response = await axios.get("/api/all/updatesap", config);

  return response.data;
};

const getLatestSales = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/api/all/latestSales", config);

  return response.data;
};

const getBusinessCalendar = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/api/all/businessCalendar", config);

  return response.data;
};

const getLatestPurchases = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/api/all/latestPurchases", config);

  return response.data;
};

const getOpos = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/api/all/opos", config);

  return response.data;
};

const getSohs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/api/all/sohs", config);

  return response.data;
};

const getBudget = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/api/all/budget", config);
  console.log("Budget has been gotten");

  return response.data;
};

const getPartNotes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/api/all/partNotes", config);

  return response.data;
};

const getCumulativeParts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/api/all/cumulativeParts", config);

  return response.data;
};

const getCurrentWarehouseStock = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/api/all/warehouseStock", config);

  return response.data;
};

const getSuppliers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/api/all/suppliers", config);

  return response.data;
};

const getCustomers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/api/all/customers", config);

  return response.data;
};

const getCustomerNotes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/api/all/customerNotes", config);

  return response.data;
};

const getSupplierNotes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/api/all/supplierNotes", config);

  return response.data;
};

const getSupplierOpos = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/api/all/supplierOpos", config);

  return response.data;
};

const getOsos = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/api/all/osos", config);

  return response.data;
};

const getGlobalVariables = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/api/all/globalVariables", config);

  return response.data;
};

const getOpenServiceJobs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/api/all/openServiceJobs", config);

  return response.data;
};

const getPartsOne = async (paramsField, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/api/all/partsOne/" + paramsField, config);

  return response.data;
};

const getJobLogs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/api/all/jobLogs", config);

  return response.data;
};

const getSalesOrderLogs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/api/all/salesOrderLogs", config);

  return response.data;
};

const getSubscriptions = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/api/all/subscriptions", config);

  return response.data;
};

const getServicePipeline = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/api/all/servicePipeline", config);

  return response.data;
};

const getDebtorsReport = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/api/all/debtorsReport", config);

  return response.data;
};

// Get all FADs
const getAllFADs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get("/api/all/fad", config);
  return response.data;
};

//-----------------------------------------------------------------------------------
//--------------------------------------UPDATERS----------------------------------
//-----------------------------------------------------------------------------------

const updateParts = async (opos, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    "/api/all/parts/" + opos.itemNo,
    opos,
    config
  );

  return response.data;
};

const updatePartsCategory = async (categoryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    "/api/all/updatePartsCategory",
    categoryData,
    config
  );

  return response.data;
};

// Update an existing FAD collection
const updateFADCollection = async (collectionId, collectionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `/api/all/fad/${collectionId}`,
    collectionData,
    config
  );
  return response.data;
};
//-----------------------------------------------------------------------------------
//--------------------------------------CREATORS----------------------------------
//-----------------------------------------------------------------------------------

const createBusinessCalendar = async (businessCalendarData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    "/api/all/businessCalendar",
    businessCalendarData,
    config
  );

  console.log("response.data: ", response.data);
  return response.data;
};

// Create a new FAD collection
const createFADCollection = async (collectionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post("/api/all/fad", collectionData, config);
  return response.data;
};

// Get open RMAs
const getOpenRMAs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get("/api/all/openRMAs", config);
  return response.data;
};

// Get closed RMAs
const getClosedRMAs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get("/api/all/closedRMAs", config);
  return response.data;
};

// ------------------------
const allService = {
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
  getSubscriptions,
  getServicePipeline,
  getDebtorsReport,
  getAllFADs,
  updateParts,
  updatePartsCategory,
  updateSap,
  updateFADCollection,
  getBusinessCalendar,
  createBusinessCalendar,
  createFADCollection,
  getJobLogs,
  getSalesOrderLogs,
  getOpenRMAs,
  getClosedRMAs,
};

export default allService;
