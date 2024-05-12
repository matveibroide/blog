import { createSlice } from "@reduxjs/toolkit";

export const bigArticleSlice = createSlice({
  name: "articles",
  initialState: {
    slug: null,
    currentArticle: null,
    loading: false,
    error: null,
    deleted:false
  },
  reducers: {
    setSlug: (state, action) => {
      state.slug = action.payload;
    },
    setArticle: (state, action) => {
      state.deleted = false
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

    setDeleted: (state) => {
      console.log('setDeleted()')
      state.deleted = true
    }
  },
});

export const { setArticle, setError, setLoading, setSlug, setDeleted } =
  bigArticleSlice.actions;

export default bigArticleSlice.reducer;
