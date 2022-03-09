/* eslint-disable import/no-anonymous-default-export */
import {
  ATTACH_FILE,
  CHOOSE_USER,
  CLOSE_MODAL,
  DELETE_USER,
  DETACH_FILE,
  GET_USERS,
  GET_USER_INFO,
  OPEN_MODAL,
  SEARCH_USER,
  SEND_SMS,
} from "../types/UserType";

const initialState = {
  userDetail: {},
  userArr: [],
  arrUserSelected: [],
  modal: {
    title: "Gửi SMS",
    visible: false,
  },
  attachedFiles: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO:
      return { ...state, userDetail: action.userDetail };
    case GET_USERS:
      return { ...state, userArr: action.userArr };
    case DELETE_USER: {
      const newUserArr = state.userArr.filter((user) => user.id !== action.id);
      state.userArr = newUserArr;
      return { ...state };
    }
    case SEARCH_USER: {
      state.userArr = action.usersSearch;
      return { ...state };
    }
    case CHOOSE_USER: {
      state.arrUserSelected = action.arrUser;
      return { ...state };
    }
    case OPEN_MODAL: {
      state.modal.title = action.title;
      state.modal.visible = true;
      return { ...state };
    }
    case CLOSE_MODAL: {
      state.modal.visible = false;
      return { ...state };
    }
    case ATTACH_FILE: {
      if (action.url) {
        const newAttachedFiles = [...state.attachedFiles, action.url];
        state.attachedFiles = newAttachedFiles;
      }
      return { ...state };
    }
    case DETACH_FILE: {
      const newAttachedFiles = state.attachedFiles.filter(
        (url) => !url.includes(action.name)
      );
      state.attachedFiles = newAttachedFiles;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
