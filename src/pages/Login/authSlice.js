import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../config/Api";
import { toast } from "react-toastify";

export const login = createAsyncThunk(
  "auth/login",
  async (body, { rejectWithValue }) => {
    try {
      const response = await Api.post("/account/authenticate", body?.data);
      body?.navigate();
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCurrentUser = createAsyncThunk("auth/me", async (body) => {
  const response = await Api.get("/account/current-user");
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoggedIn: false,
    loading: false,
    error: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        localStorage.setItem("token", payload?.token);
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error("Login yoki parol xato!");
        state.error = payload;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
      })
      .addCase(getCurrentUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { resetError, logout } = authSlice.actions;

export default authSlice.reducer;
