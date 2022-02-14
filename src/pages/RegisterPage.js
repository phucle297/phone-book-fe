import { useFormik } from "formik";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { RegisterAction } from "../redux/actions/AuthenticateActions";
import { REGEX_ASCII } from "../util/setting";
function RegisterPage() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      password: "",
      passwordAgain: "",
      email: "",
      phone: "",
      name: "",
      companyId: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(REGEX_ASCII, "Họ tên phải dúng định dạng")
        .required("Không được bỏ trống"),
      password: Yup.string()
        .required("Không được bỏ trống")
        .min(8, "Ít nhất 8 ký tự"),
      email: Yup.string()
        .email("Không đúng định dạng email")
        .required("Không được bỏ trống"),
      phone: Yup.number()
        .typeError("Chỉ có thể nhập số ")
        .required("Không được bỏ trống"),
      companyId: Yup.number()
        .typeError("Chỉ có thể nhập số ")
        .required("Không được bỏ trống"),
    }),
    onSubmit: (values) => {
      const action = RegisterAction(values);
      dispatch(action);
    },
  });
  return (
    <form action="" onSubmit={formik.handleSubmit} className="account__form">
      <div>
        <p>Email</p>
        <input
          name="email"
          type="email"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.email && formik.touched.email ? (
          <p className=" text-red-500">{formik.errors.email}</p>
        ) : null}
      </div>
      {/* <div>
        <p>Tên đăng nhập</p>
        <input
          type="text"
          className="form-control"
          name="taiKhoan"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.taiKhoan && formik.touched.taiKhoan ? (
          <p className=" text-red-500">{formik.errors.taiKhoan}</p>
        ) : null}
      </div> */}
      <div>
        <p>Mật khẩu</p>
        <input
          name="password"
          type="text"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.password && formik.touched.password ? (
          <p className=" text-red-500">{formik.errors.password}</p>
        ) : null}
      </div>
      <div>
        <p>Nhập lại mật khẩu</p>
        <input
          name="passwordAgain"
          type="text"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.values.password !== formik.values.passwordAgain ? (
          <p className=" text-red-500">Mật khẩu phải trùng nhau</p>
        ) : null}
      </div>
      <div>
        <p>Họ tên</p>
        <input
          name="name"
          type="text"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.name && formik.touched.name ? (
          <p className=" text-red-500">{formik.errors.name}</p>
        ) : null}
      </div>

      <div>
        <p>Số điện thoại</p>
        <input
          name="phone"
          type="text"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.phone && formik.touched.phone ? (
          <p className=" text-red-500">{formik.errors.phone}</p>
        ) : null}
      </div>
      <div>
        <p>Mã công ty</p>
        <input
          name="companyId"
          type="text"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.companyId && formik.touched.companyId ? (
          <p className=" text-red-500">{formik.errors.companyId}</p>
        ) : null}
      </div>
      <br />
      <button className="btn-login bg-red-600 font-bold rounded-md py-1 px-3  hover:bg-red-700">
        Đăng ký
      </button>
      <p className=" mb-0 mt-3">
        Đã có tài khoản?{" "}
        <NavLink
          to="/auth/login"
          className="text-white hover:text-red-600 font-bold"
        >
          Đăng nhập
        </NavLink>
      </p>
    </form>
  );
}

export default memo(RegisterPage);
