import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoAction } from "../redux/actions/UserAction";

export default function InfoPage() {
  const { userDetail } = useSelector((state) => state.UserReducer);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   const action = getUserInfoAction();
  //   dispatch(action);
  // });
  return <div></div>;
}
