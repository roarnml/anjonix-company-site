import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/clients"; // your Axios wrapper

// 🔐 Types
type User = {
  id: string;
  email: string;
  role: string;
  orgName?: string;
};

interface AuthState {
  user: User | null;
  accessToken: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// 🪄 Initial State
const initialState: AuthState = {
  user: null,
  accessToken: null,
  status: "idle",
  error: null,
};

// 🧠 Async Thunks

// Regular user login
export const login = createAsyncThunk<
  { user: User; accessToken: string },
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const resp = await api.post("/auth/login", payload);
    return resp.data; // { user, accessToken }
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Login failed");
  }
});

// Admin login
export const loginAdmin = createAsyncThunk<
  { user: User; accessToken: string },
  { email: string; password: string },
  { rejectValue: string }
>("auth/loginAdmin", async (payload, { rejectWithValue }) => {
  try {
    const resp = await api.post("/auth/admin/login", payload);
    return resp.data; // { user, accessToken }
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Admin login failed");
  }
});

// Refresh token
export const refreshToken = createAsyncThunk<
  { accessToken: string },
  void,
  { rejectValue: string }
>("auth/refresh", async (_, { rejectWithValue }) => {
  try {
    const resp = await api.post("/auth/refresh");
    return resp.data;
  } catch {
    return rejectWithValue("Token refresh failed");
  }
});

// 🧩 Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state: AuthState) {
      state.user = null;
      state.accessToken = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // 🌀 Normal Login Flow
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    // 👑 Admin Login Flow
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    // 🔄 Token Refresh
    builder
      .addCase(refreshToken.fulfilled, (state, action: PayloadAction<{ accessToken: string }>) => {
        state.accessToken = action.payload.accessToken;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.accessToken = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
