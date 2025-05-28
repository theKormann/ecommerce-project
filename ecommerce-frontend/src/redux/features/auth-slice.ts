import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  nome: string;
  email: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{user: User, token: string}>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    loadFromStorage: (state) => {
      return state; 
    }
  }
});

export const { login, logout, loadFromStorage } = authSlice.actions;
export default authSlice.reducer;