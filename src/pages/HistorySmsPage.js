import React, { useEffect } from "react";
import * as dayjs from "dayjs";
import { Input, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSmsReceivedAction,
  getAllSmsSentAction,
  searchSmsAction,
} from "../redux/actions/SmsAction";
import ModalSearchSms from "../components/ModalSearchSms/ModalSearchSms";

const { Search } = Input;
export default function HistorySmsPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    const actionGetSmsSent = getAllSmsSentAction();
    dispatch(actionGetSmsSent);
    const actionGetSmsReceived = getAllSmsReceivedAction();
    dispatch(actionGetSmsReceived);
  }, []);

  const { arrSmsSent, arrSmsReceived } = useSelector(
    (state) => state.SmsReducer
  );

  const onSearch = (value) => {
    const actionSearchSms = searchSmsAction(value);
    dispatch(actionSearchSms);
  };
  const dataSent = [...arrSmsSent];
  const dataReceive = [...arrSmsReceived];
  const columnsSent = [
    {
      title: "Người nhận",
      dataIndex: "name",
      width: 130,
      fixed: "left",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 200,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 130,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      width: 300,
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
    {
      title: "Nội dung",
      dataIndex: "smsContent",
      width: 200,
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
  const columnsReceive = [
    {
      title: "Người gửi",
      dataIndex: "name",
      width: 130,
      fixed: "left",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 200,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 130,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      width: 300,
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
    {
      title: "Nội dung",
      dataIndex: "smsContent",
      width: 200,
    },
    {
      title: "Ngày nhận",
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
  return (
    <div>
      <div className="container mx-auto py-3 m-5">
        <h2 className="text-4xl font-bold">Tin nhắn</h2>
        <div className="mt-6">
          <Search
            className="mb-6"
            placeholder="Tìm kiếm tin nhắn"
            onSearch={onSearch}
            enterButton
          />
          <div className="table-sent">
            <p className="text-xl font-bold">Tin nhắn đã nhận</p>
            <Table
              dataSource={dataReceive}
              columns={columnsReceive}
              scroll={{ x: 900, y: window.innerHeight / 2 - 100 }}
            />
          </div>
          <div className="table-receive">
            <p className="text-xl font-bold">Tin nhắn đã gửi</p>
            <Table
              dataSource={dataSent}
              columns={columnsSent}
              scroll={{ x: 900, y: window.innerHeight / 2 - 100 }}
            />
          </div>
        </div>
        <ModalSearchSms />
      </div>
    </div>
  );
}
