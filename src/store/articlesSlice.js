import { createSlice } from "@reduxjs/toolkit";

const articleSlice = createSlice({
  name: "articlesList",
  initialState: {
    articles: [],
    loading: false,
    error: false,
    errorMessage: null,
    spinner: true,
    offset:0
  },
  reducers: {
    setArticles: (state, action) => {
      return { ...state, articles: action.payload, loading: false };
    },
    setArticlesLoading: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    setArticlesError: (state, action) => {
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload,
      };
    },

    setSpinner: (state) => {
      return { ...state, spinner: false };
    },

    setStoreOffset:(state,action) => {
      return {...state,offset:action.payload}
    }
   
  },
});

export const { setArticles, setArticlesLoading, setArticlesError, setSpinner,setStoreOffset} =
  articleSlice.actions;
export default articleSlice.reducer;
