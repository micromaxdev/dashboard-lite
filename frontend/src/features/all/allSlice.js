import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import allService from "./allService";

const initialState = {
  latestSales: [],
  latestPurchases: [],
  opos: [],
  sohs: [],
  partNotes: [],
  warehouseStock: [],
  suppliers: [],
  customers: [],
  customerNotes: [],
  supplierNotes: [],
  supplierOpos: [],
  osos: [],
  globalVariables: [],
  openServiceJobs: [],
  budget: [],
  img: "",
  parts: [],
  cumulativeParts: [],
  businessCalendar: [],
  salesOrderLogs: [],
  jobLogs: [],
  subscriptions: [],
  servicePipeline: [],
  openRMAs: [],
  closedRMAs: [],
  debtorsReport: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//-----------------------------------------------------------------------------------
//--------------------------------------GETTERS----------------------------------
//-----------------------------------------------------------------------------------

export const getPdf = createAsyncThunk("pdf/getOne", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await allService.getPdf(id, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getImg = createAsyncThunk("img/getOne", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await allService.getImg(id, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateSap = createAsyncThunk("updateSap", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await allService.updateSap(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getLatestSales = createAsyncThunk(
  "latestSales/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await allService.getLatestSales(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getBusinessCalendar = createAsyncThunk(
  "businessCalendar/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await allService.getBusinessCalendar(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getLatestPurchases = createAsyncThunk(
  "latestPurchases/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await allService.getLatestPurchases(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getOpos = createAsyncThunk("opos/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await allService.getOpos(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getSohs = createAsyncThunk("sohs/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await allService.getSohs(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getBudget = createAsyncThunk(
  "budget/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await allService.getBudget(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getPartNotes = createAsyncThunk(
  "partNotes/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await allService.getPartNotes(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getCumulativeParts = createAsyncThunk(
  "cumulativeParts/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await allService.getCumulativeParts(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getCurrentWarehouseStock = createAsyncThunk(
  "warehouseStock/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await allService.getCurrentWarehouseStock(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSuppliers = createAsyncThunk(
  "suppliers/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await allService.getSuppliers(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getCustomers = createAsyncThunk(
  "customers/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await allService.getCustomers(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getCustomerNotes = createAsyncThunk(
  "customerNotes/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await allService.getCustomerNotes(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSupplierNotes = createAsyncThunk(
  "supplierNotes/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await allService.getSupplierNotes(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSupplierOpos = createAsyncThunk(
  "supplierOpos/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await allService.getSupplierOpos(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getOsos = createAsyncThunk("osos/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await allService.getOsos(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getGlobalVariables = createAsyncThunk(
  "globalVariables/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await allService.getGlobalVariables(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getOpenServiceJobs = createAsyncThunk(
  "openServiceJobs/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await allService.getOpenServiceJobs(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getPartsOne = createAsyncThunk(
  "onepart/getONE",
  async (paramsField, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await allService.getPartsOne(paramsField, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getJobLogs = createAsyncThunk(
  "jobLogs/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await allService.getJobLogs(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSalesOrderLogs = createAsyncThunk(
  "salesOrderLogs/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await allService.getSalesOrderLogs(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSubscriptions = createAsyncThunk(
  "subscriptions/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await allService.getSubscriptions(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getServicePipeline = createAsyncThunk(
  "servicePipeline/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await allService.getServicePipeline(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getOpenRMAs = createAsyncThunk(
  "openRMAs/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await allService.getOpenRMAs(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getClosedRMAs = createAsyncThunk(
  "closedRMAs/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await allService.getClosedRMAs(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getDebtorsReport = createAsyncThunk(
  "all/getDebtorsReport",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await allService.getDebtorsReport(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//-----------------------------------------------------------------------------------
//--------------------------------------UPDATERS----------------------------------
//-----------------------------------------------------------------------------------

export const updateParts = createAsyncThunk(
  "parts/update",
  async (parts, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await allService.updateParts(parts, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePartsCategory = createAsyncThunk(
  "parts/updateCategory",
  async (categoryData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      // Make the API call
      const response = await allService.updatePartsCategory(
        categoryData,
        token
      );
      // Return categoryData for local state update
      return categoryData;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createBusinessCalendar = createAsyncThunk(
  "businessCalendar/create",
  async (businessCalendar, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await allService.createBusinessCalendar(businessCalendar, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//-------------------------------------CREATE SLICE------------------------------------

export const allSlice = createSlice({
  name: "all",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.img = action.payload;
      })
      .addCase(getImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPdf.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPdf.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getPdf.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateSap.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSap.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateSap.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getLatestSales.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLatestSales.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.latestSales = action.payload;
      })
      .addCase(getLatestSales.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getLatestPurchases.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLatestPurchases.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.latestPurchases = action.payload;
      })
      .addCase(getLatestPurchases.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getOpos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOpos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.opos = action.payload;
      })
      .addCase(getOpos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBusinessCalendar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBusinessCalendar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.businessCalendar = action.payload;
      })
      .addCase(getBusinessCalendar.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSohs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSohs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sohs = action.payload;
      })
      .addCase(getSohs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBudget.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBudget.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.budget = action.payload;
      })
      .addCase(getBudget.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPartNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPartNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.partNotes = action.payload;
      })
      .addCase(getPartNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCumulativeParts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCumulativeParts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cumulativeParts = action.payload;
      })
      .addCase(getCumulativeParts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCurrentWarehouseStock.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentWarehouseStock.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.warehouseStock = action.payload;
      })
      .addCase(getCurrentWarehouseStock.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSuppliers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSuppliers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.suppliers = action.payload;
      })
      .addCase(getSuppliers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCustomers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customers = action.payload;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCustomerNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomerNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customerNotes = action.payload;
      })
      .addCase(getCustomerNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSupplierNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSupplierNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.supplierNotes = action.payload;
      })
      .addCase(getSupplierNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSupplierOpos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSupplierOpos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.supplierOpos = action.payload;
      })
      .addCase(getSupplierOpos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getOsos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOsos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.osos = action.payload;
      })
      .addCase(getOsos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getOpenServiceJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOpenServiceJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.openServiceJobs = action.payload;
      })
      .addCase(getOpenServiceJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPartsOne.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPartsOne.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.parts = action.payload;
      })
      .addCase(getPartsOne.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getGlobalVariables.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGlobalVariables.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.globalVariables = action.payload;
      })
      .addCase(getGlobalVariables.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateParts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateParts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateParts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createBusinessCalendar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBusinessCalendar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.businessCalendar = action.payload;
      })
      .addCase(createBusinessCalendar.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getJobLogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJobLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jobLogs = action.payload;
      })
      .addCase(getJobLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSalesOrderLogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSalesOrderLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.salesOrderLogs = action.payload;
      })
      .addCase(getSalesOrderLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSubscriptions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSubscriptions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.subscriptions = action.payload;
      })
      .addCase(getSubscriptions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getServicePipeline.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getServicePipeline.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.servicePipeline = action.payload;
      })
      .addCase(getServicePipeline.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatePartsCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePartsCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        // Update the partNotes in the state
        const { ids, category, subcategory } = action.payload;
        state.partNotes = state.partNotes.map((note) => {
          if (ids.includes(note._id)) {
            return {
              ...note,
              category: category || note.category, // Update category if provided
              subCategory: subcategory || note.subCategory, // Update subCategory if provided
            };
          }
          return note;
        });
      })
      .addCase(updatePartsCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getOpenRMAs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOpenRMAs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.openRMAs = action.payload;
      })
      .addCase(getOpenRMAs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getClosedRMAs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClosedRMAs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.closedRMAs = action.payload;
      })
      .addCase(getClosedRMAs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getDebtorsReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDebtorsReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.debtorsReport = action.payload;
      })
      .addCase(getDebtorsReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

//-------------------------------------EXPORT-------------------------------------

export const { reset } = allSlice.actions;
export default allSlice.reducer;
