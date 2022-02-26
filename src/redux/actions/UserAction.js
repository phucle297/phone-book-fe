import UserServices from "../../services/UserServices";
import { DELETE_USER, GET_USERS, GET_USER_INFO } from "../types/UserType";
export const getUserInfoAction = () => {
  return (dispatch) => {
    const promise = UserServices.getMyData();
    promise.then((res) => {
      dispatch({ type: GET_USER_INFO, userDetail: res.data.data });
    });
  };
};
export const getAllUserAction = () => {
  return (dispatch) => {
    const promise = UserServices.getAllUser();
    promise.then((res) => {
      dispatch({ type: GET_USERS, userArr: res.data.data });
    });
  };
};
export const deleteUserAction = (id) => {
  return (dispatch) => {
    const promise = UserServices.deleteUser(id);
    promise.then((res) => {
      dispatch({ type: DELETE_USER, id });
    });
  };
};
