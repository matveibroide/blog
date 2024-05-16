import { useState } from "react";
import s from "./NewArticle.module.css";
import { useForm } from "react-hook-form";
import { postNewArticle, updateArticle } from "../services/services";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";

export default function NewArticle({ type }) {
  const dispatch = useDispatch();
  //newArticle

  const postError = useSelector((state) => state.newFormReducer?.error);
  const postSuccess = useSelector((state) => state.newFormReducer?.postSuccess);
  const postLoading = useSelector((state) => state.newFormReducer?.loading);

  //updateArticle

  const updateError = useSelector((state) => state.updateFormReducer?.error);
  const updateSuccess = useSelector(
    (state) => state.updateFormReducer?.updateSuccess
  );
  const updateLoading = useSelector(
    (state) => state.updateFormReducer?.loading
  );

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      text: "",
    },
  });

  const createId = () => "id" + Math.random().toString(16).slice(2);

  const [tags, setTags] = useState([
    { value: "", clicked: false, id: createId() },
  ]);

  const addTag = (tagName, id) => {
    setTags((prevTags) => {
      const updatedTags = prevTags.map((item) => {
        if (item.id === id) {
          return { ...item, clicked: true, value: tagName };
        } else {
          return item;
        }
      });

      return [...updatedTags, { value: "", clicked: false, id: createId() }];
    });
  };

  const handleChange = (event, id) => {
    const { value } = event.target;

    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, value: value };
        } else {
          return tag;
        }
      });
    });
  };

  const deleteTag = (id) => {
    if (tags.length === 1) {
      setTags([[{ value: null, clicked: false, id: createId() }]]);
      alert("Atleast one tag should remain");
      return;
    }
    setTags((prev) => prev.filter((item) => item.id != id));
  };

  const token = useSelector((state) => state.loginReducer.user?.user?.token);
  const slug = useSelector((state) => state.bigArticleReducer?.slug);

  return (
    <div className={s.formContainer}>
      <form
        className={s.form}
        action=""
        onSubmit={handleSubmit((data) => {
          const { title, description, text } = data;
          const articleTags = tags.reduce((acc, next) => {
            if (next.value !== "") {
              acc.push(next.value);
            }
            return acc;
          }, []);

          if (type === "new") {
            dispatch(
              postNewArticle(
                {
                  article: {
                    title: title,
                    description: description,
                    body: text,
                    tagList: articleTags,
                  },
                },
                token
              )
            );

            reset();
          } else {
            dispatch(
              updateArticle(slug, token, {
                article: {
                  title: title,
                  description: description,
                  body: text,
                  tagList: articleTags,
                },
              })
            );
            reset();
          }
        })}
      >
        <ul className={s.formInnerWrapper}>
          <li>
            <h1 style={{ textAlign: "center" }}>
              {type === "new" ? "Create new article" : "Edit article"}
            </h1>
          </li>
          <li className={s.listItem}>
            Title
            <input
              className={s.formInput}
              {...register("title", {
                required: "Title required",
              })}
              type="text"
              placeholder="Title"
            />
            {errors?.title?.message ? (
              <p style={{ color: "red" }}>{errors?.title?.message}</p>
            ) : null}
          </li>
          <li className={s.listItem}>
            Short description
            <input
              className={s.formInput}
              {...register("description", {
                required: "Description required",
              })}
              type="text"
              placeholder="Description"
            />
            {errors?.description?.message ? (
              <p style={{ color: "red" }}>{errors?.description?.message}</p>
            ) : null}
          </li>
          <li className={s.listItem}>
            Text
            <input
              style={{ height: "168px" }}
              className={s.formInput}
              {...register("text", {
                required: "Body required",
              })}
              type="text"
              placeholder="Text"
            />
            {errors?.text?.message ? (
              <p style={{ color: "red" }}>{errors?.text?.message}</p>
            ) : null}
          </li>
          <li className={s.listItem}>
            Tags
            <ul
              style={{
                width: "80%",
                listStyle: "none",
                padding: "0",
              }}
            >
              {tags.map((item, i) => {
                return (
                  <li className={s.tagsItem} key={item.id}>
                    <input
                      readOnly={item.clicked ? `readonly` : ``}
                      className={s.formInput}
                      onChange={(event) => handleChange(event, item.id)}
                      id={item.id}
                      value={tags[i]?.value || ""}
                      type="text"
                    />
                    <div className={s.tagsBtns}>
                      {!item.clicked ? (
                        <button
                          className={s.formAddBtn}
                          id={item.id}
                          onClick={(e) => {
                            e.preventDefault();

                            addTag(item.value, item.id);
                          }}
                        >
                          Add tag
                        </button>
                      ) : null}
                      <button
                        className={s.formDestroyBtn}
                        onClick={(e) => {
                          e.preventDefault(e);
                          deleteTag(item.id);
                        }}
                        id={item.id}
                      >
                        delete
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </li>
          <li>
            <button className={s.formSubmitBtn}>Send</button>
            {postSuccess ? (
              <p
                style={{
                  color: "green",
                  textAlign: "center",
                }}
              >
                Article created!
              </p>
            ) : null}
            {updateSuccess ? (
              <p
                style={{
                  color: "green",
                  textAlign: "center",
                }}
              >
                Article updated!
              </p>
            ) : null}
            {postError || updateError ? (
              <p
                style={{
                  color: "red",
                  textAlign: "center",
                }}
              >
                Something gone wrong...
              </p>
            ) : null}
            {postLoading || updateLoading ? <Spin /> : null}
          </li>
        </ul>
      </form>
    </div>
  );
}
