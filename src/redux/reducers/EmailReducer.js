/* eslint-disable import/no-anonymous-default-export */
import { GET_ALL_EMAIL_RECEIVED, GET_ALL_EMAIL_SENT } from "../types/EmailType";

const initialState = {
  arrEmailReceived: [],
  arrEmailSent: [],
  modalEmail: {
    visible: false,
    email: [],
    users: [],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_EMAIL_RECEIVED: {
      state.arrEmailReceived = [...action.data].map((item, index) => ({
        ...item,
        key: index,
      }));
      return { ...state };
    }
    case GET_ALL_EMAIL_SENT: {
      state.arrEmailSent = [...action.data].map((item, index) => ({
        ...item,
        key: index,
      }));
      return { ...state };
    }
    default:
      return { ...state };
  }
};
