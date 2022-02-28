import { Modal } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModalAction } from "../../redux/actions/UserAction";
import "./ModalSMSEmail.css";

const ModalSMSEmail = (props) => {
  const { modal } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();

  const handleOk = () => {
    const action = closeModalAction();
    dispatch(action);
  };

  const handleCancel = () => {
    const action = closeModalAction();
    dispatch(action);
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
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default ModalSMSEmail;
