import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { message } from "antd";
import "./UserTemplate.css";
export default function UserTemplate() {
  React.useEffect(() => {
    if (!localStorage.getItem("token"))
      message.info("You have to login first!");
  }, []);
  return (
    <>
      {localStorage.getItem("token") ? (
        <Outlet />
      ) : (
        <Navigate to="/auth/login" />
      )}
    </>
  );
}
