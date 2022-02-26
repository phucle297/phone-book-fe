/* eslint-disable react-hooks/exhaustive-deps */
import { Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserAction,
  getAllUserAction,
  getUserInfoAction,
} from "../redux/actions/UserAction";
import { parseJwt } from "../util/setting";
import { Table } from "antd";
const { Search } = Input;

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    // Column configuration not to be checked
    name: record.name,
  }),
};
const onSearch = (value) => console.log(value);

const HomePage = () => {
  const dispatch = useDispatch();
  const { userDetail, userArr } = useSelector((state) => state.UserReducer);

  useEffect(async () => {
    const getInfoAction = getUserInfoAction();
    await dispatch(getInfoAction);
    const getAllUAction = getAllUserAction();
    await dispatch(getAllUAction);
  }, [userArr]);

  const columns = [
    {
      title: "Id",
      dataIndex: "userId",
      width: 60,
      fixed: "left",
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      width: 130,
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
        if (text) srcImg = "https://" + text.replaceAll(" ", "%20");
        else srcImg = `https://picsum.photos/200/200?random=${index}`;
        return (
          <img src={srcImg} alt="avatar" className="w-12 h-12 rounded-full" />
        );
      },
      width: 80,
    },
    {
      title: "Thao tác",
      width: 200,
      render: (text, record, index) => {
        return (
          <div className="flex items-center justify-around">
            <button
              className="rounded bg-yellow-500 py-2 px-3 hover:bg-yellow-600 font-bold"
              onClick={() => {
                if (userDetail.role !== "Admin") {
                  message.error(
                    "Bạn chỉ có thể chỉnh sửa liên hệ nếu bạn là Admin"
                  );
                }
              }}
            >
              Chỉnh sửa
            </button>
            <button
              className="rounded bg-red-500 py-2 px-3 hover:bg-red-600 font-bold"
              onClick={async () => {
                if (userDetail.role !== "Admin") {
                  message.error("Bạn chỉ có thể xóa liên hệ nếu bạn là Admin");
                } else {
                  const deleteAction = deleteUserAction(record.userId);
                  await dispatch(deleteAction);
                  message.success("Xóa liên hệ thành công");
                }
              }}
            >
              Xóa
            </button>
          </div>
        );
      },
    },
  ];

  userArr.map((item) => {
    item.key = item.userId;
    return item;
  });
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold m-5">Danh bạ</h1>
      <div className="controller flex items-center justify-around my-2">
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
        />
        <button className="bg-sky-400 hover:bg-sky-500 rounded ml-3 px-2 py-2 w-28 font-bold">
          Gửi Email
        </button>
        <button className="bg-green-400 hover:bg-green-500 rounded ml-3 px-2 py-2 w-28 font-bold">
          Gửi SMS
        </button>
      </div>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={userArr}
        scroll={{ x: 1100, y: window.innerHeight - 280 }}
      />
    </div>
  );
};
export default HomePage;
