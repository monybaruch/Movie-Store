import Header from "./commonComponents/Header";
import Input from "./commonComponents/Input";
import "../componentStyles/Button.css";
import Joi from "joi";
import { useFormik } from "formik";
import { useState } from "react";
import { JoiValidate } from "../utilities/JoiValidate";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth-context";

const Login = ({ redirect }) => {
  const [error, SetError] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate: JoiValidate({
      email: Joi.string()
        .min(6)
        .required()
        .email({ tlds: { allow: false } }),
      password: Joi.string().min(6).required(),
    }),
    async onSubmit(values) {
      try {
        await login(values);
        toast.warn("login successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        if (redirect) {
          navigate(redirect);
        }
      } catch ({ response }) {
        if (response.status === 400) {
          SetError(response.data);
        }
      }
    },
  });
  return (
    <>
      <Header
        title={
          <>
            Blockbuster <i className="bi bi-film"></i> App
          </>
        }
        description="Login page"
      />
      <form
        noValidate
        autoComplete="off"
        className="w-50 mx-auto"
        onSubmit={form.handleSubmit}
      >
        {error && <div className="alert alert-danger">{error}</div>}
        <Input
          label="email"
          type="email"
          error={form.touched.email && form.errors.email}
          {...form.getFieldProps("email")}
        />
        <Input
          label="password"
          type="password"
          error={form.touched.password && form.errors.password}
          {...form.getFieldProps("password")}
        />
        <div className="my-4">
          <button
            type="submit"
            disabled={!form.isValid}
            className="button-main button1"
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
