import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: [],
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.notification = [...state.notification, action.payload];
    },
    removeNotification: (state) => {
      state.notification = [];
    },
  },
});

export const { setNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;

export const notification = (state) => state.notification;
