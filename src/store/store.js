import { configureStore } from "@reduxjs/toolkit";
import bigArticleReducer from "./bigArticlesSlice";
import articlesReducer from "./articlesSlice";
import registerReducer from "./userRegisterSlice";
import loginReducer from "./userLoginSlice";
import updateUserReducer from "./updateUser.slice";
import updateFormReducer from "./updateFormSlice";
import newFormReducer from "./newArticleFormSlice";
export default configureStore({
  reducer: {
    bigArticleReducer,
    articlesReducer,
    registerReducer,
    loginReducer,
    updateUserReducer,
    updateFormReducer,
    newFormReducer,
  },
});
