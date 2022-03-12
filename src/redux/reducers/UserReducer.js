/* eslint-disable import/no-anonymous-default-export */
import { ATTACH_FILE, DETACH_FILE, SEND_EMAIL } from "../types/EmailType";
import {
  ADD_AVATAR_CONTACT,
  CHOOSE_USER,
  CLOSE_MODAL,
  DELETE_USER,
  GET_USERS,
  GET_USER_INFO,
  OPEN_MODAL,
  OPEN_UPDATE_MODAL,
  SEARCH_USER,
  UPDATE_CONTACT,
  UPLOAD_AVATAR,
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
  chosenContact: {
    visible: false,
    user: {
      userId: 0,
      address: "",
      companyId: 0,
      email: "",
      name: "",
      phone: "",
      role: "",
      avatar: "",
    },
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO:
      return { ...state, userDetail: action.userDetail };
    case GET_USERS:
      return { ...state, userArr: action.userArr };
    case DELETE_USER: {
      const newUserArr = [...state.userArr].filter(
        (user) => user.userId !== action.id
      );
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
      state.chosenContact = {
        visible: false,
        user: {
          userId: 0,
          address: "",
          companyId: 0,
          email: "",
          name: "",
          phone: "",
          role: "",
          avatar: "",
        },
      };
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
    case SEND_EMAIL: {
      state.attachedFiles = [];
      return { ...state };
    }
    case OPEN_UPDATE_MODAL: {
      state.chosenContact = { visible: true, user: action.user };
      return { ...state };
    }
    case ADD_AVATAR_CONTACT: {
      state.chosenContact.user.avatar = action.url;
      return { ...state };
    }
    case UPDATE_CONTACT: {
      const arrUpdated = [...state.userArr];
      const index = arrUpdated.findIndex(
        (user) => user.userId === action.user.userId
      );
      if (state.userArr.length > 0) {
        const userUpdated = {
          ...action.user,
          companyId: state.userArr[index].companyId,
          role: state.userArr[index].role,
        };
        arrUpdated[index] = userUpdated;
        state.userArr = arrUpdated;
      } else {
        const userUpdated = {
          ...action.user,
          companyId: state.userDetail.companyId,
          role: state.userDetail.role,
        };
      }
      return { ...state };
    }
    case UPLOAD_AVATAR: {
      state.userDetail.avatar = action.url;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
