import { Input, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as dayjs from "dayjs";
import {
  getAllEmailReceivedAction,
  getAllEmailSentAction,
  searchEmailAction,
} from "../redux/actions/EmailAction";
import ModalSearchEmail from "../components/ModalSearchEmail/ModalSearchEmail";

const { Search } = Input;
export default function HistoryEmailPage() {
  const { arrEmailReceived, arrEmailSent } = useSelector(
    (state) => state.EmailReducer
  );

  const dispatch = useDispatch();
  useEffect(() => {
    const actionGetEmailReceived = getAllEmailReceivedAction();
    dispatch(actionGetEmailReceived);
    const actionGetEmailSent = getAllEmailSentAction();
    dispatch(actionGetEmailSent);
  }, []);

  const columnsReceive = [
    {
      title: "Người gửi",
      dataIndex: "emails.users.name",
      width: 130,
      fixed: "left",
      render: (text, record, index) => {
        return record.emails.users.name;
      },
    },
    {
      title: "Email",
      dataIndex: "emails.users.email",
      width: 200,
      render: (text, record, index) => {
        return record.emails.users.email;
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "emails.users.phone",
      width: 130,
      render: (text, record, index) => {
        return record.emails.users.phone;
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "emails.users.address",
      width: 300,
      render: (text, record, index) => {
        return record.emails.users.address;
      },
    },
    {
      title: "Avatar",
      dataIndex: "emails.users.avatar",
      width: 300,
      render: (text, record, index) => {
        let src;
        if (record.emails.users.avatar) {
          if (record.emails.users.avatar.includes("http"))
            src = record.emails.users.avatar;
          else src = `https://${record.emails.users.avatar}`;
        } else src = `https://picsum.photos/200/200?random=${index}`;
        return <img src={src} className="w-12 h-12 rounded-full" alt="" />;
      },
    },
    {
      title: "Tiêu đề",
      dataIndex: "emails.subject",
      width: 300,
      render: (text, record, index) => {
        return record.emails.subject;
      },
    },
    {
      title: "Nội dung",
      dataIndex: "emails.emailContent",
      width: 300,
      render: (text, record, index) => {
        return record.emails.emailContent;
      },
    },
    {
      title: "Tệp đính kèm",
      dataIndex: "emails.attachment",
      width: 300,
      render: (text, record, index) => {
        if (
          Array.isArray(record.emails.attachedFiles) &&
          record.emails.attachedFiles.length > 0
        ) {
          return record.emails.attachedFiles.map((item, index) => {
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
  const columnsSent = [
    {
      title: "Người nhận",
      dataIndex: "userHasEmail.users.name",
      width: 130,
      fixed: "left",
      render: (text, record, index) => {
        return record.userHasEmail.users.name;
      },
    },
    {
      title: "Email",
      dataIndex: "userHasEmail.users.email",
      width: 200,
      render: (text, record, index) => {
        return record.userHasEmail.users.email;
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "userHasEmail.users.phone",
      width: 130,
      render: (text, record, index) => {
        return record.userHasEmail.users.phone;
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "userHasEmail.users.address",
      width: 300,
      render: (text, record, index) => {
        return record.userHasEmail.users.address;
      },
    },
    {
      title: "Avatar",
      dataIndex: "userHasEmail.users.avatar",
      width: 300,
      render: (text, record, index) => {
        let src;
        if (record.userHasEmail.users.avatar) {
          if (record.userHasEmail.users.avatar.includes("http"))
            src = record.userHasEmail.users.avatar;
          else src = `https://${record.userHasEmail.users.avatar}`;
        } else src = `https://picsum.photos/200/200?random=${index}`;
        return <img src={src} className="w-12 h-12 rounded-full" alt="" />;
      },
    },
    {
      title: "Tiêu đề",
      dataIndex: "subject",
      width: 300,
    },
    {
      title: "Nội dung",
      dataIndex: "emailContent",
      width: 300,
    },
    {
      title: "Tệp đính kèm",
      dataIndex: "attachedFiles",
      width: 300,
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
  const onSearch = (value) => {
    const action = searchEmailAction(value);
    dispatch(action);
  };
  return (
    <div>
      <div className="container mx-auto py-3 m-5">
        <h2 className="text-4xl font-bold">Email</h2>
        <div className="mt-6">
          <Search
            className="mb-6"
            placeholder="Tìm kiếm Email"
            onSearch={onSearch}
            enterButton
          />
          <div className="table-sent">
            <p className="text-xl font-bold">Email đã nhận</p>
            <Table
              dataSource={arrEmailReceived}
              columns={columnsReceive}
              scroll={{ x: 2160, y: window.innerHeight / 2 - 100 }}
            />
          </div>
          <div className="table-receive">
            <p className="text-xl font-bold">Email đã gửi</p>
            <Table
              dataSource={arrEmailSent}
              columns={columnsSent}
              scroll={{ x: 2160, y: window.innerHeight / 2 - 100 }}
            />
          </div>
        </div>
        <ModalSearchEmail />
      </div>
    </div>
  );
}
