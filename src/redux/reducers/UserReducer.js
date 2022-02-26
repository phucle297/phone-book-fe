/* eslint-disable import/no-anonymous-default-export */
import { DELETE_USER, GET_USERS, GET_USER_INFO } from "../types/UserType";

const initialState = {
  userDetail: {},
  userArr: [],
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

    default:
      return { ...state };
  }
};
