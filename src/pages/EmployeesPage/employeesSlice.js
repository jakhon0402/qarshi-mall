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

export const createMonthlySalary = createAsyncThunk(
  "employees/createMonthlySalary",
  async (body, { rejectWithValue }) => {
    try {
      const response = await Api.post(`/monthlySalary`, body?.data);
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

export const updateMonthlySalary = createAsyncThunk(
  "employees/updateMonthlySalary",
  async (body, { rejectWithValue }) => {
    try {
      const response = await Api.put(`/monthlySalary/${body?.id}`, body?.data);
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

export const deleteMonthlySalary = createAsyncThunk(
  "employees/deleteMonthlySalary",
  async (body, { rejectWithValue }) => {
    try {
      const response = await Api.delete(`/monthlySalary/${+body?.smId}`);
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

export const createMonthlySalaryPayment = createAsyncThunk(
  "employees/createMonthlySalaryPayment",
  async (body, { rejectWithValue }) => {
    try {
      const response = await Api.post(`/monthlySalaryPayment`, body?.data);
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

export const updateMonthlySalaryPayment = createAsyncThunk(
  "employees/updateMonthlySalaryPayment",
  async (body, { rejectWithValue }) => {
    try {
      const response = await Api.put(
        `/monthlySalaryPayment/${body?.id}`,
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

export const deleteMonthlySalaryPayment = createAsyncThunk(
  "employees/deleteMonthlySalaryPayment",
  async (body, { rejectWithValue }) => {
    try {
      const response = await Api.delete(
        `/monthlySalaryPayment/${+body?.smpId}`
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

export const uploadImage = createAsyncThunk(
  "employees/uploadImage",
  async (body, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("file", body?.file);
    try {
      const response = await Api.post("/fayl/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      let reqBody = { fileEntityId: response?.data?.id, ...body?.workerData };
      const res = await Api.put(`/worker/${reqBody?.id}`, reqBody);

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

const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    employees: null,
    monthlySalaries: null,
    salaryPayments: null,
    employee: null,
    loading: false,
    uploadLoading: false,
    error: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    setSalaryPayments: (state, { payload }) => {
      state.salaryPayments = payload;
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
        state.monthlySalaries = action.payload?.monthlySalaries;
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
      })

      ///------------ CREATE store payment ------------------/////
      .addCase(createMonthlySalary.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMonthlySalary.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.monthlySalaries = [...state.monthlySalaries, payload];
      })
      .addCase(createMonthlySalary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ UPDATE store payment ------------------/////
      .addCase(updateMonthlySalary.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMonthlySalary.fulfilled, (state, { payload }) => {
        state.loading = false;
        const ctgIndex = findIndex(state.monthlySalaries, { id: payload?.id });
        state.monthlySalaries[ctgIndex] = payload;
      })
      .addCase(updateMonthlySalary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ delete payment ------------------/////
      .addCase(deleteMonthlySalary.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMonthlySalary.fulfilled, (state, { payload }) => {
        state.loading = false;
        const ctgIndex = findIndex(state.monthlySalaries, { id: payload?.id });
        state.monthlySalaries.splice(ctgIndex, 1);
      })
      .addCase(deleteMonthlySalary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ CREATE store payment ------------------/////
      .addCase(createMonthlySalaryPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMonthlySalaryPayment.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.salaryPayments = [...state.salaryPayments, payload];
      })
      .addCase(createMonthlySalaryPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ UPDATE store payment ------------------/////
      .addCase(updateMonthlySalaryPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMonthlySalaryPayment.fulfilled, (state, { payload }) => {
        state.loading = false;
        const ctgIndex = findIndex(state.salaryPayments, { id: payload?.id });
        state.salaryPayments[ctgIndex] = payload;
      })
      .addCase(updateMonthlySalaryPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ delete payment ------------------/////
      .addCase(deleteMonthlySalaryPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMonthlySalaryPayment.fulfilled, (state, { payload }) => {
        state.loading = false;
        const ctgIndex = findIndex(state.salaryPayments, { id: payload?.id });
        state.salaryPayments.splice(ctgIndex, 1);
      })
      .addCase(deleteMonthlySalaryPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ UPDATE stores ------------------/////
      .addCase(uploadImage.pending, (state) => {
        state.uploadLoading = true;
      })
      .addCase(uploadImage.fulfilled, (state, { payload }) => {
        state.uploadLoading = false;
        state.employee = payload;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.uploadLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError, setSalaryPayments } = employeesSlice.actions;

export default employeesSlice.reducer;
