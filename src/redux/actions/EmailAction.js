import {
  CLOSE_MODAL_EMAIL,
  GET_ALL_EMAIL_RECEIVED,
  GET_ALL_EMAIL_SENT,
  SEARCH_EMAIL,
} from "../types/EmailType";
import EmailServices from "../../services/EmailServices";

export const getAllEmailReceivedAction = () => {
  return (dispatch) => {
    const promise = EmailServices.getAllEmailReceived();
    promise.then((res) => {
      dispatch({ type: GET_ALL_EMAIL_RECEIVED, data: res.data.data });
    });
    promise.catch((err) => console.log(err));
  };
};
export const getAllEmailSentAction = () => {
  return (dispatch) => {
    const promise = EmailServices.getAllEmailSent();
    promise.then((res) => {
      dispatch({ type: GET_ALL_EMAIL_SENT, data: res.data.data });
    });
    promise.catch((err) => console.log(err));
  };
};
export const closeModalEmailAction = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_MODAL_EMAIL,
    });
  };
};
export const searchEmailAction = (searchContent) => {
  return (dispatch) => {
    const promise = EmailServices.searchEmail(searchContent);
    promise.then((res) => {
      dispatch({
        type: SEARCH_EMAIL,
        emails: res.data.data.emails,
        users: res.data.data.users,
      });
    });
    promise.catch((err) => console.log(err));
  };
};
