import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const token = localStorage.getItem("userToken");

export const updateProfileMethod = createAsyncThunk(
  "updateProfile/updateProfileMethod",
  async (payload, { rejectWithValue }) => {
    return await axios
      .post(
        "https://elyana-backend.web-allsafeeg.com/api/v1/auth/update-profile",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("updated", res);
        return res;
      })
      .catch((error) => {
        return rejectWithValue(error); // used with createAsyncThunk to handle errors => 3shan yed5ol fel rejected case
      });
  }
);

const updateProfileSlice = createSlice({
  name: "updateProfile",
  initialState: {
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(updateProfileMethod.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(updateProfileMethod.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProfileMethod.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default updateProfileSlice.reducer;
