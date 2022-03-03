import { message, notification } from "antd";
import SmsServices from "../../services/SmsServices";
import UserServices from "../../services/UserServices";
import {
  CHOOSE_USER,
  CLOSE_MODAL,
  DELETE_USER,
  GET_USERS,
  GET_USER_INFO,
  OPEN_MODAL,
  SEARCH_USER,
  SEND_SMS,
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
export const sendSmsAction = (content, receivers) => {
  return (dispatch) => {
    const promise = SmsServices.sendSms(content, receivers);
    promise
      .then((res) => {
        dispatch({ type: SEND_SMS, content, receivers, data: res.data });
        // if (res.data.)
        if (res.data.data.arrNumErr.length === 0) {
          message.success("Gửi tin nhắn thành công!");
        } else {
          console.log(res.data);
          notification["info"]({
            message: "",
            description: (
              <div>
                <div>
                  <b>Gửi tin nhắn thành công:</b>
                  {res.data.data.arrNumSuccess.map((num, index) => (
                    <p key={index} className="my-2">
                      {num}
                    </p>
                  ))}
                </div>
                <div>
                  <b>Gửi tin nhắn thất bại:</b>
                  {res.data.data.arrNumErr.map((num, index) => (
                    <p key={index} className="my-2">
                      {num}
                    </p>
                  ))}
                </div>
              </div>
            ),
            duration: 10,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gửi tin nhắn thất bại!");
      });
  };
};
