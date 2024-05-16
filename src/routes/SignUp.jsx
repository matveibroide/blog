import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import s from "./SignUp.module.css";
import { createNewUser } from "../services/services";
import { useDispatch, useSelector } from "react-redux";
import ServerErrorMessage from "../components/ServerError/ServerErrorMessage";

export default function SignUp() {
  const dispatch = useDispatch();
  const registerSuccess = useSelector(
    (state) => state.registerReducer.registerSuccess
  );
  const error = useSelector((state) => state.registerReducer.error);

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
      firstPassword: "",
      secondPassword: "",
    },
  });

  const [firstPassword, secondPassword] = watch([
    "firstPassword",
    "secondPassword",
  ]);

  const height = Object.keys(errors).length <= 0 ? "50%" : "70%";

  return (
    <div className={s.formContainer}>
      {error ? (
        <ServerErrorMessage error={error} />
      ) : (
        <form
          style={{ height: `${height}` }}
          onSubmit={handleSubmit((data) => {
            const { name, email, firstPassword } = data;

            dispatch(
              createNewUser({
                user: {
                  username: name,
                  email: email,
                  password: firstPassword,
                },
              })
            );

            reset();
          })}
          className={s.form}
        >
          <ul className={s.formInnerWrapper}>
            <h2
              style={{
                margin: "0 auto",
                marginTop: "10%",
              }}
            >
              Create new account
            </h2>

            <li className={s.listItem}>
              <span style={{ fontSize: "14px" }}>Username</span>
              <input
                style={{
                  padding: "4%",
                  color: "#D9D9D9",
                  border: "1px solid #D9D9D9",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
                placeholder="Name"
                type="text"
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
                id=""
              />
              {errors.name?.message ? (
                <p style={{ color: "red" }}>{errors.name?.message}</p>
              ) : null}
            </li>
            <li className={s.listItem}>
              <span style={{ fontSize: "14px" }}>Email</span>
              <input
                style={{
                  padding: "4%",
                  color: "#D9D9D9",
                  border: "1px solid #D9D9D9",
                  borderRadius: "4px",
                }}
                placeholder="Email"
                type="email"
                {...register("email", {
                  required: "This is required field",
                })}
              />
            </li>
            {errors.email?.message ? (
              <p style={{ color: "red" }}>{errors.email?.message}</p>
            ) : null}
            <li className={s.listItem}>
              <span style={{ fontSize: "14px" }}>Password</span>
              <input
                style={{
                  padding: "4%",
                  color: "#D9D9D9",
                  border: "1px solid #D9D9D9",
                  borderRadius: "4px",
                }}
                placeholder="Password"
                type="password"
                {...register("firstPassword", {
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
              />
              {errors.firstPassword?.message ? (
                <p style={{ color: "red" }}>{errors.firstPassword?.message}</p>
              ) : null}
              {firstPassword !== secondPassword ? (
                <p style={{ color: "red" }}>Passwords do not match</p>
              ) : null}
            </li>
            <li className={s.listItem}>
              <span style={{ fontSize: "14px" }}>Repeat password</span>
              <input
                style={{
                  padding: "4%",
                  color: "#D9D9D9",
                  border: "1px solid #D9D9D9",
                  borderRadius: "4px",
                }}
                placeholder="Password"
                type="password"
                {...register("secondPassword", {
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
              />
              {errors.secondPassword?.message ? (
                <p style={{ color: "red" }}>{errors.secondPassword?.message}</p>
              ) : null}
            </li>
            <li>
              <div>
                <input
                  type="checkbox"
                  {...register("checkbox", {
                    required: "You have to agree to the terms of usage",
                  })}
                />
                I agree to the processing of my personal information
              </div>
              {errors.checkbox?.message ? (
                <p style={{ color: "red" }}>{errors.checkbox?.message}</p>
              ) : null}
            </li>

            <button className={s.formBtn} type="submit">
              Create
            </button>
            <div className={s.message}>
              Already have an account?{" "}
              <Link
                to="/sign-in"
                style={{
                  color: "#1890FF",
                  textDecoration: "none",
                }}
              >
                Sign In
              </Link>
              .
            </div>
          </ul>
          {registerSuccess ? (
            <p
              style={{
                color: "#2ed62e",
                margin: "0 auto",
                textAlign: "center",
                backgroundColor: "#fff",
                paddingBottom: "5%",
              }}
            >
              Register completed, try to sign in
            </p>
          ) : null}
        </form>
      )}
    </div>
  );
}
