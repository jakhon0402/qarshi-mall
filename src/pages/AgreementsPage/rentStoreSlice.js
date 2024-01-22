import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../config/Api";
import { findIndex } from "lodash";

export const getAllRentStores = createAsyncThunk(
  "rentStores/getAll",
  async (body = {}) => {
    const response = await Api.get("/rentStore");
    return response.data;
  }
);

export const getRentStoreById = createAsyncThunk(
  "rentStores/getById",
  async (body = {}) => {
    const response = await Api.get(`/rentStore/${body}`);
    return response.data;
  }
);
export const getRentStorePaymentsById = createAsyncThunk(
  "rentStores/getStorePaymentsById",
  async (body = {}) => {
    const response = await Api.get(`/monthlyPayment/all/${body}`);
    return response.data;
  }
);

export const createRentStore = createAsyncThunk(
  "rentStores/create",
  async (body) => {
    const response = await Api.post("/rentStore", body);
    return response.data;
  }
);

export const updateRentStore = createAsyncThunk(
  "rentStores/update",
  async (body) => {
    const response = await Api.put(`/rentStore/${body?.id}`, body);
    return response.data;
  }
);

export const deleteRentStore = createAsyncThunk(
  "rentStores/delete",
  async (body) => {
    const response = await Api.delete(`/rentStore/${body?.id}`);
    return response.data;
  }
);

export const createPayment = createAsyncThunk(
  "rentStores/createPayment",
  async (body, { rejectWithValue }) => {
    try {
      const response = await Api.post(`/monthlyPayment`, body?.data);
      // body?.navigate();
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const updatePayment = createAsyncThunk(
  "rentStores/updatePayment",
  async (body, { rejectWithValue }) => {
    try {
      const response = await Api.put(`/monthlyPayment/${body?.id}`, body?.data);
      // body?.navigate();
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const deletePayment = createAsyncThunk(
  "rentStores/deletePayment",
  async (body, { rejectWithValue }) => {
    try {
      const response = await Api.delete(`/monthlyPayment/${+body?.paymentId}`);
      // body?.navigate();
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const rentStoresSlice = createSlice({
  name: "rentStores",
  initialState: {
    rentStores: null,
    rentPayments: null,
    rentStore: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      ///------------ GET stores ------------------/////
      .addCase(getAllRentStores.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllRentStores.fulfilled, (state, action) => {
        state.loading = false;
        state.rentStores = action.payload?.content;
      })
      .addCase(getAllRentStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ GET stores ------------------/////
      .addCase(getRentStorePaymentsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRentStorePaymentsById.fulfilled, (state, action) => {
        state.loading = false;
        state.rentPayments = action.payload;
      })
      .addCase(getRentStorePaymentsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ GET stores ------------------/////
      .addCase(getRentStoreById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRentStoreById.fulfilled, (state, action) => {
        state.loading = false;
        state.rentStore = action.payload;
      })
      .addCase(getRentStoreById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ CREATE stores ------------------/////
      .addCase(createRentStore.pending, (state) => {
        state.loading = true;
      })
      .addCase(createRentStore.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.rentStores = [...state.rentStores, payload];
      })
      .addCase(createRentStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ delete rentStores ------------------/////
      .addCase(deleteRentStore.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRentStore.fulfilled, (state, { payload }) => {
        state.loading = false;
        const ctgIndex = findIndex(state.rentStores, { id: payload?.id });
        state.rentStores.splice(ctgIndex, 1);
      })
      .addCase(deleteRentStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ UPDATE rentStores ------------------/////
      .addCase(updateRentStore.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRentStore.fulfilled, (state, { payload }) => {
        state.loading = false;
        const ctgIndex = findIndex(state.rentStores, { id: payload?.id });
        payload.itemCount = state.rentStores[ctgIndex]?.itemCount;
        state.rentStores[ctgIndex] = payload;
      })
      .addCase(updateRentStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ CREATE store payment ------------------/////
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPayment.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.rentPayments = [...state.rentPayments, payload];
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ UPDATE store payment ------------------/////
      .addCase(updatePayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePayment.fulfilled, (state, { payload }) => {
        state.loading = false;
        const ctgIndex = findIndex(state.rentPayments, { id: payload?.id });
        state.rentPayments[ctgIndex] = payload;
      })
      .addCase(updatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ delete payment ------------------/////
      .addCase(deletePayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePayment.fulfilled, (state, { payload }) => {
        state.loading = false;
        const ctgIndex = findIndex(state.rentPayments, { id: payload?.id });
        state.rentPayments.splice(ctgIndex, 1);
      })
      .addCase(deletePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError } = rentStoresSlice.actions;

export default rentStoresSlice.reducer;
