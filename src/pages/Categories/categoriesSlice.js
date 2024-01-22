import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../config/Api";
import { findIndex } from "lodash";

export const getAllCategories = createAsyncThunk(
  "categories/getAll",
  async (body = {}) => {
    const response = await Api.get("/category");
    return response.data;
  }
);

export const createCategory = createAsyncThunk(
  "categories/create",
  async (body) => {
    const response = await Api.post("/category", body);
    return response.data;
  }
);

export const updateCategory = createAsyncThunk(
  "categories/update",
  async (body) => {
    const response = await Api.put(`/category/${body?.id}`, body);
    return response.data;
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (body) => {
    const response = await Api.delete(`/category/${body?.id}`);
    return response.data;
  }
);

export const getAllStoreCategories = createAsyncThunk(
  "categories/getAllStore",
  async (body = {}) => {
    const response = await Api.get("/categoryStore");
    return response.data;
  }
);

export const createStoreCategory = createAsyncThunk(
  "categories/createStore",
  async (body) => {
    const response = await Api.post("/categoryStore", body);
    return response.data;
  }
);

export const updateStoreCategory = createAsyncThunk(
  "categories/updateStore",
  async (body) => {
    const response = await Api.put(`/categoryStore/${body?.id}`, body);
    return response.data;
  }
);

export const deleteStoreCategory = createAsyncThunk(
  "categories/deleteStore",
  async (body) => {
    const response = await Api.delete(`/categoryStore/${body?.id}`);
    return response.data;
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: null,
    storeCategories: null,
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
      ///------------ GET Categories ------------------/////
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload?.content;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ CREATE Categories ------------------/////
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.categories = [...state.categories, payload];
        console.log(state.categories);
        console.log(payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ delete Categories ------------------/////
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, { payload }) => {
        state.loading = false;
        const ctgIndex = findIndex(state.categories, { id: payload?.id });
        state.categories.splice(ctgIndex, 1);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ UPDATE Categories ------------------/////
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, { payload }) => {
        state.loading = false;
        const ctgIndex = findIndex(state.categories, { id: payload?.id });
        payload.itemCount = state.categories[ctgIndex]?.itemCount;
        state.categories[ctgIndex] = payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ GET Categories ------------------/////
      .addCase(getAllStoreCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllStoreCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.storeCategories = action.payload?.content;
      })
      .addCase(getAllStoreCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ CREATE Categories ------------------/////
      .addCase(createStoreCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createStoreCategory.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.storeCategories = [...state.storeCategories, payload];
        console.log(payload);
      })
      .addCase(createStoreCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ delete Categories ------------------/////
      .addCase(deleteStoreCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStoreCategory.fulfilled, (state, { payload }) => {
        state.loading = false;
        const ctgIndex = findIndex(state.storeCategories, { id: payload?.id });
        state.storeCategories.splice(ctgIndex, 1);
      })
      .addCase(deleteStoreCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ UPDATE Categories ------------------/////
      .addCase(updateStoreCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStoreCategory.fulfilled, (state, { payload }) => {
        state.loading = false;
        const ctgIndex = findIndex(state.storeCategories, { id: payload?.id });
        payload.itemCount = state.storeCategories[ctgIndex]?.itemCount;
        state.storeCategories[ctgIndex] = payload;
      })
      .addCase(updateStoreCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError } = categoriesSlice.actions;

export default categoriesSlice.reducer;
