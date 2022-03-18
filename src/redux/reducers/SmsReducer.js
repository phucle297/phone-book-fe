/* eslint-disable import/no-anonymous-default-export */
import {
  CLOSE_MODAL_SMS,
  GET_ALL_SMS_RECEIVED,
  GET_ALL_SMS_SENT,
  SEARCH_SMS,
} from "../types/SmsType";

const initialState = {
  arrSmsSent: [],
  arrSmsReceived: [],
  modalSms: {
    visible: false,
    sms: [],
    users: [],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SMS_SENT: {
      let arrSmsSent = [...action.data].map((item, index) => {
        let sms = {};
        for (let [key, value] of Object.entries(item)) {
          if (key === "updated_at" || key === "userId" || key === "id") {
            continue;
          }
          if (key.includes("users.")) {
            key = key.replace("users.", "");
          }
          if (key.includes("sms.")) {
            key = key.replace("sms.", "");
          }
          if (key.includes("userHasSms.")) {
            key = key.replace("userHasSms.", "");
          }
          sms = { ...sms, [key]: value };
        }
        sms = { ...sms, key: index };
        return sms;
      });
      state.arrSmsSent = [...arrSmsSent];
      return { ...state };
    }
    case GET_ALL_SMS_RECEIVED: {
      let arrSmsReceived = [...action.data].map((item, index) => {
        let sms = {};
        for (let [key, value] of Object.entries(item)) {
          if (key === "updated_at" || key === "userId" || key === "id") {
            continue;
          }
          if (key.includes("users.")) {
            key = key.replace("users.", "");
          }
          if (key.includes("sms.")) {
            key = key.replace("sms.", "");
          }
          sms = { ...sms, [key]: value };
        }
        sms = { ...sms, key: index };
        return sms;
      });
      state.arrSmsReceived = [...arrSmsReceived];
      return { ...state };
    }
    case SEARCH_SMS: {
      state.modalSms.sms = [...action.sms].map((item, index) => {
        return { ...item, key: index };
      });
      state.modalSms.users = [...action.users].map((item, index) => {
        return { ...item, key: index };
      });
      state.modalSms.visible = true;
      return { ...state };
    }
    case CLOSE_MODAL_SMS: {
      state.modalSms.visible = false;
      state.modalSms.users = [];
      state.modalSms.sms = [];
      return { ...state };
    }
    default:
      return { ...state };
  }
};
