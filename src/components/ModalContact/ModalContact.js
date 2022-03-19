import { UploadOutlined } from "@ant-design/icons";
import { Button, Modal, Upload } from "antd";
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  addAvatarContactAction,
  closeModalAction,
  editContactAction,
} from "../../redux/actions/UserAction";
import { REGEX_PHONE_NUMBER } from "../../util/setting";
import "./ModalContact.css";

export default function ModalContact() {
  const { chosenContact } = useSelector((state) => state.UserReducer);
  const { company } = useSelector((state) => state.CompanyReducer);
  const dispatch = useDispatch();
  const handleOk = async (values) => {
    const { address, userId, avatar, email, name, phone } = values;
    const contact = { userId, address, avatar, email, name, phone };
    const actionEditContact = editContactAction(contact);
    await dispatch(actionEditContact);
    const action = closeModalAction();
    await dispatch(action);
  };
  const handleCancle = () => {
    const action = closeModalAction();
    dispatch(action);
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userId: chosenContact.user.userId,
      address: chosenContact.user.address,
      companyId: chosenContact.user.companyId,
      email: chosenContact.user.email,
      name: chosenContact.user.name,
      phone: chosenContact.user.phone,
      role: chosenContact.user.role,
      avatar: chosenContact.user.avatar,
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
      handleOk(values);
    },
  });
  const dummyRequest = async ({ file, onSuccess }) => {
    const action = addAvatarContactAction(file);
    await dispatch(action);
    return onSuccess("ok");
  };
  return (
    <div className="">
      <Modal
        title="Chỉnh sửa liên hệ"
        centered
        visible={chosenContact.visible}
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
            onClickCapture={formik.handleSubmit}
          >
            Xác nhận
          </Button>,
        ]}
      >
        <form
          action=""
          className="modal-contact"
          onSubmitCapture={formik.handleSubmit}
        >
          <div className="container mx-auto">
            <div className="form-group">
              <p>Mã liên hệ</p>
              <input
                name="userId"
                type="text"
                value={formik.values.userId}
                disabled={true}
                className=" cursor-no-drop"
              />
            </div>
            <div className="form-group">
              <p>Họ tên</p>
              <input
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
            <div className="form-group">
              <p>Email</p>
              <input
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
            <div className="form-group">
              <p>Số điện thoại</p>
              <input
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
            <div className="form-group">
              <p>Địa chỉ</p>
              <input
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
            <div className="form-group">
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
            <div className="form-group">
              <p>Mã loại người dùng</p>
              <input
                type="text"
                name="role"
                value={formik.values.role}
                disabled={true}
                className=" cursor-no-drop"
              />
            </div>
            <div className="form-group">
              <p>Công ty</p>
              <p className="bg-gray-100 border p-2 cursor-no-drop">
                {company.companyName}
              </p>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
