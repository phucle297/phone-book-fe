import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { getCompanyByIdAction } from "../redux/actions/CompanyAction";
import {
  editContactAction,
  getUserInfoAction,
  uploadAvatarAction,
} from "../redux/actions/UserAction";
import { REGEX_PHONE_NUMBER } from "../util/setting";

export default function InfoPage() {
  const { company } = useSelector((state) => state.CompanyReducer);
  const { userDetail } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  useEffect(async () => {
    const action = getUserInfoAction();
    await dispatch(action);
  }, []);
  useEffect(() => {
    const actionGetCompanyById = getCompanyByIdAction(userDetail.companyId);
    dispatch(actionGetCompanyById);
  }, [userDetail]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userId: userDetail.userId || "",
      address: userDetail.address || "",
      email: userDetail.email || "",
      phone: userDetail.phone || "",
      role: userDetail.role || "",
      avatar: userDetail.avatar || "",
      name: userDetail.name || "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email không được bỏ trống")
        .email("Email không đúng định dạng"),
      name: Yup.string().required("Không được bỏ trống"),
      phone: Yup.string()
        .required("Không được bỏ trống")
        .matches(REGEX_PHONE_NUMBER, "Số điện thoại không đúng định dạng"),
    }),
    onSubmit: (values) => {
      const { address, userId, avatar, email, name, phone } = values;
      const user = { userId, address, avatar, email, name, phone };
      const actionEditContact = editContactAction(user);
      dispatch(actionEditContact);
    },
  });
  const dummyRequest = async ({ file, onSuccess }) => {
    const action = uploadAvatarAction(file);
    await dispatch(action);
    return onSuccess("ok");
  };
  return (
    <div>
      <div className="container mx-auto py-4 mt-5 bg-white rounded">
        <h2 className="text-4xl font-bold">Thông tin cá nhân</h2>
        <div className="container mx-auto">
          <form action="" onSubmit={formik.handleSubmit}>
            <div className="form-group mt-4">
              <p>Mã người dùng</p>
              <input
                className="w-full border p-2 cursor-no-drop"
                name="userId"
                type="text"
                value={formik.values.userId}
                disabled={true}
              />
            </div>
            <div className="form-group mt-4">
              <p>Họ tên</p>
              <input
                className="w-full border p-2"
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <p className=" bg-red-200 m-0">{formik.errors.name}</p>
              ) : null}
            </div>
            <div className="form-group mt-4">
              <p>Email</p>
              <input
                className="w-full border p-2"
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className=" bg-red-200 m-0">{formik.errors.email}</p>
              ) : null}
            </div>
            <div className="form-group mt-4">
              <p>Số điện thoại</p>
              <input
                className="w-full border p-2"
                type="text"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <p className=" bg-red-200 m-0">{formik.errors.phone}</p>
              ) : null}
            </div>
            <div className="form-group mt-4">
              <p>Địa chỉ</p>
              <input
                className="w-full border p-2"
                type="text"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.address && formik.errors.address ? (
                <p className=" bg-red-200 m-0">{formik.errors.address}</p>
              ) : null}
            </div>
            <div className="form-group mt-4">
              <p>Avatar</p>
              <div className=" flex items-center justify-start">
                <img
                  src={
                    formik.values.avatar?.includes("http")
                      ? formik.values.avatar
                      : `https://${formik.values.avatar}`
                  }
                  alt="Avatar"
                  className="rounded-full w-10 h-10 mr-5"
                />
                <Upload maxCount={1} customRequest={dummyRequest}>
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </div>
            </div>
            <div className="form-group mt-4">
              <p>Mã loại người dùng</p>
              <input
                className="w-full border p-2 cursor-no-drop"
                type="text"
                name="role"
                value={formik.values.role}
                disabled={true}
              />
            </div>
            <div className="form-group mt-4">
              <p>Công ty</p>
              <p className="bg-gray-100 border p-2 cursor-no-drop">
                {company?.companyName}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded"
                type="submit"
              >
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
