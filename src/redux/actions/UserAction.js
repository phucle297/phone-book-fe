import { message, notification } from "antd";
import EmailServices from "../../services/EmailServices";
import SmsServices from "../../services/SmsServices";
import UserServices from "../../services/UserServices";
import { ATTACH_FILE, DETACH_FILE } from "../types/EmailType";
import { SEND_SMS } from "../types/SmsType";
import {
  ADD_AVATAR_CONTACT,
  ADD_USER,
  CHOOSE_USER,
  CLOSE_MODAL,
  DELETE_USER,
  GET_USERS,
  GET_USER_INFO,
  OPEN_MODAL,
  OPEN_UPDATE_MODAL,
  REGISTER_USER,
  SEARCH_USER,
  UPDATE_CONTACT,
  UPLOAD_AVATAR,
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
      message.success("Xóa liên hệ thành công");
    });
    promise.catch((err) => {
      message.error("Xóa liên hệ thất bại");
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
        if (res.data.data.arrNumErr.length === 0) {
          message.success("Gửi tin nhắn thành công!");
        } else {
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
export const attachedFileAction = (file) => {
  return (dispatch) => {
    let formData = new FormData();
    formData.append("attachedFile", file);
    const promise = EmailServices.attachFile(formData);
    promise.then((res) => {
      dispatch({ type: ATTACH_FILE, url: res.data.data.url });
    });
  };
};
export const detachFileAction = (name) => {
  return (dispatch) => {
    dispatch({ type: DETACH_FILE, name: name.replaceAll(" ", "+") });
  };
};
export const sendEmailAction = (
  subject,
  emailContent,
  receivers,
  attachments
) => {
  return (dispatch) => {
    const promise = EmailServices.sendEmail(
      subject,
      emailContent,
      receivers,
      attachments
    );
    promise.then((res) => {
      dispatch({ type: SEND_SMS });
      message.success("Gửi email thành công!");
    });
    promise.catch((err) => {
      message.error("Gửi email thất bại!");
    });
  };
};
export const openModalUpdateAction = (user) => {
  return (dispatch) => {
    dispatch({ type: OPEN_UPDATE_MODAL, user });
  };
};
export const addAvatarContactAction = (file) => {
  return (dispatch) => {
    let formData = new FormData();
    formData.append("attachedFile", file);
    const promise = EmailServices.attachFile(formData);
    promise.then((res) => {
      dispatch({ type: ADD_AVATAR_CONTACT, url: res.data.data.url });
    });
  };
};
export const editContactAction = (user) => {
  return (dispatch) => {
    const promise = UserServices.editUser(user);
    promise.then((res) => {
      dispatch({ type: UPDATE_CONTACT, user });
      dispatch({ type: CLOSE_MODAL });
      message.success("Cập nhật thông tin thành công!");
    });
    promise.catch((err) => {
      message.error("Cập nhật thông tin thất bại!");
    });
  };
};
export const uploadAvatarAction = (file) => {
  return (dispatch) => {
    let formData = new FormData();
    formData.append("avatar", file);
    const promise = UserServices.uploadAvatar(formData);
    promise.then((res) => {
      dispatch({ type: UPLOAD_AVATAR, url: res.data.data.url });
    });
  };
};
export const registerAction = (user) => {
  return (dispatch) => {
    const promise = UserServices.register(user);
    promise.then((res) => {
      dispatch({ type: REGISTER_USER, user });
      message.success("Đăng ký thành công!");
    });
    promise.catch((err) => {
      message.error("Đăng ký thất bại!");
    });
  };
};
export const addUserAction = (user) => {
  return (dispatch) => {
    const userAdded = { ...user, password: "" };
    const promise = UserServices.register(userAdded);
    promise.then((res) => {
      dispatch({ type: ADD_USER, user });
      message.success("Thêm người dùng thành công!");
    });
    promise.catch((err) => {
      message.error("Thêm người dùng thất bại!");
    });
  };
};
