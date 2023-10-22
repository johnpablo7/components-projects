import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counter: 50,
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    increment: (state) => {
      state.counter += 1;
    },
    decrement: (state) => {
      state.counter -= 1;
    },
  },
});

export const { increment, decrement } = taskSlice.actions;
export default taskSlice.reducer;
