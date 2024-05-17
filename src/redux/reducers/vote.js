import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  votes: [
    {
      label: "Pasangan no 1",
      votes: 0,
    },
    {
      label: "Pasangan no 1",
      votes: 0,
    },
    {
      label: "Pasangan no 1",
      votes: 0,
    },
  ],
  isLoading: false,
};

const authSlice = createSlice({
  name: "vote",
  initialState,
  reducers: {
    setVotes: (state, action) => {
      state.votes = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setVotes, setIsLoading } = authSlice.actions;

export default authSlice.reducer;
