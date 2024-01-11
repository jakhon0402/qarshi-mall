import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../config/Api";
import { findIndex } from "lodash";

export const getAllStores = createAsyncThunk(
  "stores/getAll",
  async (body = {}) => {
    const response = await Api.get("/store");
    return response.data;
  }
);

export const getStoreById = createAsyncThunk(
  "stores/getById",
  async (body = {}) => {
    const response = await Api.get(`/store/${body}`);
    return response.data;
  }
);
export const getStorePaymentsById = createAsyncThunk(
  "stores/getStorePaymentsById",
  async (body = {}) => {
    const response = await Api.get(`/payment/${body}/payments`);
    return response.data;
  }
);

export const createStore = createAsyncThunk("stores/create", async (body) => {
  const response = await Api.post("/store", body);
  return response.data;
});

export const updateStore = createAsyncThunk("stores/update", async (body) => {
  const response = await Api.put(`/store/${body?.id}`, body);
  return response.data;
});

export const deleteStore = createAsyncThunk("stores/delete", async (body) => {
  const response = await Api.delete(`/store/${body?.id}`);
  return response.data;
});

export const createPayment = createAsyncThunk(
  "stores/createPayment",
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
  "stores/updatePayment",
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
  "stores/deletePayment",
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

const storesSlice = createSlice({
  name: "stores",
  initialState: {
    stores: null,
    storePayments: null,
    store: null,
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
      .addCase(getAllStores.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllStores.fulfilled, (state, action) => {
        state.loading = false;
        state.stores = action.payload?.content;
      })
      .addCase(getAllStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ GET stores ------------------/////
      .addCase(getStorePaymentsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStorePaymentsById.fulfilled, (state, action) => {
        state.loading = false;
        state.storePayments = action.payload;
      })
      .addCase(getStorePaymentsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ GET stores ------------------/////
      .addCase(getStoreById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStoreById.fulfilled, (state, action) => {
        state.loading = false;
        state.store = action.payload;
      })
      .addCase(getStoreById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ CREATE stores ------------------/////
      .addCase(createStore.pending, (state) => {
        state.loading = true;
      })
      .addCase(createStore.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.stores = [...state.stores, payload];
      })
      .addCase(createStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ delete stores ------------------/////
      .addCase(deleteStore.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStore.fulfilled, (state, { payload }) => {
        state.loading = false;
        const ctgIndex = findIndex(state.stores, { id: payload?.id });
        state.stores.splice(ctgIndex, 1);
      })
      .addCase(deleteStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ UPDATE stores ------------------/////
      .addCase(updateStore.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStore.fulfilled, (state, { payload }) => {
        state.loading = false;
        const ctgIndex = findIndex(state.stores, { id: payload?.id });
        payload.itemCount = state.stores[ctgIndex]?.itemCount;
        state.stores[ctgIndex] = payload;
      })
      .addCase(updateStore.rejected, (state, action) => {
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

export const { resetError } = storesSlice.actions;

export default storesSlice.reducer;
