import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// create function call api
// getGov
export const getGov = createAsyncThunk(
  "location/getGov",
  async (_, { rejectWithValue }) => {
    return await axios
      .get(
        "https://elyana-backend.web-allsafeeg.com/api/v1/governorates?per_page=-1"
      )
      .then((response) => {
        console.log("response", response);
        return response.data.data; // el data rag3a direct hena
      })
      .catch((error) => {
        console.log("error", error);
        return rejectWithValue(error);
      });
  }
);
// getCities
export const getCities = createAsyncThunk(
  "location/getCities",
  async (id, { rejectWithValue }) => {
    return await axios
      .get(
        `https://elyana-backend.web-allsafeeg.com/api/v1/cities?per_page=-1&filter[governorate_id]=${id}`
      )
      .then((response) => {
        console.log("response", response);
        return response.data.data; // el data rag3a direct hena
      })
      .catch((error) => {
        console.log("error", error);
        return rejectWithValue(error);
      });
  }
);
// getAreas
export const getAreas = createAsyncThunk(
  "location/getAreas",
  async (id, { rejectWithValue }) => {
    return await axios
      .get(
        `https://elyana-backend.web-allsafeeg.com/api/v1/areas?filter[city_id]=${id}`
      )
      .then((response) => {
        console.log("response", response);
        return response.data.data; // el data rag3a direct hena
      })
      .catch((error) => {
        console.log("error", error);
        return rejectWithValue(error);
      });
  }
);

// create slice
const locationSlice = createSlice({
  name: "location",
  initialState: {
    isLoading: false,
    isError: false,
    governorates: [],
    cities: [],
    areas: [],
  },
  extraReducers: function (builder) {
    builder.addCase(getGov.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      console.log("data gat", action.payload); // action shayel el data 3latol ba2a hena
      state.governorates = action.payload;
    });
    builder.addCase(getGov.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getGov.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      console.log("error hena", action);
    });

    builder.addCase(getCities.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      console.log("data gat", action.payload); // action shayel el data 3latol ba2a hena
      state.cities = action.payload;
    });
    builder.addCase(getCities.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCities.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      console.log("error hena", action);
    });

    builder.addCase(getAreas.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      console.log("data ahyyyy", action.payload); // action shayel el data 3latol ba2a hena
      state.areas = action.payload;
    });
    builder.addCase(getAreas.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAreas.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      console.log("error hena ahoo", action);
    });
  },
});

export default locationSlice.reducer;
