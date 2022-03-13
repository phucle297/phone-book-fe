import { Button, Modal, Upload } from "antd";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModalAction,
  uploadAvatarAction,
} from "../../redux/actions/UserAction";
import * as Yup from "yup";
import "./ModalAddContact.css";
import { REGEX_PHONE_NUMBER } from "../../util/setting";
import { UploadOutlined } from "@ant-design/icons";

export default function ModalAddContact() {
  const { modal } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const handleOk = () => {
    const action = closeModalAction();
    dispatch(action);
  };
  const handleCancle = () => {
    const action = closeModalAction();
    dispatch(action);
  };
  const { companies } = useSelector((state) => state.CompanyReducer);
  const formik = useFormik({
    initialValues: {
      userId: "",
      address: "",
      email: "",
      phone: "",
      role: "",
      avatar: "",
      name: "",
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
      console.log(values);
    },
  });
  const dummyRequest = async ({ file, onSuccess }) => {
    const action = uploadAvatarAction(file);
    await dispatch(action);
    return onSuccess("ok");
  };
  return (
    <>
      <Modal
        title={modal.title}
        visible={modal.visible && modal.title === "Thêm liên hệ"}
        onOk={() => handleOk()}
        onCancel={() => handleCancle()}
        width={1000}
        footer={[
          <Button key="cancle" onClick={handleCancle}>
            Hủy bỏ
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            // onClickCapture={formik.handleSubmit}
          >
            Xác nhận
          </Button>,
        ]}
      >
        <form action="" onSubmit={formik.handleSubmit}>
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
            {/* <p className="bg-gray-100 border p-2 cursor-no-drop">
              {company?.companyName}
            </p> */}
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
      </Modal>
    </>
  );
}
