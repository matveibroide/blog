import { configureStore } from "@reduxjs/toolkit";
import bigArticleReducer from "./bigArticlesSlice";
import articlesReducer from "./articlesSlice";
import registerReducer from "./userRegisterSlice";
import loginReducer from './userLoginSlice'
export default configureStore({
  reducer: { bigArticleReducer, articlesReducer, registerReducer,loginReducer },
});
