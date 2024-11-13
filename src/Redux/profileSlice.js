import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const token = "108|OjXXmQYxie7MXSMD6yrSPkcD27CJOw4JFqPMkycg9f71c950";

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (_, { rejectWithValue }) => {
    return await axios
      .get("https://elyana-backend.web-allsafeeg.com/api/v1/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("response", response.data.data);
        return response.data.data; // el data rag3a direct hena
      })
      .catch((error) => {
        console.log("error", error);
        return rejectWithValue(error);
      });
  }
);

// create slice
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    isLoading: false,
    isError: false,
    data: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
    });
    builder.addCase(getProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProfile.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default profileSlice.reducer;
