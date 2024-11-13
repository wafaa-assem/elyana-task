import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const sendData = createAsyncThunk("partner/sendData",
  async (payload, { rejectWithValue }) => {
    return await axios
      .post("https://elyana-backend.web-allsafeeg.com/api/v1/be-partner", payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
       console.log("response", response);
       
        return response;
      })
      .catch((error) => {
        console.log("error",error);
        
        return rejectWithValue(error);
      });
  })



// crate slice
const partnerSlice = createSlice({
    name:"partner",
    initialState:{
        isLoading : false,
        isError : false,
        msg:null,
    },
    extraReducers: (builder)=>{
        builder.addCase(sendData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            console.log("el data sent", action.payload.data.message);
            state.msg = action.payload.data.message;
          });
          builder.addCase(sendData.pending, (state) => {
            state.isLoading = true;
          });
          builder.addCase(sendData.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = action.payload.response.data.message;
          });
    },
});

export default partnerSlice.reducer;

