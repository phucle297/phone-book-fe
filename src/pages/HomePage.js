/* eslint-disable react-hooks/exhaustive-deps */
import { Input, message, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalContact from "../components/ModalContact/ModalContact";
import ModalSMSEmail from "../components/ModalSmsAndEmail/ModalSMSEmail";
import { getCompanyByIdAction } from "../redux/actions/CompanyAction";
import {
  chooseUserAction,
  deleteUserAction,
  getAllUserAction,
  getUserInfoAction,
  openModalAction,
  openModalUpdateAction,
  searchUserAction,
} from "../redux/actions/UserAction";

const { Search } = Input;
const HomePage = () => {
  const dispatch = useDispatch();
  const { userDetail, userArr, arrUserSelected, modal } = useSelector(
    (state) => state.UserReducer
  );
  const [search, setSearch] = useState("");
  useEffect(async () => {
    if (search === "") {
      const getInfoAction = getUserInfoAction();
      await dispatch(getInfoAction);
      const getAllUAction = getAllUserAction();
      await dispatch(getAllUAction);
    } else {
      const searchAction = searchUserAction(search);
      await dispatch(searchAction);
    }
  }, [search]);
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
                } else {
                  const actionOpenModal = openModalUpdateAction(record);
                  dispatch(actionOpenModal);
                  const action = getCompanyByIdAction(record.companyId);
                  dispatch(action);
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
  const onSearch = (value) => {
    setSearch(value);
  };
  let rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const action = chooseUserAction(selectedRows);
      dispatch(action);
    },
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold m-5">Danh bạ</h1>
      <div className="controller flex items-center justify-around my-2">
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
        />
        <button
          className="bg-sky-400 hover:bg-sky-500 rounded ml-3 px-1 md:px-2 py-2 w-28 font-bold text-xs md:text-sm lg:text-base"
          onClick={() => {
            const action = openModalAction("Gửi SMS");
            dispatch(action);
          }}
        >
          Gửi SMS
        </button>
        <button
          className="bg-green-400 hover:bg-green-500 rounded ml-3 px-1 md:px-2 py-2 w-28 font-bold text-xs md:text-sm lg:text-base"
          onClick={() => {
            const action = openModalAction("Gửi Email");
            dispatch(action);
          }}
        >
          Gửi Email
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
      <ModalSMSEmail />
      <ModalContact />
    </div>
  );
};
export default HomePage;
