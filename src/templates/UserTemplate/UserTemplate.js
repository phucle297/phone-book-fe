import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { message } from "antd";
import "./UserTemplate.css";
import { ACCESS_TOKEN } from "../../util/setting";
export default function UserTemplate() {
  React.useEffect(() => {
    if (!localStorage.getItem(ACCESS_TOKEN))
      message.info("Bạn cần phải đăng nhập!");
  }, []);
  return (
    <>
      {localStorage.getItem(ACCESS_TOKEN) ? (
        <Outlet />
      ) : (
        <Navigate to="/auth/login" />
      )}
    </>
  );
}
