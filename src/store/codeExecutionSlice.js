import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isExecuting: false,
};

const codeExecutionSlice = createSlice({
  name: 'execution',
  initialState,
  reducers: {
    startExecution: (state) => {
      state.isExecuting = true;
    },
    endExecution: (state) => {
      state.isExecuting = false;
    },
  },
});

export const { startExecution, endExecution } = codeExecutionSlice.actions;
export default codeExecutionSlice.reducer;
