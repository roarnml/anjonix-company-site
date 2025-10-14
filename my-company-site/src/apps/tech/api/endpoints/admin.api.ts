import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../clients"; // Axios instance

export const fetchAdminOverview = createAsyncThunk("dashboard/admin", async () => {
  const response = await api.get("/admin/overview");
  return response.data;
});

export const fetchManagementOverview = createAsyncThunk("dashboard/management", async () => {
  const response = await api.get("/management/overview");
  return response.data;
});

export const fetchInstructorOverview = createAsyncThunk("dashboard/instructor", async () => {
  const response = await api.get("/instructor/overview");
  return response.data;
});

export const fetchLearnerOverview = createAsyncThunk("dashboard/learner", async () => {
  const response = await api.get("/learner/overview");
  return response.data;
});
// You can add more endpoints as needed