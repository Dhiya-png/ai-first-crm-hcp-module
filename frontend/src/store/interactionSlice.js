import { createSlice } from "@reduxjs/toolkit";

const interactionSlice = createSlice({
  name: "interaction",

  initialState: {
    selectedInteraction: null,

    // Data extracted by the AI Assistant
    aiInteraction: null,
  },

  reducers: {

    // Existing CRUD edit
    setSelectedInteraction(state, action) {
      state.selectedInteraction = action.payload;
    },

    clearSelectedInteraction(state) {
      state.selectedInteraction = null;
    },

    // New - AI fills the form
    setAIInteraction(state, action) {
      state.aiInteraction = action.payload;
    },

    clearAIInteraction(state) {
      state.aiInteraction = null;
    },

  },
});

export const {
  setSelectedInteraction,
  clearSelectedInteraction,
  setAIInteraction,
  clearAIInteraction,
} = interactionSlice.actions;

export default interactionSlice.reducer;