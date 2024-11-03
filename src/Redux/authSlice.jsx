import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const registerMethod = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    return await axios
      .post(
        "https://elyana-backend.web-allsafeeg.com/api/v1/register",
        payload,
        {
          headers: {
            Accept: "application/json",
            "Accept-Language": "ar",
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return rejectWithValue(error); // used with createAsyncThunk to handle errors => 3shan yed5ol fel rejected case
      });
  }
);

export const loginMethod = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    return await axios
      .post("https://elyana-backend.web-allsafeeg.com/api/v1/login", payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        localStorage.setItem('userToken', response?.data?.data)
        return response;
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  }
);

export const logoutMethod = createAsyncThunk(
  "auth/logout",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().authReducer.userToken; // get token
    return await axios
      .post(
        "https://elyana-backend.web-allsafeeg.com/api/v1/auth/logout",
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    userToken: localStorage.getItem("userToken") || null,
    isLoading: false,
    isError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerMethod.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.userToken = action?.payload?.data?.data;
      console.log(state.userToken); // el token gh blslama
    });
    builder.addCase(registerMethod.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerMethod.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      console.log("there is error", action.payload.response);
    });

    builder.addCase(loginMethod.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      console.log("login sa7", action.payload.data.data);
      console.log("userrr", state.userToken); // intial before setting token
      state.userToken = action.payload.data.data; // set token == as a rerender
      console.log("userrr", state.userToken); // token after setting
    });
    builder.addCase(loginMethod.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginMethod.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload.response.data.message;
      console.log("login error", action.payload.response.data.message);
    });

    builder.addCase(logoutMethod.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.userToken = null;
      localStorage.removeItem("userToken");
    });
    builder.addCase(logoutMethod.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      console.log("error", action);
    });
  },
});

export default authSlice.reducer;
