import { createSlice } from "@reduxjs/toolkit";
import { mockUsers } from "@/api/mockUsers";


const storedUsers = JSON.parse(localStorage.getItem("mockUsers")) || [];
const allUsers = [...mockUsers, ...storedUsers];
const savedUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: allUsers,
    loggedInUser: savedUser,
    error: null,
  },
  reducers: {
    login: (state, action) => {
      const { username, email, password, role } = action.payload;
      const user = state.users.find(
        (u) =>
          u.username === username &&
          u.email === email &&
          u.password === password &&
          u.role === role
      );

      if (user) {
        state.loggedInUser = user;
        state.error = null;
        localStorage.setItem("loggedInUser", JSON.stringify(user));
      } else {
        state.error = "Invalid credentials";
      }
    },

    logout: (state) => {
      state.loggedInUser = null;
    },

    noError:(state)=>{
        state.error=null;
    }
  },
});

export const { login, logout,noError } = userSlice.actions;
export default userSlice.reducer;
