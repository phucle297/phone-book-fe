import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { DONE_LOADING, START_LOADING } from "../../redux/types/LoadingType";
import "./AuthenticateTemplate.css";
export default function AuthenticateTemplate() {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: DONE_LOADING });
    }, 1000);
    dispatch({ type: START_LOADING });
  }, []);
  return (
    <section className="auth">
      <div className="account__card">
        <div className="account__card__body">
          <NavLink
            to="/"
            className="fa fa-times account__card__close"
          ></NavLink>
          {/* <img
            src="https://d17ha8ssvhagwb.cloudfront.net/static/phone-book.png"
            alt=""
            className="account__logo w-20 block text-center mx-auto"
          /> */}
          <h1 className="font-bold text-white text-3xl text-center mb-6 mt-5 ">
            PhoneBook
          </h1>
          <Outlet />
          <div className=" flex flex-col justify-center items-center mt-2">
            <button className="social-button" style={{ background: "#3d63b5" }}>
              <i className="fab fa-facebook-f"></i>
              Đăng nhập bằng Facebook
            </button>
            <button
              className="social-button"
              style={{
                background: "#fff",
                color: "#000",
              }}
            >
              <img
                src="https://d17ha8ssvhagwb.cloudfront.net/static/google-logo.png"
                alt=""
                width="20"
                style={{
                  borderColor: "rgba(0,0,0,0.1)",
                }}
              />
              Đăng nhập bằng Google
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
