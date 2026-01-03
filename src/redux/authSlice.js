import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  isAgent: false, // <--- New Flag
  user: null,    
  pudoId: null,  
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      // Check if the payload says this is an agent
      state.isAgent = action.payload.isAgent || false;
    },
    setPudoLocation: (state, action) => {
      state.pudoId = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.isAgent = false;
      state.user = null;
      state.pudoId = null;
    },
  },
});

export const { loginSuccess, setPudoLocation, logout } = authSlice.actions;
export default authSlice.reducer;
