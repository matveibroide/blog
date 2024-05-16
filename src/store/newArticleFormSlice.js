import { createSlice } from "@reduxjs/toolkit";

export const newArticleFormSlice = createSlice({
  name: "newForm",
  initialState: {
    error: null,
    loading: false,
    postSuccess: null,
  },
  reducers: {
    setNewFormError: (state, action) => {
      return { ...state, error: action.payload, loading: false };
    },
    setNewFormLoading: (state) => {
      return { ...state, loading: true };
    },

    setNewFormSuccess: (state, action) => {
      return {
        ...state,
        postSuccess: action.payload,
        loading: false,
        error: false,
      };
    },
  },
});

export const { setNewFormError, setNewFormLoading, setNewFormSuccess } =
  newArticleFormSlice.actions;
export default newArticleFormSlice.reducer;
