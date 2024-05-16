import s from "./Profile.module.css";
import { updateUser } from "../services/services";
import { Form, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ServerErrorMessage from "../components/ServerError/ServerErrorMessage";
import { Spin } from "antd";
export default function Profile() {
  const dispatch = useDispatch();

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      avatar: "",
    },
  });

  const token = useSelector((state) => state.loginReducer?.user?.user?.token);
  const error = useSelector((state) => state.updateUserReducer?.error);
  const updateSuccess = useSelector(
    (state) => state.updateUserReducer?.updateSuccess
  );
  const loading = useSelector((state) => state.updateUserReducer?.loading);
  console.log(loading)

  return (
    <div className={s.formContainer}>
      {error ? (
        <ServerErrorMessage error={error} />
      ) : (
        <form
          onSubmit={handleSubmit((data) => {
            const { name, email, password, avatar } = data;

            dispatch(
              updateUser(
                {
                  user: {
                    username: name,
                    email: email,
                    bio: password,
                    image: avatar,
                  },
                },
                token
              )
            );

            reset();
          })}
          className={s.form}
          action=""
        >
          <ul className={s.formInnerWrapper}>
            <li>
              <h2 style={{ textAlign: "center" }}>Edit profile</h2>
            </li>
            <li className={s.listItem}>
              <p>Username</p>
              <input
                className={s.formInput}
                {...register("name", {
                  required: "This is required field",
                  minLength: {
                    value: 3,
                    message: "The min length is 3 symbols",
                  },
                  maxLength: {
                    value: 20,
                    message: "The max length is 20 symbols",
                  },
                })}
                placeholder="Username"
                type="text"
              />
              {errors.name?.message ? (
                <p style={{ color: "red" }}>{errors.name?.message}</p>
              ) : null}
            </li>
            <li className={s.listItem}>
              <p>Email address</p>
              <input
                className={s.formInput}
                {...register("email")}
                placeholder="Email address"
                type="text"
              />
            </li>
            <li className={s.listItem}>
              <p>Bio</p>
              <input
                className={s.formInput}
                {...register("password", {
                  required: "This is required field",
                  minLength: {
                    value: 6,
                    message: "The min length is 6 symbols",
                  },
                  maxLength: {
                    value: 40,
                    message: "The max value is 40 symbols",
                  },
                })}
                placeholder="Bio"
                type="text"
              />
              {errors.password?.message ? (
                <p style={{ color: "red" }}>{errors.password?.message}</p>
              ) : null}
            </li>
            <li className={s.listItem}>
              <p>Avatar image(url)</p>
              <input
                className={s.formInput}
                {...register("avatar")}
                placeholder="Avatar image"
                type="url"
              />
            </li>
            <li>
              {loading ? (
                <Spin />
              ) : (
                <button className={s.btnSubmit} type="submit">
                  Save
                </button>
              )}
            </li>
            {updateSuccess ? (
              <li>
                <p style={{ color: "green" }}>Updated successfully</p>
              </li>
            ) : null}
          </ul>
        </form>
      )}
    </div>
  );
}
