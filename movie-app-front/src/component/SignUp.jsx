import Header from "./commonComponents/Header";
import Input from "./commonComponents/Input";
import "../componentStyles/Button.css";
import Joi from "joi";
import { useFormik } from "formik";
import { useState } from "react";
import { JoiValidate } from "../utilities/JoiValidate";
import { createUser } from "../services/usersService";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth-context";

const SignUp = ({ redirect }) => {
  const navigate = useNavigate();
  const [error, SetError] = useState("");
  const { user } = useAuth();
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: JoiValidate({
      name: Joi.string().min(2).required(),
      email: Joi.string()
        .min(6)
        .required()
        .email({ tlds: { allow: false } }),
      password: Joi.string().min(6).required(),
    }),
    async onSubmit(values) {
      try {
        await createUser({ ...values, vipMember: false });
        toast.warn("registered successfully!", {
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
        description="Sign-up page"
      />
      <form
        noValidate
        autoComplete="off"
        className="w-50 mx-auto"
        onSubmit={form.handleSubmit}
      >
        {error && <div className="alert alert-danger">{error}</div>}
        <Input
          label="name"
          type="text"
          error={form.touched.name && form.errors.name}
          {...form.getFieldProps("name")}
        />
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
            Register
          </button>
          <button
            onClick={form.resetForm}
            className="button-main button1"
            type="reset"
          >
            Reset Form
          </button>
        </div>
      </form>
    </>
  );
};
export default SignUp;
