import { Modal, Table } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModalEmailAction } from "../../redux/actions/EmailAction";
import * as dayjs from "dayjs";

export default function ModalSearchEmail() {
  const { modalEmail } = useSelector((state) => state.EmailReducer);
  const dispatch = useDispatch();
  const handleCancle = () => {
    const action = closeModalEmailAction();
    dispatch(action);
  };
  const dataEmails = [...modalEmail.emails];
  const dataUsers = [...modalEmail.users];
  console.log(dataUsers);
  const columnsEmails = [
    {
      title: "Mã email",
      dataIndex: "emailId",
      width: 90,
      fixed: "left",
    },
    {
      title: "Nội dung",
      dataIndex: "emailContent",
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
      title: "Tên người nhận",
      dataIndex: "userHasEmail.users.name",
      render: (text, record, index) => {
        if (!Array.isArray(record.userHasEmail)) {
          return record.userHasEmail.users.name;
        } else
          return record.userHasEmail.map((item, index) => (
            <p key={index}>{item.users.name}</p>
          ));
      },
      width: 150,
    },
    {
      title: "Số điện thoại người nhận",
      dataIndex: "userHasEmail.users.phone",
      render: (text, record, index) => {
        if (!Array.isArray(record.userHasEmail)) {
          return record.userHasEmail.users.phone;
        } else
          return record.userHasEmail.map((item, index) => (
            <p key={index}>{item.users.phone}</p>
          ));
      },
      width: 150,
    },
    {
      title: "Email người nhận",
      dataIndex: "userHasEmail.users.email",
      render: (text, record, index) => {
        if (!Array.isArray(record.userHasEmail)) {
          return record.userHasEmail.users.email;
        } else
          return record.userHasEmail.map((item, index) => (
            <p key={index}>{item.users.email}</p>
          ));
      },
      width: 150,
    },
    {
      title: "Têp đính kèm",
      dataIndex: "fileAttached",
      render: (text, record, index) => {
        if (
          Array.isArray(record.attachedFiles) &&
          record.attachedFiles.length > 0
        ) {
          return record.attachedFiles.map((item, index) => {
            return (
              <a
                className="block text-black hover:text-gray-500"
                key={index}
                href={`https://${item.filePath.replaceAll(" ", "%20")}`}
                target="_blank"
              >
                {item.fileName}
              </a>
            );
          });
        }
        return "Không có tệp đính kèm";
      },
    },
    {
      title: "Ngày gửi",
      dataIndex: "created_at",
      sorter: (a, b) => {
        return dayjs(a.created_at).unix() - dayjs(b.created_at).unix();
      },
      sortDirections: ["descend", "ascend"],
      width: 200,
      render: (text, record, index) => {
        return dayjs(record.created_at).format("DD/MM/YYYY, HH:mm:ss");
      },
    },
  ];
  const columnsUsers = [
    {
      title: "Mã người dùng",
      dataIndex: "userId",
      width: 90,
      fixed: "left",
    },
    {
      title: "Tên người dùng",
      dataIndex: "name",
      width: 200,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 150,
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
      visible={modalEmail.visible}
      onCancel={() => handleCancle()}
      width={1000}
      footer={[]}
    >
      <div className="">
        <p className="font-bold text-xl">Email</p>
        <Table
          dataSource={dataEmails}
          columns={columnsEmails}
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
