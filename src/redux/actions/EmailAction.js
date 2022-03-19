import { GET_ALL_EMAIL_RECEIVED, GET_ALL_EMAIL_SENT } from "../types/EmailType";
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
