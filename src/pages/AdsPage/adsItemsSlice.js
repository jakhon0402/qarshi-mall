import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { findIndex } from "lodash";
import Api from "../../config/Api";
import { toast } from "react-toastify";

export const getAllAdsItems = createAsyncThunk(
  "adsItems/getAll",
  async (body = {}) => {
    const response = await Api.get("/adsItem");
    return response.data;
  }
);

export const getAdsItemById = createAsyncThunk(
  "adsItems/getById",
  async (body = {}) => {
    const response = await Api.get(`/adsItem/${body?.id}`);
    return response.data;
  }
);

export const getAdsItemPaymentsById = createAsyncThunk(
  "adsItems/getAdsItemPaymentsById",
  async (body = {}) => {
    const response = await Api.get(`/adsPayment/all/${body?.id}`);
    return response.data;
  }
);

export const createAdsItem = createAsyncThunk(
  "adsItems/create",
  async (body, { rejectWithValue }) => {
    try {
      const response = await Api.post("/adsItem", body);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const uploadImage = createAsyncThunk(
  "adsItems/uploadImage",
  async (body, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("file", body?.file);
    try {
      const response = await Api.post("/fayl/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      let reqBody = { fileEntityId: response?.data?.id, ...body?.adsItemData };
      const res = await Api.put(`/adsItem/${reqBody?.id}`, reqBody);

      body?.removeSelection();
      return res.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateAdsItem = createAsyncThunk(
  "adsItems/update",
  async (body, { rejectWithValue }) => {
    try {
      const response = await Api.put(`/adsItem/${body?.id}`, body);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteAdsItem = createAsyncThunk(
  "adsItems/delete",
  async (body, { rejectWithValue }) => {
    try {
      const response = await Api.delete(`/adsItem/${body?.id}`);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const createPayment = createAsyncThunk(
  "adsItems/createPayment",
  async (body, { rejectWithValue }) => {
    try {
      const response = await Api.post(`/adsPayment`, body?.data);
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
  "adsItems/updatePayment",
  async (body, { rejectWithValue }) => {
    try {
      const response = await Api.put(`/adsPayment/${body?.id}`, body?.data);
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
  "adsItems/deletePayment",
  async (body, { rejectWithValue }) => {
    try {
      const response = await Api.delete(`/adsPayment/${+body?.paymentId}`);
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

const adsItemsSlice = createSlice({
  name: "adsItems",
  initialState: {
    adsItems: null,
    adsPayments: null,
    adsItem: null,
    loading: false,
    uploadLoading: false,
    error: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      ///------------ GET adsItems ------------------/////
      .addCase(getAllAdsItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAdsItems.fulfilled, (state, action) => {
        state.loading = false;
        state.adsItems = action.payload?.content;
      })
      .addCase(getAllAdsItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ GET adsItems ------------------/////
      .addCase(getAdsItemById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdsItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.adsItem = action.payload;
      })
      .addCase(getAdsItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ GET adsItems ------------------/////
      .addCase(getAdsItemPaymentsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdsItemPaymentsById.fulfilled, (state, action) => {
        state.loading = false;
        state.adsPayments = action.payload;
      })
      .addCase(getAdsItemPaymentsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ CREATE adsItems ------------------/////
      .addCase(createAdsItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAdsItem.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.adsItems = [payload, ...state.adsItems];
        toast.success(payload?.message);
      })
      .addCase(createAdsItem.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        toast.error(payload?.message);
      })

      ///------------ delete adsItems ------------------/////
      .addCase(deleteAdsItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAdsItem.fulfilled, (state, { payload }) => {
        state.loading = false;

        const ctgIndex = findIndex(state.adsItems, {
          id: payload?.id,
        });
        state.adsItems.splice(ctgIndex, 1);
        toast.success(payload?.message);
      })
      .addCase(deleteAdsItem.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        toast.error(payload?.message);
      })

      ///------------ UPDATE adsItems ------------------/////
      .addCase(updateAdsItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAdsItem.fulfilled, (state, { payload }) => {
        state.loading = false;

        const ctgIndex = findIndex(state.adsItems, {
          id: payload?.id,
        });
        state.adsItems[ctgIndex] = payload;
        toast.success(payload?.message);
      })

      ///------------ UPDATE adsItems ------------------/////
      .addCase(uploadImage.pending, (state) => {
        state.uploadLoading = true;
      })
      .addCase(uploadImage.fulfilled, (state, { payload }) => {
        state.uploadLoading = false;

        state.adsItem = payload;
        toast.success(payload?.message);
      })
      .addCase(uploadImage.rejected, (state, { payload }) => {
        state.uploadLoading = false;
        state.error = payload;
        toast.error(payload?.message);
      })

      ///------------ CREATE store payment ------------------/////
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPayment.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.adsPayments = [...state.adsPayments, payload];
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
        const ctgIndex = findIndex(state.adsPayments, { id: payload?.id });
        state.adsPayments[ctgIndex] = payload;
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
        const ctgIndex = findIndex(state.adsPayments, { id: payload?.id });
        state.adsPayments.splice(ctgIndex, 1);
      })
      .addCase(deletePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError } = adsItemsSlice.actions;

export default adsItemsSlice.reducer;
