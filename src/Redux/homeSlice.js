import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// func that getting data from api
export const getHome = createAsyncThunk(
  "home/getHome",
  async (_, { rejectWithValue }) => {
    return await axios
      .get("https://elyana-backend.web-allsafeeg.com/api/v1/pages/home")
      .then((response) => {
        return response.data.data; // el data rag3a direct hena
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  }
);

// createSlice
const homeSlice = createSlice({
  name: "home",
  initialState: {
    isLoading: false,
    isError: false,
    data:null,
  },
  extraReducers: (builder) => {
    builder.addCase(getHome.fulfilled, (state , action) => {
        state.isLoading = false ;
        state.isError = false ;
        // console.log("ok" , action.payload);
        state.data = action.payload ; 
        
    });
    builder.addCase(getHome.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getHome.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export default homeSlice.reducer;
