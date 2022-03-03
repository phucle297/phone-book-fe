import { BookOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, message } from "antd";
import React from "react";
import { Navigate, Outlet, NavLink } from "react-router-dom";
import { ACCESS_TOKEN, parseJwt } from "../../util/setting";
import "./UserTemplate.css";
import { history } from "../../App";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function UserTemplate() {
  React.useEffect(() => {
    if (!localStorage.getItem(ACCESS_TOKEN))
      message.info("Bạn cần phải đăng nhập!");
    else {
      const token = localStorage.getItem(ACCESS_TOKEN);
      const exp = parseJwt(token).exp;
      if (Date.now() >= exp * 1000) {
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
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item key="1" icon={<BookOutlined />}>
                <NavLink to="/">Phone book</NavLink>
              </Menu.Item>
              <Menu.Item key="2" icon={<UserOutlined />}>
                <NavLink to="/info">User</NavLink>
              </Menu.Item>
              <Menu.Item
                key="3"
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
