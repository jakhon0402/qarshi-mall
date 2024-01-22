import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../config/Api";
import { findIndex } from "lodash";

export const getAllSaleStores = createAsyncThunk(
  "saleStores/getAll",
  async (body = {}) => {
    const response = await Api.get("/saleStore");
    return response.data;
  }
);

export const getSaleStoreById = createAsyncThunk(
  "saleStores/getById",
  async (body = {}) => {
    const response = await Api.get(`/saleStore/${body}`);
    return response.data;
  }
);
export const getSaleStorePaymentsById = createAsyncThunk(
  "saleStores/getStorePaymentsById",
  async (body = {}) => {
    const response = await Api.get(`/payment/${body}/payments`);
    return response.data;
  }
);

export const createSaleStore = createAsyncThunk(
  "saleStores/create",
  async (body) => {
    const response = await Api.post("/saleStore", body);
    return response.data;
  }
);

export const updateSaleStore = createAsyncThunk(
  "saleStores/update",
  async (body) => {
    const response = await Api.put(`/saleStore/${body?.id}`, body);
    return response.data;
  }
);

export const deleteSaleStore = createAsyncThunk(
  "saleStores/delete",
  async (body) => {
    const response = await Api.delete(`/saleStore/${body?.id}`);
    return response.data;
  }
);

export const createPayment = createAsyncThunk(
  "saleStores/createPayment",
  async (body, { rejectWithValue }) => {
    try {
      const response = await Api.post(
        `/payment/${body?.id}/add-payment?newPayment=${body?.data?.newPayment}`,
        body?.data
      );
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
  "saleStores/updatePayment",
  async (body, { rejectWithValue }) => {
    try {
      const response = await Api.put(
        `/payment/${body?.storeId}/updatePayment/${body?.paymentId}?newPayment=${body?.data?.newPayment}`
      );
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
  "saleStores/deletePayment",
  async (body, { rejectWithValue }) => {
    try {
      const response = await Api.delete(`/payment/${+body?.paymentId}`);
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

const saleStoresSlice = createSlice({
  name: "saleStores",
  initialState: {
    saleStores: null,
    storePayments: null,
    saleStore: null,
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
      .addCase(getAllSaleStores.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSaleStores.fulfilled, (state, action) => {
        state.loading = false;
        state.saleStores = action.payload?.content;
      })
      .addCase(getAllSaleStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ GET stores ------------------/////
      .addCase(getSaleStorePaymentsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSaleStorePaymentsById.fulfilled, (state, action) => {
        state.loading = false;
        state.storePayments = action.payload;
      })
      .addCase(getSaleStorePaymentsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ GET stores ------------------/////
      .addCase(getSaleStoreById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSaleStoreById.fulfilled, (state, action) => {
        state.loading = false;
        state.saleStore = action.payload;
      })
      .addCase(getSaleStoreById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ CREATE stores ------------------/////
      .addCase(createSaleStore.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSaleStore.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.saleStores = [...state.saleStores, payload];
      })
      .addCase(createSaleStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ delete saleStores ------------------/////
      .addCase(deleteSaleStore.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSaleStore.fulfilled, (state, { payload }) => {
        state.loading = false;
        const ctgIndex = findIndex(state.saleStores, { id: payload?.id });
        state.saleStores.splice(ctgIndex, 1);
      })
      .addCase(deleteSaleStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ UPDATE saleStores ------------------/////
      .addCase(updateSaleStore.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSaleStore.fulfilled, (state, { payload }) => {
        state.loading = false;
        const ctgIndex = findIndex(state.saleStores, { id: payload?.id });
        payload.itemCount = state.saleStores[ctgIndex]?.itemCount;
        state.saleStores[ctgIndex] = payload;
      })
      .addCase(updateSaleStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ CREATE store payment ------------------/////
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPayment.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.storePayments = [...state.storePayments, payload];
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
        const ctgIndex = findIndex(state.storePayments, { id: payload?.id });
        state.storePayments[ctgIndex] = payload;
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
        const ctgIndex = findIndex(state.storePayments, { id: payload?.id });
        state.storePayments.splice(ctgIndex, 1);
      })
      .addCase(deletePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError } = saleStoresSlice.actions;

export default saleStoresSlice.reducer;
