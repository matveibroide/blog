import { setArticle, setError, setLoading } from "../store/bigArticlesSlice";
import {
  setArticles,
  setArticlesError,
  setArticlesLoading,
  setSpinner,
} from "../store/articlesSlice";

import {
  setUserError,
  setUserLoading,
  setRegisterSuccess,
} from "../store/userRegisterSlice";

import {setUser,setLoginLoading,setLoginError} from '../store/userLoginSlice'

const BASE = `https://api.realworld.io/api/`;

const getArticles = async (offset = 0) => {
  let res = await fetch(`${BASE}articles/?offset=${offset}&limit=5`);

  if (!res.ok) {
    throw new Error(`Something gone wrong received ${res.status}`);
  } else {
    const articles = await res.json();
    return articles;
  }
};

const getArticle = async (id) => {
  console.log(id);
  let res = await fetch(`${BASE}articles/${id}`);

  if (!res.ok) {
    throw new Error(`Something gone wrong received ${res.status}`);
  } else {
    return res.json();
  }
};

const createUser = async (data) => {
  const res = await fetch(`${BASE}users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(
      res.status === 422
        ? "Email or username must have been taken"
        : `Couldn't register received status:${res.status}`
    );
  } else {
    return res.json();
  }
};

const sendCredentials = async (credentials) => {
  const res = await fetch(`${BASE}/users/login`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    throw new Error(`Couldn't sign in...Some error happened`);
  } else {
    return res.json();
  }
};

// ----------thunk creators-------------

export const createNewUser = (data) => {
  return (dispatch) => {
    dispatch(setUserLoading());
    createUser(data)
      .then((data) => {
        console.log(data);
        dispatch(setUserError(null))
        dispatch(setRegisterSuccess())
        
      })
      .catch((e) => {
        console.log(e.message);
        dispatch(setUserError(e));
      });
  };
};

const fetchArticle = (slug) => {
  return (dispatch) => {
    dispatch(setLoading());
    getArticle(slug)
      .then((data) => {
        const { article } = data;
        dispatch(setArticle(article));
      })
      .catch((error) => {
        dispatch(setError(error));
      });
  };
};

const fetchArticles = (offset) => {
  return (dispatch) => {
    dispatch(setArticlesLoading());
    getArticles(offset)
      .then((data) => {
        dispatch(setSpinner());
        dispatch(setArticles(data));
      })
      .catch((error) => {
        dispatch(setArticlesError(error.message));
      });
  };
};

export const signIn = (data) => {
  return (dispatch) => {
      dispatch(setLoginLoading())
      sendCredentials(data)
      .then(data => {
        dispatch(setLoginError(null))
        dispatch(setUser(data))
      })
      .catch(e => dispatch(setLoginError(e)))
  };
};

export { getArticles, getArticle, fetchArticle, fetchArticles };
