import { Button, Modal, Table } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModalSmsAction } from "../../redux/actions/SmsAction";
import * as dayjs from "dayjs";

export default function ModalSearchSms() {
  const { modalSms } = useSelector((state) => state.SmsReducer);
  const dispatch = useDispatch();
  const handleCancle = () => {
    const action = closeModalSmsAction();
    dispatch(action);
  };
  console.log(modalSms);

  const dataSms = [...modalSms.sms];
  const dataUsers = [...modalSms.users];

  const columnsSms = [
    {
      title: "Mã tin nhắn",
      dataIndex: "smsId",
      width: 90,
      fixed: "left",
    },
    {
      title: "Nội dung",
      dataIndex: "smsContent",
      width: 200,
    },
    {
      title: "Tên người gửi",
      dataIndex: "users.name",
      render: (text, record, index) => {
        return record.users.name;
      },
      width: 150,
    },
    {
      title: "Số điện thoại người gửi",
      dataIndex: "users.phone",
      render: (text, record, index) => {
        return record.users.phone;
      },
      width: 150,
    },
    {
      title: "Email người gửi",
      dataIndex: "users.email",
      render: (text, record, index) => {
        return record.users.email;
      },
      width: 150,
    },
    {
      title: "Avatar người gửi",
      dataIndex: "users.avatar",
      render: (text, record, index) => {
        let srcImg;
        if (record.users.avatar) {
          if (record.users.avatar.includes("http")) {
            srcImg = record.users.avatar.replaceAll(" ", "%20");
          } else
            srcImg = "https://" + record.users.avatar.replaceAll(" ", "%20");
        } else srcImg = `https://picsum.photos/200/200?random=${index}`;
        return (
          <img src={srcImg} alt="avatar" className="w-12 h-12 rounded-full" />
        );
      },
      width: 80,
    },
    {
      title: "Tên người nhận",
      dataIndex: "userHasSms.users.name",
      render: (text, record, index) => {
        return record.userHasSms.users.name;
      },
      width: 150,
    },
    {
      title: "Số điện thoại người nhận",
      dataIndex: "userHasSms.users.phone",
      render: (text, record, index) => {
        return record.userHasSms.users.phone;
      },
      width: 150,
    },
    {
      title: "Email người nhận",
      dataIndex: "userHasSms.users.email",
      render: (text, record, index) => {
        return record.userHasSms.users.email;
      },
      width: 150,
    },
    {
      title: "Avatar người nhận",
      dataIndex: "users.avatar",
      render: (text, record, index) => {
        let srcImg;
        if (record.userHasSms.users.avatar) {
          if (record.userHasSms.users.avatar.includes("http")) {
            srcImg = record.userHasSms.users.avatar.replaceAll(" ", "%20");
          } else
            srcImg =
              "https://" +
              record.userHasSms.users.avatar.replaceAll(" ", "%20");
        } else srcImg = `https://picsum.photos/200/200?random=${index}`;
        return (
          <img src={srcImg} alt="avatar" className="w-12 h-12 rounded-full" />
        );
      },
      width: 80,
    },
    {
      title: "Ngày gửi",
      dataIndex: "created_at",
      sorter: (a, b) => {
        return dayjs(a.created_at).unix() - dayjs(b.created_at).unix();
      },
      sortDirections: ["descend", "ascend"],
      width: 150,
      render: (text) => {
        return dayjs(text).format("DD/MM/YYYY, HH:mm:ss");
      },
    },
  ];
  const columnsUsers = [
    {
      title: "Họ tên",
      dataIndex: "name",
      width: 130,
      fixed: "left",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 130,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 80,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      width: 200,
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      render: (text, record, index) => {
        let srcImg;
        if (text) {
          if (text.includes("http")) {
            srcImg = text.replaceAll(" ", "%20");
          } else srcImg = "https://" + text.replaceAll(" ", "%20");
        } else srcImg = `https://picsum.photos/200/200?random=${index}`;
        return (
          <img src={srcImg} alt="avatar" className="w-12 h-12 rounded-full" />
        );
      },
      width: 80,
    },
  ];
  return (
    <Modal
      centered
      visible={modalSms.visible}
      onCancel={() => handleCancle()}
      width={1000}
      footer={[]}
    >
      <div className="">
        <p className="font-bold text-xl">Tin nhắn</p>
        <Table
          dataSource={dataSms}
          columns={columnsSms}
          scroll={{ x: 1500, y: window.innerHeight / 2 - 250 }}
        />
      </div>
      <div className="">
        <p className="font-bold text-xl">Liên hệ</p>
        <Table
          dataSource={dataUsers}
          columns={columnsUsers}
          scroll={{ x: 900, y: window.innerHeight / 2 - 250 }}
        />
      </div>
    </Modal>
  );
}
