import { http } from "../../util/setting";
import {
  CLOSE_MODAL_SMS,
  GET_ALL_SMS_RECEIVED,
  GET_ALL_SMS_SENT,
  SEARCH_SMS,
} from "../types/SmsType";
import SmsServices from "../../services/SmsServices";

export const getAllSmsSentAction = () => {
  return (dispatch) => {
    const promise = SmsServices.getAllSmsSent();
    promise.then((res) => {
      dispatch({ type: GET_ALL_SMS_SENT, data: res.data.data });
    });
  };
};

export const getAllSmsReceivedAction = () => {
  return (dispatch) => {
    const promise = SmsServices.getAllSmsReceive();
    promise.then((res) => {
      dispatch({ type: GET_ALL_SMS_RECEIVED, data: res.data.data });
    });
  };
};

export const searchSmsAction = (searchContent) => {
  return (dispatch) => {
    const promise = SmsServices.searchSms(searchContent);
    promise.then((res) => {
      dispatch({
        type: SEARCH_SMS,
        sms: res.data.data.sms,
        users: res.data.data.users,
      });
    });
  };
};

export const closeModalSmsAction = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_MODAL_SMS,
    });
  };
};
