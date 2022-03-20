import { UploadOutlined } from "@ant-design/icons";
import { Button, Modal, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCompanyAction } from "../../redux/actions/CompanyAction";
import {
  attachedFileAction,
  closeModalAction,
  detachFileAction,
  sendEmailAction,
  sendSmsAction,
} from "../../redux/actions/UserAction";
import "./ModalSMSEmail.css";

const ModalSMSEmail = (props) => {
  const { modal, arrUserSelected, attachedFiles } = useSelector(
    (state) => state.UserReducer
  );
  console.log(attachedFiles);
  const [text, setText] = useState("");
  const [subject, setSubject] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const actionGetAllCompany = getAllCompanyAction();
    dispatch(actionGetAllCompany);
  }, []);
  const handleOk = () => {
    const action = closeModalAction();
    dispatch(action);
    if (modal.title === "Gửi SMS") {
      const receiverSMS = arrUserSelected.map((user) => user.phone);
      const actionSendSMS = sendSmsAction(text, receiverSMS);
      dispatch(actionSendSMS);
      setText("");
    } else {
      const receiverEmail = arrUserSelected.map((user) => user.email);
      const actionSendEmail = sendEmailAction(
        subject,
        text,
        receiverEmail,
        attachedFiles
      );
      dispatch(actionSendEmail);
      setText("");
      setSubject("");
    }
  };
  const attachProps = {
    onChange({ file, fileList }) {
      if (attachedFiles.length === 0) return (fileList = []);
      if (fileList.length < attachedFiles.length) {
        console.log(file.name);
        const action = detachFileAction(file.name.replace(" ", "+"));
        dispatch(action);
      }
    },
  };
  const dummyRequest = async ({ file, onSuccess }) => {
    const action = attachedFileAction(file);
    await dispatch(action);
    return onSuccess("ok");
  };
  const handleCancel = () => {
    const action = closeModalAction();
    setText("");
    setSubject("");
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
  const handleChangeSubject = (e) => {
    setSubject(e.target.value);
  };
  return (
    <>
      <Modal
        title={modal.title}
        visible={
          modal.visible &&
          (modal.title === "Gửi SMS" || modal.title === "Gửi Email")
        }
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
              {modal.title === "Gửi Email" ? (
                <>
                  <input
                    type="text"
                    className="border w-full mb-2 rounded p-2"
                    placeholder="Tiêu đề"
                    value={subject}
                    onChange={handleChangeSubject}
                  />
                  <textarea
                    placeholder="Nội dung"
                    className="border w-full rounded p-2"
                    value={text}
                    onChange={handleChangeText}
                  ></textarea>
                  <Upload {...attachProps} customRequest={dummyRequest}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </>
              ) : (
                <textarea
                  placeholder="Nội dung"
                  className="border w-full rounded p-2"
                  value={text}
                  onChange={handleChangeText}
                ></textarea>
              )}
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalSMSEmail;
