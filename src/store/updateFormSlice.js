import { createSlice } from "@reduxjs/toolkit";

export const updateFormSlice = createSlice({
  name: "updateForm",
  initialState: {
    error: null,
    loading: false,
    updateSuccess: null,
  },
  reducers: {
    setUpdateFormError: (state, action) => {
      return { ...state, error: action.payload, loading: false };
    },
    setUpdateFormLoading: (state) => {
      return { ...state, loading: true };
    },

    setUpdateFormSuccess: (state, action) => {
      return {
        ...state,
        updateSuccess: action.payload,
        loading: false,
        error: false,
      };
    },
  },
});

export const {
  setUpdateFormError,
  setUpdateFormLoading,
  setUpdateFormSuccess,
} = updateFormSlice.actions;
export default updateFormSlice.reducer;
