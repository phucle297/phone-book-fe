import UserServices from "../../services/UserServices";
import {
  CHOOSE_USER,
  CLOSE_MODAL,
  DELETE_USER,
  GET_USERS,
  GET_USER_INFO,
  OPEN_MODAL,
  SEARCH_USER,
} from "../types/UserType";
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

export const searchUserAction = (searchContent) => {
  return (dispatch) => {
    const promise = UserServices.search(searchContent);
    promise.then((res) => {
      dispatch({ type: SEARCH_USER, usersSearch: res.data.data });
    });
  };
};

export const chooseUserAction = (arrUser) => {
  return (dispatch) => {
    dispatch({ type: CHOOSE_USER, arrUser });
  };
};
export const openModalAction = (title) => {
  return (dispatch) => {
    dispatch({ type: OPEN_MODAL, title });
  };
};
export const closeModalAction = () => {
  return (dispatch) => {
    dispatch({ type: CLOSE_MODAL });
  };
};
