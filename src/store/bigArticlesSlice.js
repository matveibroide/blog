import { createSlice } from "@reduxjs/toolkit";

export const bigArticleSlice = createSlice({
  name: "articles",
  initialState: {
    slug: null,
    currentArticle: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSlug: (state, action) => {
      state.slug = action.payload;
    },
    setArticle: (state, action) => {
      state.currentArticle = action.payload;
      state.loading = false;
      state.error = null;
    },

    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
  },
});

export const { setArticle, setError, setLoading, setSlug } =
  bigArticleSlice.actions;

export default bigArticleSlice.reducer;
