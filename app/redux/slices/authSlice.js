import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("userInfo")) || null
    : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userInfoFromStorage,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
