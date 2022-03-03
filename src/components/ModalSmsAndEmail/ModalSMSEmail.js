import { Modal } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModalAction,
  sendSmsAction,
} from "../../redux/actions/UserAction";
import "./ModalSMSEmail.css";

const ModalSMSEmail = (props) => {
  const { modal, arrUserSelected } = useSelector((state) => state.UserReducer);
  const [text, setText] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();
  const handleOk = () => {
    const action = closeModalAction();
    dispatch(action);
    const receiverSMS = arrUserSelected.map((user) => user.phone);
    const actionSendSMS = sendSmsAction(text, receiverSMS);
    dispatch(actionSendSMS);
  };
  const handleCancel = () => {
    const action = closeModalAction();
    dispatch(action);
  };
  const renderUser = () => {
    return arrUserSelected.map((user, index) => {
      return (
        <div className="grid grid-cols-2" key={index}>
          <div className="col-span-1">
            <p>{user.name}</p>
          </div>
          {modal.title === "Gửi Email" ? (
            <div className="col-span-1">
              <p>{user.email}</p>
            </div>
          ) : (
            <div className="col-span-1">
              <p>{user.phone}</p>
            </div>
          )}
        </div>
      );
    });
  };
  const handleChangeText = (e) => {
    setText(e.target.value);
  };
  const handleChangeFile = (e) => {
    let file = e.target.files[0];
    console.log(file);

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setImgSrc(e.target.result);
    };
    console.log(imgSrc);
  };
  return (
    <>
      <Modal
        title={modal.title}
        visible={modal.visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="col-span-1">
            <div className="grid grid-cols-2">
              <div className="col-span-1">
                <p className="font-bold">Tên</p>
              </div>
              {modal.title === `Gửi Email` ? (
                <div className="col-span-1">
                  <p className="font-bold">Email</p>
                </div>
              ) : (
                <div className="col-span-1">
                  <p className="font-bold">Phone</p>
                </div>
              )}
            </div>
            {renderUser()}
          </div>
          <div className="col-span-1 md:col-span-2 h-full">
            <form action="">
              <textarea
                className="border w-full"
                value={text}
                onChange={handleChangeText}
              ></textarea>
              {modal.title === "Gửi Email" ? (
                <input type="file" onChange={handleChangeFile} />
              ) : null}
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalSMSEmail;
