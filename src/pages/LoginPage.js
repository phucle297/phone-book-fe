import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";

export default function LoginPage() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Không được bỏ trống")
        .email("Email không hợp lệ"),
      password: Yup.string().required("Không được bỏ trống"),
    }),
    onSubmit: (values) => {
      // const action = LoginAction(values);
      // dispatch(action);
      console.log(values);
    },
  });
  return (
    <form action="" onSubmit={formik.handleSubmit} className="account__form">
      <div>
        <p>Email</p>
        <input
          type="text"
          className="form-control"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.email && formik.touched.email ? (
          <p className=" text-red-500">{formik.errors.email}</p>
        ) : null}
      </div>
      <div>
        <p>Mật khẩu</p>
        <input
          name="password"
          type="password"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.password && formik.touched.password ? (
          <p className=" text-red-500">{formik.errors.password}</p>
        ) : null}
      </div>
      <NavLink
        to="/auth/forgot-password"
        className="text-right font-bold inline-block mt-2"
      >
        Quên mật khẩu
      </NavLink>
      <br />
      <button
        className="btn-login bg-red-600 font-bold rounded-md py-1 px-3 mt-3 hover:bg-red-700"
        type="submit"
      >
        Đăng nhập
      </button>
      <p className="mt-3">
        Chưa có tài khoản?
        <NavLink
          to="/auth/register"
          className="text-red-600 font-bold hover:text-white ml-1"
        >
          Đăng ký
        </NavLink>
      </p>
    </form>
  );
}
