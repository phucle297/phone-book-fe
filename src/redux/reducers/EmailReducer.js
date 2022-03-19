/* eslint-disable import/no-anonymous-default-export */
import {
  CLOSE_MODAL_EMAIL,
  GET_ALL_EMAIL_RECEIVED,
  GET_ALL_EMAIL_SENT,
  SEARCH_EMAIL,
} from "../types/EmailType";

const initialState = {
  arrEmailReceived: [],
  arrEmailSent: [],
  modalEmail: {
    visible: false,
    emails: [],
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
    case CLOSE_MODAL_EMAIL: {
      state.modalEmail.visible = false;
      state.modalEmail.emails = [];
      state.modalEmail.users = [];
      return { ...state };
    }
    case SEARCH_EMAIL: {
      state.modalEmail.visible = true;
      state.modalEmail.users = [...action.users].map((item, index) => ({
        ...item,
        key: index,
      }));
      state.modalEmail.emails = [...action.emails].map((item, index) => ({
        ...item,
        key: index,
      }));
      return { ...state };
    }
    default:
      return { ...state };
  }
};
