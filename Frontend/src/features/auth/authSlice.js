import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const initialState = {
  token: null,
  userId: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const accessToken = action.payload;
      const { UserInfo } = jwtDecode(accessToken);
      state.token = accessToken;
      state.userId = UserInfo.userId;
    },
    logout: (state) => {
      state.token = null;
      state.userId = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

export const currentToken = (state) => state.auth.token;
export const currentUser = (state) => state.auth.userId;
