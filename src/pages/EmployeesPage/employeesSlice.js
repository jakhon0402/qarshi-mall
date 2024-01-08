import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../config/Api";
import { findIndex } from "lodash";

export const getAllEmployees = createAsyncThunk(
  "employees/getAll",
  async (body = {}) => {
    const response = await Api.get("/worker");
    return response.data;
  }
);

export const getEmployee = createAsyncThunk("employees/get", async (body) => {
  const response = await Api.get(`/worker/${body}`);
  return response.data;
});

export const createEmployee = createAsyncThunk(
  "employees/create",
  async (body) => {
    const response = await Api.post("/worker", body);
    return response.data;
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/update",
  async (body) => {
    const response = await Api.put(`/worker/${body?.id}`, body);
    return response.data;
  }
);

export const updateEmployeeSalary = createAsyncThunk(
  "employees/updateSalary",
  async (body) => {
    const response = await Api.put(
      `/worker/${body?.id}/update-salary?newSalary=${body?.newSalary}`,
      body
    );
    return response.data;
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/delete",
  async (body) => {
    const response = await Api.delete(`/worker/${body?.id}`);
    return response.data;
  }
);

const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    employees: null,
    employee: null,
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
      ///------------ GET employees ------------------/////
      .addCase(getAllEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload?.content;
      })
      .addCase(getAllEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ GET employee ------------------/////
      .addCase(getEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = action.payload;
        state.employee.salaryChanges.sort(
          (a, b) => new Date(b.changeDate) - new Date(a.changeDate)
        );
      })
      .addCase(getEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ CREATE employees ------------------/////
      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEmployee.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.employees = [...state.employees, payload];
        console.log(state.employees);
        console.log(payload);
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ delete employees ------------------/////
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEmployee.fulfilled, (state, { payload }) => {
        state.loading = false;
        const ctgIndex = findIndex(state.employees, { id: payload?.id });
        state.employees.splice(ctgIndex, 1);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ UPDATE employees ------------------/////
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEmployee.fulfilled, (state, { payload }) => {
        state.loading = false;
        const ctgIndex = findIndex(state.employees, { id: payload?.id });
        payload.itemCount = state.employees[ctgIndex]?.itemCount;
        state.employees[ctgIndex] = payload;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ UPDATE employee Salary ------------------/////
      .addCase(updateEmployeeSalary.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEmployeeSalary.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.employee = payload;

        state.employee.salaryChanges.sort(
          (a, b) => new Date(b.changeDate) - new Date(a.changeDate)
        );
      })
      .addCase(updateEmployeeSalary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError } = employeesSlice.actions;

export default employeesSlice.reducer;
