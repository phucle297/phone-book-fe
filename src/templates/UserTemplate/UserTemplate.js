/* eslint-disable jsx-a11y/alt-text */
import {
  BookOutlined,
  LogoutOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { history } from "../../App";
import { DONE_LOADING, START_LOADING } from "../../redux/types/LoadingType";
import { ACCESS_TOKEN, parseJwt } from "../../util/setting";
import "./UserTemplate.css";

export default function UserTemplate() {
  let [page, setPage] = useState("");
  if (window.location.pathname === "/") page = "1";
  else if (window.location.pathname === "/info") page = "2";
  else if (window.location.pathname === "/sms") page = "3";
  else if (window.location.pathname === "/email") page = "4";
  const { Sider } = Layout;
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: DONE_LOADING });
    }, 1000);
    dispatch({ type: START_LOADING });
    if (!localStorage.getItem(ACCESS_TOKEN))
      message.info("Bạn cần phải đăng nhập!");
    else {
      const token = localStorage.getItem(ACCESS_TOKEN);
      const exp = parseJwt(token).exp;
      if (Date.now() >= exp * 1000) {
        message.info("Bạn đã hết phiên đăng nhập, vui lòng đăng nhập lại!");
        localStorage.clear();
        history.push("/auth/login");
      }
    }
  }, []);
  const [collapsed, setCollapsed] = React.useState(true);
  return (
    <>
      {localStorage.getItem(ACCESS_TOKEN) ? (
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
            <div className="logo">
              <img
                src="https://picsum.photos/200/300"
                className={
                  " bg-white rounded-full my-10 mx-auto" +
                  (collapsed ? " w-14 h-14" : " w-20 h-20 mb-5")
                }
              />
              <h1
                className={
                  "text-center text-white font-bold text-2xl mt-0" +
                  (collapsed ? " hidden" : " block")
                }
              >
                Phone Book
              </h1>
            </div>
            <Menu theme="dark" defaultSelectedKeys={page} mode="inline">
              <Menu.Item key="1" icon={<BookOutlined />}>
                <NavLink to="/" onClick={() => setPage("1")}>
                  Phone book
                </NavLink>
              </Menu.Item>
              <Menu.Item key="2" icon={<UserOutlined />}>
                <NavLink to="/info" onClick={() => setPage("2")}>
                  User
                </NavLink>
              </Menu.Item>
              <Menu.Item key="3" icon={<PhoneOutlined />}>
                <NavLink to="/sms" onClick={() => setPage("3")}>
                  Sms
                </NavLink>
              </Menu.Item>
              <Menu.Item key="4" icon={<MailOutlined />}>
                <NavLink to="/email" onClick={() => setPage("4")}>
                  Mail
                </NavLink>
              </Menu.Item>
              <Menu.Item
                key="5"
                icon={<LogoutOutlined />}
                onClick={() => {
                  localStorage.clear();
                  message.info("Bạn đã đăng xuất");
                  history.push("/auth/login");
                }}
              >
                Log out
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Outlet />
          </Layout>
        </Layout>
      ) : (
        <Navigate to="/auth/login" />
      )}
    </>
  );
}
