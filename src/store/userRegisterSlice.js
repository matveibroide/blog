import { createSlice } from "@reduxjs/toolkit";

export const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState: {
    registerSuccess: false,
    loading: false,
    error: null,
  },
  reducers: {
    setUserLoading: (state) => {
      return { ...state, loading: true };
    },

    setUserError: (state, action) => {
      return {
        ...state,
        error: action.payload,
        loading: false,
        registerSuccess: false,
      };
    },

    setRegisterSuccess: (state) => {
      return { ...state, loading: false, registerSuccess: true };
    },
  },
});

export const { setUserError, setUserLoading, setRegisterSuccess } =
  userRegisterSlice.actions;
export default userRegisterSlice.reducer;
