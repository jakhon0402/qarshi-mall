import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../config/Api";
import { findIndex } from "lodash";
import { dailyData, monthlyData } from "../../utils/statistics";

export const getAllIncomes = createAsyncThunk(
  "incomes/getAll",
  async (body = {}) => {
    const response = await Api.get("/inputitem");
    return response.data;
  }
);

export const getAllIncomesByDateRange = createAsyncThunk(
  "incomes/getAllByDateRange",
  async (body) => {
    const response = await Api.get(
      `/inputitem/find-by-date-range?startDate=${body?.startDate}&endDate=${body?.endDate}`
    );
    return response.data;
  }
);

export const getIncomeTotalPrice = createAsyncThunk(
  "incomes/getIncomeTotalPrice",
  async (body = {}) => {
    const response = await Api.get("/inputitem/total-price");
    return response.data;
  }
);

export const createIncome = createAsyncThunk("incomes/create", async (body) => {
  const response = await Api.post("/inputitem", body);
  return response.data;
});

export const updateIncome = createAsyncThunk("incomes/update", async (body) => {
  const response = await Api.put(`/inputitem/${body?.id}`, body);
  return response.data;
});

export const deleteIncome = createAsyncThunk("incomes/delete", async (body) => {
  const response = await Api.delete(`/inputitem/${body?.id}`);
  return response.data;
});

const incomesSlice = createSlice({
  name: "incomes",
  initialState: {
    incomes: null,
    totalPrice: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    clearIncomes: (state) => {
      state.incomes = null;
    },
  },
  extraReducers: (builder) => {
    builder
      ///------------ GET Incomes ------------------/////
      .addCase(getAllIncomes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllIncomes.fulfilled, (state, action) => {
        state.loading = false;
        state.incomes = action.payload?.content?.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      })
      .addCase(getAllIncomes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ GET Incomes By Date Range ------------------/////
      .addCase(getAllIncomesByDateRange.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllIncomesByDateRange.fulfilled, (state, action) => {
        state.loading = false;
        let arr = action.payload;
        arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        state.incomes = arr;
      })
      .addCase(getAllIncomesByDateRange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ GET Incomes Total price ------------------/////
      .addCase(getIncomeTotalPrice.pending, (state) => {
        state.loading = true;
      })
      .addCase(getIncomeTotalPrice.fulfilled, (state, action) => {
        state.loading = false;
        state.totalPrice = action.payload;
      })
      .addCase(getIncomeTotalPrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ CREATE Incomes ------------------/////
      .addCase(createIncome.pending, (state) => {
        state.loading = true;
      })
      .addCase(createIncome.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.incomes = [...state.incomes, payload];
        console.log(state.incomes);
        console.log(payload);
      })
      .addCase(createIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ delete Incomes ------------------/////
      .addCase(deleteIncome.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteIncome.fulfilled, (state, { payload }) => {
        state.loading = false;
        const ctgIndex = findIndex(state.incomes, { id: payload?.id });
        state.incomes.splice(ctgIndex, 1);
      })
      .addCase(deleteIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ UPDATE Incomes ------------------/////
      .addCase(updateIncome.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateIncome.fulfilled, (state, { payload }) => {
        state.loading = false;
        const ctgIndex = findIndex(state.incomes, { id: payload?.id });
        // payload.itemCount = state.incomes[ctgIndex]?.itemCount;
        state.incomes[ctgIndex] = payload;
      })
      .addCase(updateIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError, clearIncomes } = incomesSlice.actions;

export default incomesSlice.reducer;
