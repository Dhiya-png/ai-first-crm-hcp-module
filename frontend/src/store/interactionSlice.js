import { createSlice } from "@reduxjs/toolkit";

const interactionSlice = createSlice({
  name: "interaction",
  initialState: {
    selectedInteraction: null,
  },
  reducers: {
    setSelectedInteraction(state, action) {
      state.selectedInteraction = action.payload;
    },
    clearSelectedInteraction(state) {
      state.selectedInteraction = null;
    },
  },
});

export const {
  setSelectedInteraction,
  clearSelectedInteraction,
} = interactionSlice.actions;

export default interactionSlice.reducer;