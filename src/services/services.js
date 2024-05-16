import {
  setArticle,
  setDeleted,
  setError,
  setLoading,
} from "../store/bigArticlesSlice";

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

import {
  setUpdateError,
  setUpdateLoading,
  setUpdateSuccess,
} from "../store/updateUser.slice";

import {
  setUser,
  setLoginLoading,
  setLoginError,
} from "../store/userLoginSlice";
import {
  setUpdateFormError,
  setUpdateFormLoading,
  setUpdateFormSuccess,
} from "../store/updateFormSlice";
import {
  setNewFormError,
  setNewFormLoading,
  setNewFormSuccess,
} from "../store/newArticleFormSlice";

/* const BASE = `https://api.realworld.io/api/`; */

const BASE = `https://blog.kata.academy/api/`;

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
  const res = await fetch(`${BASE}/users/login`, {
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

const sentUpdatedUserData = async (data, token) => {
  let res = await fetch(`${BASE}user`, {
    method: "PUT",
    headers: {
      accept: "application/json",
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Couldn't update you account...Received ${res.status}`);
  } else {
    return res.json();
  }
};

export const postArticle = async (data, token) => {
  const res = await fetch(`${BASE}articles`, {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Couldn't update article...Received ${res.status}`);
  } else {
    return res.json();
  }
};

export const likeAnArticle = async (slug, token) => {
  localStorage.setItem(slug, true);
  let res = await fetch(`${BASE}articles/${slug}/favorite`, {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Couldn't like an article...Received ${res.status}`);
  } else {
    return res.json();
  }
};

export const unlikeAnArticle = async (slug, token) => {
  localStorage.removeItem(slug);
  let res = await fetch(`${BASE}articles/${slug}/favorite`, {
    method: "DELETE",
    headers: {
      accept: "application/json",
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(
      `Couldn't delete like from article...Received ${res.status}`
    );
  } else {
    return res.json();
  }
};

export const deleteAnArticle = async (slug, token) => {
  let res = await fetch(`${BASE}articles/${slug}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Couldn't like an article...Received ${res.status}`);
  } else {
    return "has been deleted";
  }
};

const sendUpdatedArticle = async (slug, token, data) => {
  let res = await fetch(`${BASE}/articles/${slug}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Couldn't update...Received ${res.status}`);
  } else {
    return res.json();
  }
};

// ----------thunk creators-------------

export const postNewArticle = (data, token) => {
  return (dispatch) => {
    dispatch(setNewFormLoading(true));
    postArticle(data, token)
      .then(() => {
        dispatch(setNewFormSuccess(true));
      })
      .then(() => {
        setTimeout(() => {
          dispatch(setNewFormSuccess(false));
        }, 2500);
      })
      .catch((e) => dispatch(setNewFormError(e)));
  };
};

export const createNewUser = (data) => {
  return (dispatch) => {
    dispatch(setUserLoading());
    createUser(data)
      .then((data) => {
        dispatch(setUserError(null));
        dispatch(setRegisterSuccess());
      })
      .catch((e) => {
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
        const updatedArticle = JSON.parse(localStorage.getItem(slug))
          ? { ...article, favorited: true }
          : article;
        dispatch(setArticle(updatedArticle));
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
        let likedArticles = [];
        if (Array.isArray(data.articles)) {
          likedArticles = data.articles.map((item) => {
            if (JSON.parse(localStorage.getItem(item?.slug))) {
              return { ...item, favorited: true };
            } else {
              return item;
            }
          });
        }
        dispatch(setArticles(likedArticles));
      })
      .catch((error) => {
        dispatch(setArticlesError(error.message));
      });
  };
};

export const signIn = (data) => {
  return (dispatch) => {
    dispatch(setLoginLoading());
    sendCredentials(data)
      .then((data) => {
        dispatch(setLoginError(null));
        localStorage.setItem("user", JSON.stringify(data));
        dispatch(setUser(data));
      })
      .catch((e) => dispatch(setLoginError(e)));
  };
};

export const updateUser = (data, token) => {
  return (dispatch) => {
    dispatch(setUpdateLoading());
    sentUpdatedUserData(data, token)
      .then((data) => {
        dispatch(setUser(data));
        localStorage.setItem("user", JSON.stringify(data));
        dispatch(setUpdateSuccess(true));
      })
      .then(() => {
        setTimeout(() => {
          console.log('changing success')
          dispatch(setUpdateSuccess(false));
        }, 3000);
      })
      .catch((e) => dispatch(setUpdateError(e)));
  };
};

export const removeArticle = (slug, token) => {
  return (dispatch) => {
    deleteAnArticle(slug, token)
      .then((data) => {
        dispatch(setArticle(null));
        dispatch(setDeleted(true));
      })
      .catch((e) => dispatch(setError(e)));
  };
};

export const updateArticle = (slug, token, data) => {
  return (dispatch) => {
    dispatch(setUpdateFormLoading());
    sendUpdatedArticle(slug, token, data)
      .then((data) => {
        dispatch(setUpdateFormSuccess(true));
        dispatch(setArticle(data));
      })
      .then(() => {
        setTimeout(() => {
          dispatch(setUpdateFormSuccess(false));
        }, 2500);
      })
      .catch((e) => setUpdateFormError(e));
  };
};

export { getArticles, getArticle, fetchArticle, fetchArticles };
