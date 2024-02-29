import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProfilePicture: null,
  userName: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setuserProfilePicture: (state, action) => {
      state.userProfilePicture = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { setuserProfilePicture, setUserName } = userSlice.actions;
export default userSlice.reducer;

export const currentUserProfilePicture = (state) =>
  state.user.userProfilePicture;
export const currentUserName = (state) => state.user.userName;
